import { readJson, updateJson } from './jsonService';
import { Entreprise } from '../types';


/** Variable stockant le nom du fichier json stockant les entreprises */
const jsonFile = 'entreprise.json'

/**
 * Récupère les entreprises
 * @returns Entreprise[]
 */
function getCompanies(): Entreprise[] {
    /** Variable stockant toutes les entreprises */
    const companies = readJson(jsonFile) as Entreprise[]
    return companies
}


/**
 * Récupère les entreprises clientes
 * @returns Entreprise[]
 */
function getClients(): Entreprise[] {
    const companies = getCompanies()

    /** Variable stockant les entreprises cientes (isMe === false) */
    const onlyClients = companies.filter((company) => company.isMe === false)
    return onlyClients
}


/**
 * Récupère un client via son id mais retourne null si aucun client n'a été trouvé
 * @param id Id du client
 * @returns Entreprise or null
 */
function getClientById(id: number): Entreprise | null {
    const clients = getClients()
    const client = clients.find( entreprise => entreprise.id === id) || null
    return client
}
/**
 * Ajoute une nouvelle entreprises cliente à la liste des entreprises 
 * stockés dans le fichier entreprise.json.
 * @param newCompany L'objet de l'entreprise à créer
 * @param isMe Boolean spécifiant s'il s'agit de mon entreprise ou non (Par défaut, il vaut 'false')
 * @returns Entreprise
 */
function addCompany(_event: any, newCompany: Entreprise, isMe?: boolean): Entreprise {
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
    updateJson(companies, jsonFile)
    return newCompany
}

/**
 * Met à jour une entreprise existante identifié par son id 
 * @throws Si l'entreprise est introuvable
 * @param updatedCompany L'objet de l'entreprise à mettre à jour
 * @returns Entreprise
 */
function updateClient(_event: any, updatedClient: Entreprise): Entreprise {
    const companies = getCompanies()
    
    /** Variable contenant la position du client n°{id} dans la liste d'entreprises */
    const updatedClientIndex = companies.findIndex((company) => company.id === updatedClient.id)
    
    if (updatedClientIndex === -1){
        throw new Error(`Echec de la mise à jour des entreprises: Impossible de trouver l'entreprise n°${updatedClient.id} du nom de ${updatedClient.nom}`)
    }

    /** Mise à jour de la liste en remplaçant les anciennes informations de l'entreprise cliente par les nouvelles informations */
    companies[updatedClientIndex] = updatedClient
    updateJson(companies, jsonFile)
    
    return updatedClient
}


/**
 * Supprime une entreprise cliente
 * @param id Identifiant de l'entreprise à supprimer
 * @returns Renvoie l'entreprise supprimée ou null si aucune entreprise n'a été supprimée
 */
function deleteClient(_event: any, id: number): Entreprise | null {
    const companies = getCompanies()
    /** Récupère les informations de l'entreprise avant sa supprésion */
    const deletedCompany = companies.find((company) => company.id === id)

    if (deletedCompany?.isMe === true){
        throw new Error(`Echec de la suppression d'une entreprise: Impossible de supprimer votre entreprise`)
    }

    /** Met à jour la liste en renvoyant une liste sans l'entreprise supprimé */
    const updatedCompanies = companies.filter((company) => company !== deletedCompany)
    
    /** Met à jour le fichier Json avec la nouvelle liste */
    updateJson(updatedCompanies, jsonFile)
    return deletedCompany ? deletedCompany : null
}


/**
 * Récupère les informations de votre entreprise
 * @returns Entreprise
 */
function getMyEntreprise(): Entreprise {
    const companies = getCompanies()
    const provider = companies.find((company) => company.isMe === true)
    if (!provider){
        return {id: 1, nom:"", adresse: "", ville:"", codePostal:"", mail:"", numTva:"", siret:"", isMe:true}
    }
    return provider
}

export { 
    getCompanies, 
    getClients, 
    getClientById, 
    addCompany, 
    updateClient, 
    deleteClient, 
    getMyEntreprise 
}