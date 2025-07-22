import { describe, it, expect } from 'vitest';
import { validateSiret } from '../validateSiret';

describe("Tests de la fonction validateSiret (Algorithme de Luhn)", () => {
    it("Nominal : numéro de SIRET valide (ex: 73282932000074)", () => {
        const siret = "73282932000074";
        expect(validateSiret(siret)).toBe(true);
    });

    it("Échec : numéro invalide", () => {
        const siret = "73282932000075";
        expect(validateSiret(siret)).toBe(false);
    });

    it("Échec : contient une lettre", () => {
        const siret = "73282932A00074";
        expect(validateSiret(siret)).toBe(false);
    });

    it("Échec : trop court (< 14 chiffres)", () => {
        const siret = "1234567890123"; // 13 chiffres
        expect(validateSiret(siret)).toBe(false);
    });

    it("Échec : trop long (> 14 chiffres)", () => {
        const siret = "123456789012345"; // 15 chiffres
        expect(validateSiret(siret)).toBe(false);
    });

    it("Échec : chaîne vide", () => {
        const siret = "";
        expect(validateSiret(siret)).toBe(false);
    });

    it("Échec : espaces entre les chiffres", () => {
        const siret = "7328 2932 0000 74";
        expect(validateSiret(siret)).toBe(false);
    });

    it("Valide : numéro formaté proprement sans espaces", () => {
        const siret = "55210055400013"; // Valide
        expect(validateSiret(siret)).toBe(true);
    });
});
