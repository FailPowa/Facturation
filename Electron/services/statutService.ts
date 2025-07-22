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

/**
 * Renvoie un statut trouvé selon l'id entré en paramètre sinon renvoie null
 * @param id Identifiant du statut recherché
 * @returns Statut or null
 */
function getStatutById(id : number):  Statut | null {
    const statuts = getStatuts()
    const statut = statuts.find( element => element.id === id) || null
    return statut
}

/**
 * Renvoie un statut trouvé par sa value, renvoie null si aucun statut ne correspond
 * @param value La value recherchée
 * @returns Statut | null
 */
function getStatutByValue(_event: any, value: string): Statut | null {
    const statuts = getStatuts();
    const res = statuts.find(s => s.value === value) || null;
    return res;
}

export { 
    getStatuts,
    getStatutById,
    getStatutByValue
}