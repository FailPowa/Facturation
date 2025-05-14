import { Entreprise, isEntreprise, isEntrepriseArray, validateEntreprise } from "./Entreprise";
import { 
    Facture, 
    FullFacture, 
    objToFacture, 
    factureToObject, 
    jsonStringToFacture 
} from "./Facture";
import { Statut } from "./Statut";

export type {
    Entreprise,
    Facture,
    FullFacture,
    Statut
}

export {
    // Entreprise
    isEntreprise,
    isEntrepriseArray,
    validateEntreprise,
    // Facture
    objToFacture,
    factureToObject,
    jsonStringToFacture
}