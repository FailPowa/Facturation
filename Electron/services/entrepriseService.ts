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
    return onlyClients
}

/**
 * Ajoute une nouvelle entreprises cliente à la liste des entreprises 
 * stockés dans le fichier entreprise.json.
 * 
 * @param newCompany 
 * @returns 
 */
function addCompany(_event: any, newCompany: Entreprise, isMe?: boolean): Entreprise{
    const companies = getCompanies()

    /** Récupère l'id (attribut de type number) le plus grand parmi ceux existant, 
     * l'incrémente de 1 et associe le résultat à l'id de la nouvelle entreprise enregistré */
    newCompany.id = Math.max(...companies.map((company) => company.id)) + 1

    if (isMe === true){
        const index = companies.findIndex((company) => company.isMe === true)
        if (index !== -1) throw new Error(`Echec de l'ajout d'une nouvelle entreprise, votre entreprise est déjà créée: Voir l'option modifier si vous voulez apportez des modifications`)
        newCompany.isMe = true
    }else{
        newCompany.isMe = false
    }
    
    companies.push(newCompany)
    updateJson(companies, 'entreprise.json')
    return newCompany
}

/**
 * Met à jour une entreprise existante identifié par son id 
 * 
 * 
 * @throws Si l'entreprise est introuvable
 * @param updatedCompany 
 * @returns 
 */
function updateClient(_event: any, id: number, updatedClient: Entreprise): Entreprise{
    const companies = getCompanies()
    
    /** Variable contenant la position du client n°{id} dans la liste d'entreprises */
    const updatedClientIndex = companies.findIndex((company) => company.id === id)
    
    if (updatedClientIndex === -1){
        throw new Error(`Echec de la mise à jour des entreprises: Impossible de trouver l'entreprise n°${id} du nom de ${updatedClient.nom}`)
    }
    
    /** Permet d'empêcher l'utilisateur de changer l'id et le boolean isMe lors de la mise à jour */
    updatedClient.id = id
    updatedClient.isMe = false

    /** Mise à jour de la liste en remplaçant les anciennes informations de l'entreprise cliente par les nouvelles informations */
    companies[updatedClientIndex] = updatedClient
    updateJson(companies, 'entreprise.json')
    
    return updatedClient
}



export { getCompanies, getClients, addCompany, updateClient }