/**
 * Récupère une date en string et renvoie cette date au format Date (classe)
 * @param dateStr Date au format DD/MM/YYYY
 * @returns Date
 */
function parseDateDDMMYYYY(dateStr: string) {
    const [ day, month, year] = dateStr.split('/').map(Number);
    return new Date(`${year}-${month}-${day}`);
}


/**
 * Convertit une date au format fr jj/mm/aaaa
 * @param date la date à convertir au format fr jj/mm/aaaa
 * @returns 
 */
function formatDate(date: Date): string {
    return date.toLocaleDateString('fr');
}

/**
 * Formate une date en français en incluant le jour de la semaine, le jour, le mois et l'année.
 * Exemple de sortie : "lundi 22 mai 2025"
 *
 * @param {Date} date - L'objet Date à formater.
 * @returns {string} - La date formatée en toutes lettres en français.
 */
function formatDateWithWeekday(date: Date): string {
    return new Intl.DateTimeFormat('fr-FR', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: '2-digit'
    }).format(date).replace(/\u202F/g, ' ');
}



export {
    parseDateDDMMYYYY,
    formatDate,
    formatDateWithWeekday
}