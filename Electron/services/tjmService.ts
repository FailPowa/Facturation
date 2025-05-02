import fs from 'fs';
import path from 'path';
import { isDev } from "../config";
import { readJson, updateJson } from './jsonService';

const resourcesPath = isDev ? './Electron/resources' : path.join(process.resourcesPath, 'Electron/resources');

/**
 * Retourne le montant sauvegardé dans le fichier tjm.json
 * @returns 
 */
function getTjm(): any {
    return readJson('tjm.json')
}

/**
 * Met à jour le montant du TJM sauvegardé
 * @param _event L'événement Electron dont on se fout
 * @param montant Le montant récupéré
 */
function updateTjm(_event: any, montant: number): any {
    const tjm = getTjm()
    tjm.montant = montant;
    updateJson(tjm, 'tjm.json');
    return tjm;
}

export { getTjm, updateTjm };