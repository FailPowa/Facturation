/**
 * Récupère une date en string et renvoie cette date au format Date (classe)
 * @param dateStr Date au format DD/MM/YYYY
 * @returns Date
 */
export function parseDateDDMMYYYY(dateStr: string){
    const [ day, month, year] = dateStr.split('/').map(Number)
    return new Date(`${year}-${month}-${day}`)
}