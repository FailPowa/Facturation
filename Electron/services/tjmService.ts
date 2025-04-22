import fs from 'fs';
import path from 'path';
import { isDev } from "../config";

const resourcesPath = isDev ? './Electron/resources' : path.join(process.resourcesPath, 'Electron/resources');

/**
 * Retourne le montant sauvegardé dans le fichier tjm.json
 * @returns 
 */
function getTjm(): any {
    return JSON.parse(fs.readFileSync(path.join(resourcesPath, 'tjm.json'), 'utf-8'));
}

/**
 * Met à jour le montant du TJM sauvegardé
 * @param _event L'événement Electron dont on se fout
 * @param montant Le montant récupéré
 */
function updateTjm(_event: any, montant: number): any {
    const tjm = JSON.parse(fs.readFileSync(path.join(resourcesPath, 'tjm.json'), 'utf-8'));
    tjm.montant = montant;
    updateJson(tjm);
    return tjm;
}

/**
 * Met à jour le fichier JSON
 * @param newValue La nouvelle valeur à enregistrer
 */
function updateJson(newValue: any): void {
    fs.writeFileSync(path.join(resourcesPath, 'tjm.json'), JSON.stringify(newValue, null, 4));
}

export { getTjm, updateTjm };