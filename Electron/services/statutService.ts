import { readJson, updateJson } from "./jsonService";
import { Statut } from "../types";

/** Variable stockant le nom du fichier json stockant les factures */
const jsonFile = 'statut.json'


/**
 * Récupère et renvoie une liste de tous les types de statuts stockés dans le json 'statut.json'
 * @returns Facture[]
 */
function getStatuts(): Statut[] {
    const statuts = readJson(jsonFile) as Statut[]
    return statuts
}

export { 
    getStatuts
}