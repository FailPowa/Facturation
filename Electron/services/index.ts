import { getTjm, updateTjm } from "./tjmService";
import { getStatuts, getStatutById, getStatutByValue } from "./statutService";
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
    getAllFacturesYears,
    addFacture,
    updateFacture,
    deleteFacture
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
    addFacture,
    updateFacture,
    deleteFacture,
    // Statut
    getStatuts,
    getStatutById,
    getStatutByValue
}