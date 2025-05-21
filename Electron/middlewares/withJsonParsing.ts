/**
 * Enveloppe une fonction de gestion d'événement IPC afin de parser automatiquement une chaîne JSON 
 * en objet avant de l'envoyer à la fonction qui gère l'évènement.
 * 
 * Cette fonction est utile dans le contexte d'Electron avec ipcMain.handle, lorsque les données 
 * reçues sont envoyées sous forme de chaîne JSON (string) et doivent être transformées en objet avant d'être traiter.
 * 
 * @param handler - La fonction qui va gérer l'événement après transformation des données. 
 *                  Elle reçoit l'objet Event Electron en premier argument, et les données parsées en second.
 * @param parser - La fonction utilisée pour parser la chaîne JSON en objet. 
 *                 Par défaut, il s'agit de JSON.parse, mais elle peut être remplacé par une fonction personnalisé 
 *                 respectant la syntaxe : (value: string) => any .
 * 
 * @returns Une fonction compatible avec ipcMain.handle, prenant l'événement et une chaîne JSON,
 *          parse cette chaîne avec `parser`, puis appelle `handler` avec l'objet obtenu.
 */
export function withJsonParsing(
    handler: (_event: any, data: any) => any, 
    parser: (json: string) => any = JSON.parse
){
    return (_event: any, json: string) => {
        return handler(_event, parser(json))
    }
}