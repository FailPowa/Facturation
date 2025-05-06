import { getTjm, updateTjm } from "./tjmService";
import { getStatuts, getStatutById } from "./statutService";
import { 
    getClients,
    getClientById,
    addCompany, 
    updateClient, 
    deleteClient, 
    getMyEntreprise 
} from "./entrepriseService";
import { 
    getFactures,
    getFullFacturesByYear,
    getAllFacturesYears
} from "./factureService";


export {
    // TJM
    getTjm,
    updateTjm,
    // Entreprise
    getClients,
    getClientById,
    addCompany,
    updateClient,
    deleteClient,
    getMyEntreprise,
    // Facture
    getFactures,
    getFullFacturesByYear,
    getAllFacturesYears,
    // Statut
    getStatuts,
    getStatutById
}