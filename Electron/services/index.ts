import { getTjm, updateTjm } from "./tjmService";
import { getStatuts, getStatutById, getStatutByValue } from "./statutService";
import { 
    getClients,
    getClientById,
    getClientBySiret,
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
    getFullFactureById,
    isClientInFactures,
    addFacture,
    updateFacture,
    deleteFacture,
    exportFactures,
    importFactures
} from "./factureService";
import {
    generatePdfFromFacture
} from "./generatePdfService";


export {
    // TJM
    getTjm,
    updateTjm,
    // Entreprise
    getClients,
    getClientById,
    getClientBySiret,
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
    getFullFactureById,
    isClientInFactures,
    addFacture,
    updateFacture,
    deleteFacture,
    exportFactures,
    importFactures,
    // Statut
    getStatuts,
    getStatutById,
    getStatutByValue,
    // Génération de PDF
    generatePdfFromFacture
}