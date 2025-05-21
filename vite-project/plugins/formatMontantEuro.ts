export function formatMontantEuro(value: number): string {
    return new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR"}).format(
        value
    ).replace(/\u202F/g, ' ')
}