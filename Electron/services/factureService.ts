import { readJson, updateJson } from "./jsonService";
import { 
    Facture, 
    FullFacture,
    objToFacture, 
    factureToObject 
} from "../types";
import { getClientById, getMyEntreprise } from "./entrepriseService";
import { getStatutById } from "./statutService";

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
    let month = newFacture.date.getMonth().toString();
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
 * Récupère l'identifiant aa-mm-XX de la derniere facture ajouté
 * sinon retourne null si aucune facture n'a déjà été créée
 * @returns number or null
 */
function getLastId() : number | null{
    const factures = getFactures();
  
    // On extrait les parties "numérotés" de chaque ID
    const numeros = factures
        .map(f => {
            const match = f.id?.match(/^\d{2}-\d{2}-(\d{2})$/);
            return match ? parseInt(match[1], 10) : null;
        })
        .filter(n => n !== null);
  
    // On retourne le plus grand (dernier) numéro trouvé
    return numeros.length ? Math.max(...numeros) : null;
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
  

export { 
    getFactures,
    getAllFacturesYears,
    getFullFactures,
    getFullFacturesByYear,
    addFacture,
    updateFacture,
    deleteFacture
}