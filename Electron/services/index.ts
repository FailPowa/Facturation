import { getTjm, updateTjm } from "./tjmService";
import { 
    getClients, 
    addCompany, 
    updateClient, 
    deleteClient, 
    getMyEntreprise 
} from "./entrepriseService";
import { getFactures } from "./factureService";
import { getStatuts } from "./statutService";


export {
    // TJM
    getTjm,
    updateTjm,
    // Entreprise
    getClients,
    addCompany,
    updateClient,
    deleteClient,
    getMyEntreprise,
    // Facture
    getFactures,
    // Statut
    getStatuts
}