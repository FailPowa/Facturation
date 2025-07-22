import { Entreprise, isEntreprise, isEntrepriseArray, validateEntreprise } from "./Entreprise";
import { 
    Facture, 
    FullFacture, 
    objToFacture, 
    factureToObject, 
    jsonStringToFacture,
    isFacture,
    isFactureArray,
    isFullFacture,
    isFullFactureArray
} from "./Facture";
import { Statut } from "./Statut";
import { CallbackMessage } from './CallbackMessage';

export type {
    Entreprise,
    Facture,
    FullFacture,
    Statut,
    CallbackMessage
}

export {
    // Entreprise
    isEntreprise,
    isEntrepriseArray,
    validateEntreprise,
    // Facture
    objToFacture,
    factureToObject,
    jsonStringToFacture,
    isFacture,
    isFactureArray,
    isFullFacture,
    isFullFactureArray
}