import { readJson, updateJson, createJson } from './jsonService';
import { dialog } from 'electron';
import { 
    Entreprise, 
    isEntrepriseArray, 
    validateEntreprise,
    CallbackMessage
} from '../types';



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
 * Récupère un client selon son numero de siret mais retourne null si aucun client n'a été trouvé
 * @param siret Siret de l'entreprise recherché
 * @returns Entreprise or null
 */
function getClientBySiret(siret: string): Entreprise | null {
    const clients = getClients();
    
    // Variable contenant le client trouvé ou null
    const findedClient = clients.find(client => client.siret === siret) || null
    return findedClient 
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

    /** 
     * Récupère l'id (attribut de type number) le plus grand parmi ceux existant, 
     * l'incrémente de 1 et associe le résultat à l'id de la nouvelle entreprise enregistré 
     * Si la nouvelle entreprise n'est pas votre entreprise, alors l'id sera 'id votre entreprise' + 1
     */
    newCompany.id = Math.max(...companies.map((company) => company.id).concat([1])) + 1    

    if (isMe === true){
        const index = companies.findIndex((company) => company.isMe === true)
        if (index !== -1) 
            throw new Error(`Echec de l'ajout d'une nouvelle entreprise, votre entreprise est déjà créée: Voir l'option modifier si vous voulez apportez des modifications`);
        /** L'id de votre entreprise sera toujours 1 */
        newCompany.id = 1
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

/**
 * Exporte les clients et retourne le message d'echec/succès de l'opération
 * @param _event
 * @returns Promise<CallbackMessage>
 */
function exportClients(_event: any): Promise<CallbackMessage> {
    // La liste clients avec leurs ids retirés
    const clients = getClients().map( client => {
        let result: Record<string, any> = Object.assign({}, client)
        delete result.id
        return result
    });
    
    // Variable contenant la reponse concernant l'echec/succès de l'opération
    const response : CallbackMessage = { code: 0, message: "Export réussi avec succès.", details: [] }

    // Fenetre d'export des clients
    return dialog.showSaveDialog({
        title: "Exporter clients",
        filters: [
            { name: 'Json', extensions: ['json']}
        ]
    }).then( (result) : CallbackMessage => {
        // Si l'utilisateur annule l'export, on retourne rien
        if (result.canceled){
            response.code = 2
            response.message = "Export annulé."
            return response
        }
        // Chemin absolu vers le fichier exporter
        const filePath = result.filePath
        // Création du fichier json
        createJson(clients, filePath)
        return response
    })
}

/**
 * Importe les clients et retourne le message d'echec/succès de l'opération
 * @param _event
 * @returns Promise<CallbackMessage>
 */
function importClients(_event: any) : Promise<CallbackMessage>{
    // La liste des entreprises
    const entreprises = getCompanies();

    // Variable contenant la reponse concernant l'echec/succès de l'opération
    const response : CallbackMessage = { code: 0, message: "Import réussi avec succès.", details: [] }

    // Fenêtre d'import des clients
    return dialog.showOpenDialog({
        // Propriétés de la fenêtre d'import de fichier
        properties: [ 'openFile' ],
        // Filtre les fichier en afficahnt seulement les fichiers '*.json'
        filters: [
            { name: 'json', extensions: ['json']}
        ]
    }).then( (result) : CallbackMessage => {
        // Si l'utilisateur annule l'import, on retourne rien
        if (result.canceled)
            return { code: 2, message: "Import annulé.", details: []}
        // Chemin absolu du fichier importé
        const filePath = result.filePaths[0];
        // La liste des clients importés
        const uploadedClients = readJson(filePath, false);


        // Verifier si le json est bien une liste d'entreprise
        if (isEntrepriseArray(uploadedClients)){
            /**
             * Verifie si les entreprises sont au formats valide et 
             * qu'il n'y est pas de doublon d'entreprise présent.
             * */
            let isUploadedClientsValid = true 
            uploadedClients.forEach(uploadedClient => {
                const currentClientErrors: string[] = []
                const nomClient = uploadedClient.nom.trim().length !== 0 ? uploadedClient.nom 
                    : `index n°${uploadedClients.findIndex((value) => value === uploadedClient)}`
                
                if (!validateEntreprise(uploadedClient)){
                    const message = `Le client ${nomClient} comporte des champs non valides, tous les champs doit être remplis et 
                        les numéros de tva et de siret doit être au bon format et valide.`
                    currentClientErrors.push(message)
                }
                
                const isEntrepriseNotDuplicated = entreprises.every( entreprise => {
                    return entreprise.siret !== uploadedClient.siret &&
                        entreprise.numTva.length === 0 || entreprise.numTva !== uploadedClient.numTva                    
                })
                
                if (!isEntrepriseNotDuplicated)
                    currentClientErrors.push(`Duplication: Les numéros de siret et/ou de siret du client ${nomClient} sont déjà présents.`)
                
                if (currentClientErrors.length !== 0){
                    response.details.push(...currentClientErrors)
                    isUploadedClientsValid = false
                }
            })
            if (!isUploadedClientsValid){
                response.code = 1
                response.message = "Echec de l'import.";
                return response
            }
            // Variable contenant le dernier id de la liste des clients déjà sauvegardés
            let lastId = Math.max(...entreprises.map((entreprise) => entreprise.id));
            // Un map des clients avec l'ajout des ids
            const mappedUploadedClients = uploadedClients.map( entreprise => {
                lastId = lastId + 1
                entreprise.nom = entreprise.nom.toUpperCase();
                entreprise.mail = entreprise.mail.toLowerCase();
                entreprise.ville = entreprise.ville.toUpperCase();
                entreprise.id = lastId;
                entreprise.isMe = false;
                return entreprise;
            })
            // Jointure des deux listes : clients déjà sauvegardé + clients importés
            const finalClientsList = entreprises.concat(...mappedUploadedClients);
            // Mise à jour des clients dans 'entreprise.json'
            updateJson(finalClientsList, jsonFile);
            return response
        } else {
            response.code = 1;
            response.message = "Echec de l'import.";
            response.details.push("Certaines entreprises ne respectent pas le format d'entreprise voulus.");
            return response
        }
        
    });
}

export { 
    getCompanies, 
    getClients, 
    getClientById,
    getClientBySiret,
    addCompany, 
    updateClient, 
    deleteClient, 
    getMyEntreprise,
    exportClients,
    importClients
}