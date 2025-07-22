import { formatDate, parseDateDDMMYYYY } from "../utils/dateUtils"
import { Entreprise, Statut } from "./"

/**
 * Type de l'objet Facture
 * (Sans les informations complètes sur l'entreprise, le client et le statut de la facture)
 */
interface Facture {
    id: string
    isAvoir: boolean
    date: Date
    tjm: number
    nbJours: number
    entrepriseId: number
    clientId: number
    tva: boolean
    nbJoursPaiement: number
    statutId: number
    datePaiement: Date | null
}

/**
 * Type de l'objet FullFacture
 * (Avec toutes les informations sur l'entreprise prestataire, le client et le statut actuel de la facture)
 */
interface FullFacture {
    id: string
    isAvoir: boolean
    date: Date
    tjm: number
    nbJours: number
    entreprise: Entreprise
    client: Entreprise
    tva: boolean
    nbJoursPaiement: number
    statut: Statut
    datePaiement: Date | null
}


/**
 * Convertit un objet en Facture
 * @param obj Un objet contenant les informations pour la facture
 * @returns 
 */
function objToFacture(obj: Record<string, any>): Facture {
    const facture: Facture = {
        id: String(obj.id),
        isAvoir: Boolean(obj.isAvoir),
        date: parseDateDDMMYYYY(obj.date),
        tjm: Number(obj.tjm),
        nbJours: Number(obj.nbJours),
        entrepriseId: Number(obj.entrepriseId),
        clientId: Number(obj.clientId),
        tva: Boolean(obj.tva),
        nbJoursPaiement: Number(obj.nbJoursPaiement),
        statutId: Number(obj.statutId),
        datePaiement: obj.datePaiement && obj.datePaiement !== "" ? parseDateDDMMYYYY(obj.datePaiement) : null
    }
    return facture
}


/**
 * Convertit une facture en objet json
 * @param facture La facture à convertir en objet json
 * @returns 
 */
function factureToObject(facture: Facture): Record<string, any> {
    const objJson: Record<string, any> = {
        id: facture.id,
        isAvoir: facture.isAvoir,
        date: formatDate(facture.date), // Convertit la date au format JJ/MM/AAAA
        tjm: facture.tjm,
        nbJours: facture.nbJours,
        entrepriseId: facture.entrepriseId,
        clientId: facture.clientId,
        tva: facture.tva,
        nbJoursPaiement: facture.nbJoursPaiement,
        statutId: facture.statutId,
        datePaiement: facture.datePaiement !== null ? formatDate(facture.datePaiement) : null // Convertit la date de paiement au format JJ/MM/AAAA
    }
    return objJson
}


/**
 * Récupère un string contenant le json d'une facture 
 * et le convertit en objet Facture.
 * @param json le string json de la facture
 * @returns Facture
 */
function jsonStringToFacture(json: string) : Facture {
    const facture = JSON.parse(json)
    
    // Convertit les date (string) en objet Date
    facture.date = new Date(facture.date)
    facture.datePaiement = facture.datePaiement ? new Date(facture.datePaiement) : null

    return facture
}


/**
 * Vérifie si un objet correspond à la structure d'une facture.
 *
 * Cette fonction vérifie que l'objet possède toutes les propriétés obligatoires du type Facture
 * avec les bons types. Elle accepte également un champ supplémentaire facultatif 'id' de type string.
 *
 * @param obj - L'objet à vérifier.
 * @returns True si l'objet est une Facture valide, false sinon.
 */
function isFacture(obj: any): obj is Facture {
    const expectedKeys = [
        "id", "isAvoir", "date", "tjm", "nbJours", "entrepriseId",
        "clientId", "tva", "nbJoursPaiement", "statutId", "datePaiement"
    ]

    return typeof obj === 'object' &&
        obj !== null &&
        Object.keys(obj).every(key => expectedKeys.includes(key)) &&
        typeof obj.id === 'string' &&
        typeof obj.isAvoir === 'boolean' &&
        obj.date instanceof Date &&
        typeof obj.tjm === 'number' &&
        typeof obj.nbJours === 'number' &&
        typeof obj.entrepriseId === 'number' &&
        typeof obj.clientId === 'number' &&
        typeof obj.tva === 'boolean' &&
        typeof obj.nbJoursPaiement === 'number' &&
        typeof obj.statutId === 'number' &&
        (obj.datePaiement === null || obj.datePaiement instanceof Date);
}

/**
 * Vérifie si une donnée est un tableau d'objets de type Facture.
 *
 * Cette fonction s'assure que la donnée est un tableau et que
 * chaque élément respecte la structure attendue d'une facture,
 * en utilisant la fonction `isFacture`.
 *
 * @param data - La donnée à vérifier.
 * @returns True si c'est un tableau de factures valides, false sinon.
 */
function isFactureArray(data: any): data is Facture[] {
    return Array.isArray(data) && data.every(isFacture);
}


/**
 * Vérifie si un objet correspond à la structure d'une FullFacture.
 *
 * Cela inclut les objets `entreprise`, `client` (de type Entreprise) et `statut` (de type Statut).
 *
 * @param obj - L'objet à vérifier.
 * @returns True si l'objet est une FullFacture valide, false sinon.
 */
function isFullFacture(obj: any): obj is FullFacture {
    const expectedKeys = [
        "id", "isAvoir", "date", "tjm", "nbJours", "entreprise",
        "client", "tva", "nbJoursPaiement", "statut", "datePaiement"
    ]
    const isValidFrDate = (d: any): boolean => {
        return d instanceof Date || (
            typeof d === 'string' &&
            !isNaN(parseDateDDMMYYYY(d).getTime())
        )
    }


    return typeof obj === 'object' &&
        obj !== null &&
        Object.keys(obj).every(key => expectedKeys.includes(key)) &&
        typeof obj.id === 'string' &&
        typeof obj.isAvoir === 'boolean' &&
        isValidFrDate(obj.date) &&
        typeof obj.tjm === 'number' &&
        typeof obj.nbJours === 'number' &&
        typeof obj.tva === 'boolean' &&
        typeof obj.nbJoursPaiement === 'number' &&
        (obj.datePaiement === null || isValidFrDate(obj.datePaiement))
}

/**
 * Vérifie si une donnée est un tableau d'objets de type FullFacture.
 *
 * @param data - La donnée à vérifier.
 * @returns True si c'est un tableau de FullFactures valides, false sinon.
 */
function isFullFactureArray(data: any): data is FullFacture[] {
  return Array.isArray(data) && data.every(isFullFacture)
}


export type {
    Facture,
    FullFacture
}

export {
    objToFacture,
    factureToObject,
    jsonStringToFacture,
    isFacture,
    isFactureArray,
    isFullFacture,
    isFullFactureArray
}
