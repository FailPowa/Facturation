/**
 * Type représentant la reponse renvoyé à la partie 
 * cliente pour la réussite ou l'echec d'une opération
 */
interface CallbackMessage {
    code: number // Code : 0 (succès) ou 1 (échec) ou 2 (annulation)
    message: string // ex: L'operation a été réalisé avec succés
    details: string[] // Contient les détails sur ce qui a mis en échec l'opération réalisé
}

// Enumération contenant les different code de retour
enum ResultCode {
    Success = 0,
    Warning = 1,
    Cancel = 2
}


export type {
    CallbackMessage
}

export {
    ResultCode
}
