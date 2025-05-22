/**
 * Calcule le montant hors taxes (HT) en fonction du tarif journalier et du nombre de jours.
 *
 * @param {number} value - Le tarif journalier en euros.
 * @param {number} nbJours - Le nombre de jours travaillés.
 * @returns {number} - Le montant total HT.
 */
function calculMontantHT(value: number, nbJours: number): number {
    return value * nbJours;
}

/**
 * Calcule le montant de la TVA à partir d'un montant HT.
 *
 * @param {number} value - Le montant HT.
 * @param {boolean} tva - Indique si la TVA doit être appliquée (true) ou non (false).
 * @returns {number} - Le montant de la TVA (ou 0 si non applicable).
 */
function calculTVA(value: number, tva: boolean): number {
    return tva ? value * 0.20 : 0;
}

/**
 * Calcule le montant toutes taxes comprises (TTC), en fonction du tarif, des jours et de la TVA.
 *
 * @param {number} value - Le tarif journalier en euros.
 * @param {number} nbJours - Le nombre de jours travaillés.
 * @param {boolean} tva - Indique si la TVA doit être appliquée.
 * @returns {number} - Le montant TTC.
 */
function calculMontantTTC(value: number, nbJours: number, tva: boolean): number {
    return calculMontantHT(value, nbJours) + calculTVA(value * nbJours, tva);
}


export {
    calculMontantHT,
    calculTVA,
    calculMontantTTC
}