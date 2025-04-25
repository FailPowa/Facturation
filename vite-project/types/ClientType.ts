/** 
 * Type de l'objet Client
 */

export interface ClientType {
    id : number
    nom: string
    adresse: string
    codePostal: string
    ville: string
    mail: string
    numTva: string
    siret: string
    isMe: boolean
}

/**
 * Classe implémentant l'interface ClientType
 *  pour pouvoir définir des props de type ClientType
 * 
 */
export class Client implements ClientType{
    id : number
    nom: string
    adresse: string
    codePostal: string
    ville: string
    mail: string
    numTva: string
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
        this.numTva = numTva
        this.siret = siret
        this.isMe = isMe
    }
}