import fs from 'fs';
import path from 'path';
import { isDev } from "../config";

const resourcesPath = isDev ? './Electron/resources' : path.join(process.resourcesPath, 'Electron/resources');


/**
 * Lis un fichier JSON et renvoie son contenu parser
 * @returns 
 */
function readJson(fileName: string): any{
    return JSON.parse(fs.readFileSync(path.join(resourcesPath, fileName), 'utf-8'));
}

/**
 * Met à jour le fichier JSON
 * @param newValue La nouvelle valeur à enregistrer
 * @param fileName Le nom du fichier JSON
 */
function updateJson(newValue: any, fileName: string): void {
    return fs.writeFileSync(path.join(resourcesPath, fileName), JSON.stringify(newValue, null, 4));
}

export { readJson, updateJson};