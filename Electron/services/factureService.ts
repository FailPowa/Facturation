import { readJson, updateJson } from "./jsonService";
import { Facture, objToFacture } from "../types";

/** Variable stockant le nom du fichier json stockant les factures */
const jsonFile = 'facture.json'


/**
 * Récupère et renvoie une liste de toutes les factures stockées dans le json 'facture.json'
 * @returns Facture[]
 */
function getFactures(): Facture[] {
    const results = readJson(jsonFile) as any[]
    const factures = results.map(objToFacture)
    return factures
}

export { 
    getFactures
}