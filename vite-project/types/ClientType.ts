/** 
 * Type de l'objet Client
 */

export interface ClientType {
    firstname: string,
    lastname: string
}

/**
 * Classe implémentant l'interface ClientType
 *  pour pouvoir définir des props de type ClientType
 * 
 */
export class Client implements ClientType{
    firstname: string
    lastname: string

    constructor(firstname: string, lastname: string){
        this.firstname = firstname
        this.lastname = lastname
    }
}