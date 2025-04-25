import path from 'path';
import { isDev } from "../config";
import { readJson, updateJson } from './jsonService';
import { Entreprise } from '../types/Entreprise';

const resourcesPath = isDev ? './Electron/resources' : path.join(process.resourcesPath, 'Electron/resources');

/**
 *  Récupère les entreprises
 * 
 * @returns 
 */
function getCompanies(): Entreprise[]{
    /** Variable stockant toutes les entreprises */
    const companies = readJson('entreprise.json') as Entreprise[]
    return companies
}


/**
 * Récupère les entreprises clientes
 * @returns 
 */
function getClients(): Entreprise[]{
    const companies = getCompanies()

    /** Variable stockant les entreprises cientes (isMe === false) */
    const onlyClients = companies.filter( (company) => company.isMe !== true)
    console.log(onlyClients)
    return onlyClients
}




export { getCompanies, getClients }