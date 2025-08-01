/**
 * Algorithme de Luhn pour valider un numéro de SIRET
 * @param siret le numéro de SIRET
 * @returns boolean
 */
export function validateSiret(siret: string): boolean{
    let resultAlgoLuhn = 0

    if (siret.length !== 14)
        return false
    
    for(let index = 0; index < siret.length; index++){
        const digit = Number(siret[index])
        let resultDigit = digit
        if (index%2 === 0){
            resultDigit = 2 * digit
            if (resultDigit > 9){
                resultDigit = Math.floor(resultDigit/10) + (resultDigit%10)
            }
        }
        resultAlgoLuhn += resultDigit
    }
    return resultAlgoLuhn%10 === 0
}