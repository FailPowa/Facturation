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
