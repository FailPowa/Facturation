/**
 * Récupère une date en string et renvoie cette date au format Date (classe)
 * @param dateStr Date au format DD/MM/YYYY
 * @returns Date
 */
export function parseDateDDMMYYYY(dateStr: string){
    const [ day, month, year] = dateStr.split('/').map(Number)
    return new Date(`${year}-${month}-${day}`)
}


/**
 * Convertit une date au format fr jj/mm/aaaa
 * @param date la date à convertir au format fr jj/mm/aaaa
 * @returns 
 */
export function formatDate(date: Date): string{
    return `${date.getDay()}/${date.getMonth()}/${date.getFullYear()}`
}