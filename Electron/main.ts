import { app, BrowserWindow, BrowserWindowConstructorOptions, ipcMain, screen } from "electron";
import path from "path";
import { isDev } from "./config";
import { appConfig } from "./ElectronStore/Configuration";
import AppUpdater from "./AutoUpdate";
import { withJsonParsing } from "./middlewares/withJsonParsing"
import {
    // TJM
    getTjm,
    updateTjm,
    // Entreprise
    getClients,
    addCompany,
    updateClient,
    deleteClient,
    getMyEntreprise,
    exportClients,
    importClients,
    // Facture
    getFullFacturesByYear,
    getAllFacturesYears,
    getLastFacture,
    isClientInFactures,
    addFacture,
    updateFacture,
    deleteFacture,
    exportFactures,
    importFactures,
    // Statut
    getStatuts,
    getStatutByValue,
    // Générer PDF
    generatePdfFromFacture,
} from './services';
import { jsonStringToFacture } from "./types";


/**
 * Fonction de création de la fenêtre
 */
async function createWindow() {
    const { width, height } = screen.getPrimaryDisplay().workAreaSize;
    const appBounds: any = appConfig.get("setting.appBounds");
    const BrowserWindowOptions: BrowserWindowConstructorOptions = {
        width: 1200,
        minWidth: 900,
        height: 750,
        minHeight: 600,

        webPreferences: {
            webSecurity: false, // Temporaire
            preload: __dirname + "/preload.js",
            devTools: isDev,
        },
        show: false,
        alwaysOnTop: true,
        frame: true,
    };

    if (appBounds !== undefined && appBounds !== null) Object.assign(BrowserWindowOptions, appBounds);
    const mainWindow = new BrowserWindow(BrowserWindowOptions);

    // auto updated
    if (!isDev) AppUpdater();

    // and load the index.html of the app.
    // win.loadFile("index.html");
    await mainWindow.loadURL(isDev ? "http://localhost:3000" : `file://${path.join(__dirname, "./index.html")}`);

    if (appBounds !== undefined && appBounds !== null && appBounds.width > width && appBounds.height > height) mainWindow.maximize();
    else mainWindow.show();

    // this will turn off always on top after opening the application
    setTimeout(() => {
        mainWindow.setAlwaysOnTop(false);
    }, 1000);

    // Open the DevTools.
    if (isDev) {
        mainWindow.webContents.openDevTools();
    }
}

/** Ecoute des événements concernant les events pour charger les événements du fichier JSON */
// TJM
ipcMain.handle('getTjm', getTjm);
ipcMain.handle('updateTjm', updateTjm);
// Entreprise
ipcMain.handle('getClients', getClients);
ipcMain.handle('addClient', addCompany);
ipcMain.handle('updateClient', updateClient),
ipcMain.handle('deleteClient', deleteClient);
ipcMain.handle('getMonEntreprise', getMyEntreprise);
// Facture
ipcMain.handle('getFullFacturesByYear', getFullFacturesByYear);
ipcMain.handle('getAllFacturesYears', getAllFacturesYears);
ipcMain.handle('getLastFacture', getLastFacture)
ipcMain.handle('addFacture', withJsonParsing(addFacture, jsonStringToFacture));
ipcMain.handle('updateFacture', withJsonParsing(updateFacture, jsonStringToFacture));
ipcMain.handle('deleteFacture', deleteFacture);
ipcMain.handle('isClientInFactures', isClientInFactures);
// Statut
ipcMain.handle('getStatuts', getStatuts);
ipcMain.handle('getStatutByValue', getStatutByValue);
// Import et Exports de données
ipcMain.handle('exportClients', exportClients);
ipcMain.handle('importClients', importClients);
ipcMain.handle('exportFactures', exportFactures);
ipcMain.handle('importFactures', importFactures);
// Générer PDF
ipcMain.handle('generatePdfFromFacture', generatePdfFromFacture);
// Versions
ipcMain.handle('versions', () => {
    return {
        node: process.versions.chrome,
        chrome: process.versions.chrome,
        electron: process.versions.electron,
        version: app.getVersion(),
        name: app.getName(),
    };
});


// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(async () => {
    // if dev
    if (isDev) {
        try {
            const { installExt } = await import("./installDevTool");
            await installExt();
        } catch (e) {
            console.log("Can not install extension!");
        }
    }

    createWindow();
    app.on("activate", function () {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});