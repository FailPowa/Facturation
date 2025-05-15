import { readJson, updateJson, createJson } from './jsonService';
import { dialog } from 'electron';
import { 
    Facture, 
    FullFacture,
    objToFacture, 
    factureToObject, 
    CallbackMessage,
    isFactureArray
} from "../types";
import { getClientById, getMyEntreprise } from "./entrepriseService";
import { getStatutById } from "./statutService";
import { formatDate } from '../utils/parseDate';

/** Variable stockant le nom du fichier json stockant les factures */
const jsonFile = 'facture.json'


/**
 * Récupère et renvoie une liste de toutes les factures stockées dans le json 'facture.json'
 * @returns Facture[]
 */
function getFactures(): Facture[] {
    const results = readJson(jsonFile) as any[]
    const factures = results.map(objToFacture)
    return factures
}


/**
 * Renvoie une liste de toutes les factures complète
 * @returns FullFacture[]
 */
function getFullFactures(): FullFacture[]{
    const factures = getFactures()
    const fullFactures = factures.map(factureToFullFacture)
    return fullFactures
}


/**
 * Récupère une facture et la complète en rajoutant les informations sur l'entreprise prestaitaire,
 * le client et le statut de la facture.
 * @param facture La facture a convertir en facture complète
 * @returns FullFacture
 */
function factureToFullFacture(facture: Facture): FullFacture{
    const myentreprise = getMyEntreprise()
    const client = getClientById(facture.clientId)
    const statut = getStatutById(facture.statutId)
    if (client === null){
        throw new Error(`Le client n°${facture.clientId} n'existe pas. Facture n°${facture.id}`)
    }
    if (statut === null){
        throw new Error(`Le statut n°${facture.statutId} n'existe pas. Facture n°${facture.id}`)
    }
    const fullFacture : FullFacture= {
        id: facture.id,
        isAvoir: facture.isAvoir,
        date: facture.date,
        tjm: facture.tjm,
        nbJours: facture.nbJours,
        entreprise: myentreprise,
        client: client,
        tva: facture.tva,
        nbJoursPaiement: facture.nbJoursPaiement,
        statut: statut,
        datePaiement: facture.datePaiement
    }
    return fullFacture
}

/**
 * Récupère les factures existantes avec leurs informations aux complètes, les filtres selon l'année entrée en paramètre et
 * renvoie la liste des factures filtrées.
 * @param year L'année de la/les factures recherchés 
 * @returns Facture[]
 */
function getFullFacturesByYear(_event: any, year: number): FullFacture[]{
    const fullFactures = getFullFactures();
    const facturesByYear = fullFactures.filter( facture => {
        return facture.date.getFullYear() === year;
    });
    return facturesByYear;
}

/**
 * Retourne une liste de toutes les années où au moins une facture a été daté de cette même année
 * @returns number[]
 */
function getAllFacturesYears(): number[]{
    const factures = getFactures();
    const years: number[] = [];
    factures.forEach( facture => {
        if (!years.includes(facture.date.getFullYear())){
            years.push(facture.date.getFullYear())
        }
    });
    return years;   
}


/**
 * Ajoute une nouvelle facture
 * @param _event 
 * @param newFacture La nouvelle facture
 * @returns 
 */
function addFacture(_event: any, newFacture: Facture){
    const factures = getFactures();

    // Dernier id ajouter
    const lastId = getLastId() || 1;

    // Année de création de la facture
    const year = newFacture.date.getFullYear().toString().slice(2);

    // Mois de création de la facture
    let month = (newFacture.date.getMonth() + 1).toString();
    if (month.length === 1){
        month = '0' + month
    }

    // Nouvel identifiant pour la facture
    newFacture.id = `${year}-${month}-${lastId + 1}`;
    factures.push(newFacture);
    
    // Un map de la liste des factures 
    const mappedFactures = factures.map(factureToObject);
    updateJson(mappedFactures, jsonFile);
    return newFacture;
}


/**
 * Met à jour une facture existante
 * @param _event 
 * @param updatedFacture la facture mise à jour
 * @returns 
 */
function updateFacture(_event: any, updatedFacture: Facture){
    const factures = getFactures();
    const index = factures.findIndex( facture => facture.id === updatedFacture.id);
    if (index === -1){
        throw new Error(``);
    }
    factures[index] = updatedFacture
    const mappedFactures = factures.map(factureToObject)
    updateJson(mappedFactures, jsonFile);
    return updatedFacture;
}


/** 
 * Récupère la derniere facture enregistrée 
 * @returns FullFacture or null
 */
function getLastFacture(): Facture | null{
    const factures = getFactures();
    if ( factures.length === 0)
        return null
    const lastFacture = factures.reduce(
        (last, current) =>{
            /** Identifiant de la facture courante */
            const id_current = Number(current.id.split('-')[2]);

            /** Identifiant de la facture précédente */
            const id_last = Number(last.id.split('-')[2]);

            if (id_current > id_last)
                return current
            return last
        }
    )
    return lastFacture
}

/**
 * Récupère l'identifiant aa-mm-XX de la derniere facture ajouté
 * sinon retourne null si aucune facture n'a déjà été créée
 * @returns number or null
 */
function getLastId(): number | null{
    const factures = getFactures();
  
    // On extrait les parties "numérotés" de chaque ID
    const numeros = factures
        .map(f => {
            const match = f.id.match(/^\d{2}-\d{2}-(\d{2})$/);
            return match ? parseInt(match[1], 10) : null;
        })
        .filter(n => n !== null);
  
    // On retourne le plus grand (dernier) numéro trouvé
    return numeros.length ? Math.max(...numeros) : null;
}

/**
 * Retourne un boolean true/false si le client recherché est présent dans une des factures
 * @param id_client Identifiant du client recherché
 * @returns Boolean
 */
function isClientInFactures(_event: any, id_client: number): boolean {
    const factures = getFactures();
    const isClientIn = factures.findIndex( facture => {
        return facture.clientId === id_client
    }) !== -1
    return isClientIn
}

/**
 * Supprime une facture
 * @param _event 
 * @param id Identifiant de la facture à supprimer
 * @returns 
 */
function deleteFacture(_event: any, id: string) {
    let factures = getFactures();
    const deletedFacture = factures.find(facture => facture.id === id) || null;
    if (deletedFacture !== null){
        factures = factures.filter( facture => facture !== deletedFacture);
        updateJson(factures, jsonFile);
    }
    const mappedFactures = factures.map(factureToObject)
    updateJson(mappedFactures, jsonFile)
    return deletedFacture;
}

/**
 * Exporte les factures complètes et retourne le message d'echec/succès de l'opération
 * @param _event
 * @returns Promise<CallbackMessage>
 */
function exportFactures(_event: any): Promise<CallbackMessage> {
    // La liste factures avec leurs ids retirés
    const factures = getFullFactures().map( facture => {
        let result: Record<string, any> = Object.assign({}, facture);
        result.date = formatDate(result.date);
        result.datePaiement = result.datePaiement ? formatDate(result.datePaiement) : null;
        delete result.entreprise.id;
        delete result.client.id;
        return result;
    });
    
    // Variable contenant la reponse concernant l'echec/succès de l'opération
    const response : CallbackMessage = { code: 0, message: "Export réussi avec succès.", details: [] }

    // Fenetre d'export des factures
    return dialog.showSaveDialog({
        title: "Exporter factures",
        filters: [
            { name: 'Json', extensions: ['json']}
        ]
    }).then( (result) : CallbackMessage => {
        // Si l'utilisateur annule l'export, on retourne rien
        if (result.canceled){
            response.code = 2
            response.message = "Export annulé."
            return response
        }
        // Chemin absolu vers le fichier exporter
        const filePath = result.filePath
        // Création du fichier json
        createJson(factures, filePath)
        return response
    })
}


export { 
    getFactures,
    getAllFacturesYears,
    getFullFactures,
    getFullFacturesByYear,
    getLastFacture,
    isClientInFactures,
    addFacture,
    updateFacture,
    deleteFacture,
    exportFactures
}