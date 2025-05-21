import { readJson, updateJson } from './jsonService';

/** Variable stockant le nom du fichier json stockant le TJM */
const jsonFile = 'tjm.json'

/**
 * Retourne le montant sauvegardé dans le fichier tjm.json
 * @returns 
 */
function getTjm(): any {
    return readJson(jsonFile)
}

/**
 * Met à jour le montant du TJM sauvegardé
 * @param _event L'événement Electron dont on se fout
 * @param montant Le montant récupéré
 */
function updateTjm(_event: any, montant: number): any {
    const tjm = getTjm()
    tjm.montant = montant;
    updateJson(tjm, jsonFile);
    return tjm;
}

export { getTjm, updateTjm };