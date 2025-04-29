export function numTvaFormatter(numTva: string): string {
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

export function siretFormatter(siret: string): string {
    if (siret.length != 14) throw new Error("Le numero de SIRET donné est invalide.")
    let siretFormated = ""
    for(let index = 0; index < 14; index++){
        siretFormated += siret[index]
        if ([2, 5, 8].includes(index)){
            siretFormated += ' '
        }
    }
    return siretFormated
}