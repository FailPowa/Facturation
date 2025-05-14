import {
    nomRules,
    adresseRules,
    codePostalRules,
    villeRules,
    mailRules,
    siretRules,
    numTvaRules
} from '../rules/entrepriseRules';

export interface Entreprise {
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


export function isEntreprise(obj: any): obj is Entreprise {
    const expectedKeys = [
        "nom", "adresse", "codePostal", "ville",
        "mail", "numTva", "siret", "isMe"
    ];

    return typeof obj === 'object' &&
        obj !== null &&
        Object.keys(obj).every( key => {
            return expectedKeys.includes(key) || key === 'id';
        }) &&
        (obj.id === undefined || typeof obj.id === 'number') &&
        typeof obj.nom === 'string' &&
        typeof obj.adresse === 'string' &&
        typeof obj.codePostal === 'string' &&
        typeof obj.ville === 'string' &&
        typeof obj.mail === 'string' &&
        typeof obj.numTva === 'string' &&
        typeof obj.siret === 'string' &&
        typeof obj.isMe === 'boolean';
}


export function isEntrepriseArray(data: any): data is Entreprise[] {
    return Array.isArray(data) && data.every(isEntreprise);
}


export function validateEntreprise(entreprise: Entreprise): boolean {
    return nomRules.every(rule => rule(entreprise.nom)) &&
        adresseRules.every(rule => rule(entreprise.adresse)) &&
        codePostalRules.every(rule => rule(entreprise.codePostal)) &&
        villeRules.every(rule => rule(entreprise.ville)) &&
        mailRules.every(rule => rule(entreprise.mail)) &&
        siretRules.every(rule => rule(entreprise.siret)) &&
        numTvaRules.every(rule => rule(entreprise.numTva))
}