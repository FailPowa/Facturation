import fs from 'fs';
import path from 'path';
import { isDev } from "../config";

const resourcesPath = isDev ? './Electron/resources' : path.join(process.resourcesPath, 'Electron/resources');


/**
 * Lis un fichier JSON et renvoie son contenu parser
 * @param filePath chemin absolu vers le fichier ou le nom du fichier
 * @param isResources Boolean verifiant si ou non, le fichier se trouve dans le repertoire resources de l'application
 * @returns le fichier JSON parsé
 */
function readJson(filePath: string, isResources: boolean = true): any{
    if (!isResources)
        return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    return JSON.parse(fs.readFileSync(path.join(resourcesPath, filePath), 'utf-8'));
}

/**
 * Met à jour le fichier JSON
 * @param newValue La nouvelle valeur à enregistrer
 * @param fileName Le nom du fichier JSON
 */
function updateJson(newValue: any, fileName: string): void {
    return fs.writeFileSync(path.join(resourcesPath, fileName), JSON.stringify(newValue, null, 4));
}


/**
 * Créer un nouveau fichier JSON à l'emplacement indiqué
 * @param value La valeur à enregistrer
 * @param filePath le chemin absolu vers le nouveau fichier JSON (ex: 'C:/User/Downloads/clients.json' )
 * @returns 
 */
function createJson(value: any, filePath: string): void {
    return fs.writeFileSync(filePath, JSON.stringify(value, null, 4))
}

export { readJson, updateJson, createJson};