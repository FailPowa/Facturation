import { validateSiret } from '../../../plugins/validateSiret'

/** Variables contenant les regex de différents à respecter */
const mailRegex = new RegExp(/^(?!.*\.\.)([a-zA-Z0-9._%+-]{1,64})@([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/)
const siretRegex = new RegExp(/^[\d\s]+$/)

/** Règles de validation des informations de l'entreprise */
    
const nomRules = [
    /** Règle: Le nom de l'entreprise est requis */
    (value: string) => value.trim().length !== 0? true : "Le nom de l'entreprise est requis.",
]
const adresseRules = [
    /** Règle: L'adresse de l'entreprise est requis */
    (value: string) => value.trim().length !== 0? true : "L'adresse de l'entreprise est requise."
]
const codePostalRules = [
    /** Règle: Le code postal est requis */
    (value: string) => value.trim().length !== 0? true : "Le code postal de l'entreprise est requis."
]
const villeRules = [
    /** Règle: Le nom de la ville d'entreprise est requis */
    (value: string) => value.trim().length !== 0? true : "La ville de l'entreprise est requise."
]
const mailRules = [
    /** Règle: Le mail de l'entreprise est requis */
    (value: string) => value.trim().length !== 0? true : "Un mail est requis.",
    
    /** Règle: L'email respecte le format suivant => anything@anything.anything */
    (value: string) => mailRegex.test(value.trim())? true : "Le mail est invalide."
]
const numTvaRules = [
    /** Règle: Le numéro de tva de l'entreprise doit contenir 13 caractères ou rien. */
    (value: string) => ( !value || value.replace(/ /g, '').length === 13) || "Le numéro de TVA est invalide."
]
const siretRules = [
    /** Règle: Le numéro de siret de l'entreprise est requis */
    (value: string) => value.trim().length !== 0? true : "Le numéro de SIRET de l'entreprise est requis.",

    /** Règle: Le numéro de siret ne doit contenir que des chiffres. (caractère espace exlcu) */
    (value: string) => siretRegex.test(value.replace(/ /g, '')) ? true : "Le numéro de siret ne doit contenir que des chiffres. (caractère espace exclu)",

    /** Règle: Le numéro de siret doit contenir 14 chiffres */
    (value: string) => value.replace(/ /g, '').length === 14 ? true : "Le numéro de SIRET doit contenir 14 chiffres.", 

    /** Règle: Le numéro de siret de l'entreprise ne respecte pas l'algorithme de Luhn */
    (value: string) => validateSiret(value.replace(/ /g, ''))? true : "Le numéro de siret ne respecte pas l'algorithme de Luhn."
]


export {
    nomRules,
    adresseRules,
    codePostalRules,
    villeRules,
    mailRules,
    siretRules,
    numTvaRules
}