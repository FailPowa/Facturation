import { parseDateDDMMYYYY } from "../utils/parseDate"

export interface Facture {
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
 * Convertit un objet en Facture
 * @param obj Un objet contenant les informations pour la facture
 * @returns 
 */
export function objToFacture(obj: Record<string, any>): Facture{
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