
/**
 * Formate le numero de TVA au format suivant : FRXX XXX XXX XXX
 * @param numTva le numéro de tva
 * @returns string
 */
function numTvaFormatter(numTva: string): string {
    let numTvaFormated = ""
    if (numTva.length != 0){
        if (numTva.length != 13)
            throw new Error("Le numéro de TVA donné est invalide.")
        
        for(let index = 0; index < 13; index++){
            numTvaFormated += numTva[index]
            if ([3, 6, 9].includes(index)){
                numTvaFormated += ' '
            }
        }
    }
    return numTvaFormated
}

89825053500017
/**
 * Formate un numero de SIRET au format suivant : XXX XXX XXX XXXXX
 * @param siret le numéro de siret
 * @returns string
 */
function siretFormatter(siret: string): string {
    if (siret.length !== 14) throw new Error("Le numero de SIRET donné est invalide.")
    let siretFormated = ""
    for(let index = 0; index < 14; index++){
        siretFormated += siret[index]
        if ([2, 5, 8].includes(index)){
            siretFormated += ' '
        }
    }
    return siretFormated
}

export { numTvaFormatter, siretFormatter}