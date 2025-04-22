import fs from 'fs';
import path from 'path';
import { isDev } from "../config";

const resourcesPath = isDev ? './Electron/resources' : path.join(process.resourcesPath, 'Electron/resources');

/**
 * Retourne tous les événements du fichier events.json
 */
function getAllEvents(): any {
    return JSON.parse(fs.readFileSync(path.join(resourcesPath, 'events.json'), 'utf-8'));
}

export { getAllEvents }