import { EntrepriseType, StatutType } from "./"

/**
 * Type de l'objet Facture
 * (Sans les informations complètes sur l'entreprise, le client et le statut de la facture)
 */
interface FactureType {
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
interface FullFactureType {
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


/**
 * Classe implémentant l'objet FullFacture pour
 * pouvoir définir des props de type FullFacture
 */
class FullFacture implements FullFactureType{
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

    constructor(
        id: string,
        isAvoir: boolean,
        date: Date,
        tjm: number,
        nbJours: number,
        entreprise: EntrepriseType,
        client: EntrepriseType,
        tva: boolean,
        nbJoursPaiement: number,
        statut: StatutType,
        datePaiement: Date | null
    ){
        this.id = id
        this.isAvoir = isAvoir
        this.date = date
        this.tjm = tjm
        this.nbJours = nbJours
        this.entreprise = entreprise
        this.client = client
        this.tva = tva 
        this.nbJoursPaiement = nbJoursPaiement
        this.statut = statut
        this.datePaiement = datePaiement
    }
}

export type {
    FactureType,
    FullFactureType,
}

export {
    FullFacture
}