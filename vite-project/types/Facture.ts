import { EntrepriseType, StatutType } from "./"

export interface FactureType {
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

export interface FullFactureType {
    id: string
    isAvoir: boolean
    date: Date
    tjm: number
    nbJours: number
    entreprise: EntrepriseType
    client: EntrepriseType
    tva: boolean
    nbJoursPaiement: number
    statut: StatutType
    datePaiement: Date | null
}