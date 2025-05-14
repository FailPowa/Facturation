import { getTjm, updateTjm } from "./tjmService";
import { getStatuts, getStatutById, getStatutByValue } from "./statutService";
import { 
    getClients,
    getClientById,
    addCompany, 
    updateClient, 
    deleteClient, 
    getMyEntreprise,
    exportClients,
    importClients
} from "./entrepriseService";
import { 
    getFactures,
    getFullFacturesByYear,
    getAllFacturesYears,
    getLastFacture,
    isClientInFactures,
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
    exportClients,
    importClients,
    // Facture
    getFactures,
    getFullFacturesByYear,
    getAllFacturesYears,
    getLastFacture,
    isClientInFactures,
    addFacture,
    updateFacture,
    deleteFacture,
    // Statut
    getStatuts,
    getStatutById,
    getStatutByValue
}