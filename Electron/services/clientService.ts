import fs, { read } from 'fs';
import path from 'path';
import { isDev } from "../config";
import { readJson, updateJson } from './jsonService';

const resourcesPath = isDev ? './Electron/resources' : path.join(process.resourcesPath, 'Electron/resources');

/**
 * Retourne la liste des clients sauvegardés dans le fichier clients.json
 * @returns 
 */
function getClients(): any{
    const data = readJson('clients.json')
    return data
}


/**
 * Met à jour la liste des clients sauvegardés dans le fichier clients.json
 * 
 * @param _event Evenement electron 
 * @param newClient nouveau client ajouté
 * @returns 
 */
function updateClients(_event: any, newClient: any): any{
    const clients = getClients()
    clients.push(newClient)
    updateJson(clients, 'clients.json')
    return clients
}

export { getClients, updateClients}