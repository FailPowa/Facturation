import { contextBridge, ipcRenderer } from "electron";
import { Entreprise } from "./types/Entreprise";
import { getFullFacturesByYear } from "./services";
import { Facture } from "./types";

/**
 * Expose vers le projet front un service fictif serviceElectron permettant d'effectuer les appels back
 */
contextBridge.exposeInMainWorld("serviceElectron", {
    versions: () => ipcRenderer.invoke("versions"),
    /** TJM */
    getTjm: () => ipcRenderer.invoke('getTjm'),
    updateTjm: (montant: number) => ipcRenderer.invoke('updateTjm', montant),
    /** Entreprise */
    getClients: () => ipcRenderer.invoke('getClients'),
    addClient: (newClient: Entreprise) => ipcRenderer.invoke('addClient', newClient, false),
    updateClient: (updatedClient: Entreprise) => ipcRenderer.invoke('updateClient', updatedClient),
    deleteClient: (id: number) => ipcRenderer.invoke('deleteClient', id),
    getMonEntreprise: () => ipcRenderer.invoke('getMonEntreprise'),
    /** Facture */
    getFullFacturesByYear: (year: number) => ipcRenderer.invoke('getFullFacturesByYear', year),
    getAllFacturesYears: () => ipcRenderer.invoke('getAllFacturesYears'),
    addFacture: (facture: Facture) => ipcRenderer.invoke('addFacture', facture),
    updateFacture: (updatedFacture: Facture) => ipcRenderer.invoke('updateFacture', updatedFacture),
    deleteFacture: (id: string) => ipcRenderer.invoke('deleteFacture', id),
    /** Statut */
    getStatuts: () => ipcRenderer.invoke('getStatuts'),
    getStatutByValue: (value: string) => ipcRenderer.invoke('getStatutByValue', value)
});