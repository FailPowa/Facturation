/** 
 * Type de l'objet Entreprise
 */

interface EntrepriseType {
    id : number
    nom: string
    adresse: string
    codePostal: string
    ville: string
    mail: string
    numTva?: string
    siret: string
    isMe: boolean
}

/**
 * Classe implémentant l'interface EntrepriseType
 *  pour pouvoir définir des props de type EntrepriseType
 * 
 */
class Entreprise implements EntrepriseType{
    id : number
    nom: string
    adresse: string
    codePostal: string
    ville: string
    mail: string
    numTva?: string
    siret: string
    isMe: boolean

    constructor(
        id : number,
        nom: string,
        adresse: string,
        codePostal: string,
        ville: string,
        mail: string,
        numTva: string,
        siret: string,
        isMe: boolean
    ){
        this.id = id
        this.nom = nom
        this.adresse = adresse
        this.codePostal = codePostal
        this.ville = ville
        this.mail = mail
        this.numTva = numTva == null ? "" : numTva
        this.siret = siret
        this.isMe = isMe
    }
}

export type {
    EntrepriseType,
}

export {
    Entreprise
}