import { contextBridge, ipcRenderer } from "electron";
import { Entreprise } from "./types/Entreprise";

/**
 * Expose vers le projet front un service fictif serviceElectron permettant d'effectuer les appels back
 */
contextBridge.exposeInMainWorld("serviceElectron", {
    versions: () => ipcRenderer.invoke("versions"),
    getTjm: () => ipcRenderer.invoke('getTjm'),
    updateTjm: (montant: number) => ipcRenderer.invoke('updateTjm', montant),
    getClients: () => ipcRenderer.invoke('getClients'),
    addClient: (newClient: Entreprise) => ipcRenderer.invoke('addClient', newClient, false)
});