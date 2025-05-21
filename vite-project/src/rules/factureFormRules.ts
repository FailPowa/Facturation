const nbJoursRules = [
    (value: number) => value > 0 || 'Le nombre de jours travaillés doit être supérieur à 0.',
    (value: number) => value < 31 || 'Le nombre de jours travaillés doit être inférieur ou égal à 30.'
]

const clientRules = [
    (value: any) => {
        return value !== -1 || 'Le client doit être selectionné.'
    }
]

const conditionPaiementRules = [
    (value: number) => value > 0 || 'La condition de paiement doit être supérieur à 0 (en nombre de jours).'
]

export {
    nbJoursRules,
    clientRules,
    conditionPaiementRules
}