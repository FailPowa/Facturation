import { readJson, updateJson } from "./jsonService";
import { Facture, objToFacture } from "../types";
import { FullFacture } from "../types";
import { getClientById, getMyEntreprise } from "./entrepriseService";
import { getStatutById, getStatuts } from "./statutService";

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
 * Récupère les factures existantes, les filtres selon l'année entrée en paramètre et
 * renvoie la liste des factures filtrées.
 * @param _event
 * @param year L'année de la/les factures recherchés 
 * @returns Facture[]
 */
function getFacturesByYear(_event: any, year: number): Facture[]{
    const factures = getFactures()
    const facturesByYear = factures.filter( facture => {
        return facture.date.getFullYear() === year
    })
    return facturesByYear
}

/**
 * Récupère les factures existantes avec leurs informations aux complètes, les filtres selon l'année entrée en paramètre et
 * renvoie la liste des factures filtrées.
 * @param year L'année de la/les factures recherchés 
 * @returns Facture[]
 */
function getFullFacturesByYear(_event: any, year: number): FullFacture[]{
    const fullFactures = getFullFactures()
    const facturesByYear = fullFactures.filter( facture => {
        return facture.date.getFullYear() === year
    })
    return facturesByYear
}

/**
 * Retourne une liste de toutes les années où au moins une facture a été daté de cette même année
 * @returns number[]
 */
function getAllFacturesYears(): number[]{
    const factures = getFactures()
    const years: number[] = []
    factures.forEach( facture => {
        if (!years.includes(facture.date.getFullYear())){
            years.push(facture.date.getFullYear())
        }
    })
    return years
}

export { 
    getFactures,
    getAllFacturesYears,
    getFullFactures,
    getFullFacturesByYear
}