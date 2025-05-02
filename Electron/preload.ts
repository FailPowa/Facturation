import { contextBridge, ipcRenderer } from "electron";
import { Entreprise } from "./types/Entreprise";

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
    getMonEntreprise: () => ipcRenderer.invoke('getMonEntreprise')
});