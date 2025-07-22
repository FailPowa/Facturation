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

/**
 * Vérifie si un objet correspond à la structure d'une entreprise.
 *
 * Cette fonction effectue une vérification de type à l'exécution pour s'assurer
 * que l'objet possède toutes les propriétés attendues d'une entreprise, avec les bons types.
 * La clé optionnelle "id" est également autorisée si elle est de type number.
 *
 * @param obj - L'objet à vérifier.
 * @returns True si l'objet est une Entreprise valide, false sinon.
 */
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

/**
 * Vérifie si une donnée est un tableau d'objets de type Entreprise.
 *
 * Cette fonction s'assure que la donnée est un tableau et que
 * chaque élément respecte la structure attendue d'une entreprise,
 * en utilisant la fonction `isEntreprise`.
 *
 * @param data - La donnée à vérifier.
 * @returns True si c'est un tableau d'entreprises valides, false sinon.
 */
export function isEntrepriseArray(data: any): data is Entreprise[] {
    return Array.isArray(data) && data.every(isEntreprise);
}


export function validateEntreprise(entreprise: Entreprise): boolean {
    nomRules.forEach(rule => rule(entreprise.nom) ? false : console.log(rule(entreprise.nom)))
    adresseRules.forEach(rule => rule(entreprise.adresse) ? false : console.log(rule(entreprise.adresse)))
    codePostalRules.forEach(rule =>rule(entreprise.codePostal) ? false : console.log(rule(entreprise.codePostal)))
    villeRules.forEach(rule => rule(entreprise.ville) ? false : console.log(rule(entreprise.ville)))
    mailRules.forEach(rule => rule(entreprise.mail) ? false : console.log(rule(entreprise.mail)))
    siretRules.forEach(rule => rule(entreprise.siret) ? false : console.log(rule(entreprise.siret)))
    numTvaRules.forEach(rule => rule(entreprise.numTva) ? false : console.log(rule(entreprise.numTva)))

    return nomRules.every(rule => rule(entreprise.nom) === true) &&
        adresseRules.every(rule => rule(entreprise.adresse) === true) &&
        codePostalRules.every(rule => rule(entreprise.codePostal) === true) &&
        villeRules.every(rule => rule(entreprise.ville) === true) &&
        mailRules.every(rule => rule(entreprise.mail) === true) &&
        siretRules.every(rule => rule(entreprise.siret) === true) &&
        numTvaRules.every(rule => rule(entreprise.numTva) === true)
}