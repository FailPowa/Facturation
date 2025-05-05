import dayjs from 'dayjs';

/**
 * Formatte une date avec dayjs dans le format spécifié
 * @param date La date à convertir
 * @param format Le format demandé
 */
export function formatDate(date: Date, format: string): string {
    return dayjs(date).format(format);
}

/**
 * Retourne l'heure d'une date donnée ( 0 - 23 )
 * @param date La date requêtée
 */
export function checkDateHour(date: Date): number {
    return dayjs(date).hour();
}

/**
 * Compare si les deux dates sont identiques
 * @param date1 Première date
 * @param date2 Seconde date
 * @returns true si elles sont identiques
 */
export function datesAreSame(date1: Date, date2: Date): boolean {
    return dayjs(date1).isSame(date2);
}