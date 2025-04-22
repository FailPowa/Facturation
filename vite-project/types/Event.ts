/** Classe pour les événements spécifiques au calendrier */
export interface CalendarEvent {
    id: number; // ID de l'événement
    start: string; // Date de début de l'événement
    end: string; // Date de fin de l'événement
    title: string; // Titre de l'événement
    content: string; // Détail de l'événement
    class: string; // Class CSS de l'événement ( pour spécifier une couleur de fond par ex )
    split: number;
    statut: string; // Le statut de l'événement
    deletable: boolean; // L'événement est supprimable ?
    resizable: boolean; // La durée de l'événement est modifiable ?
    draggable: boolean; // L'évenement est modifiable par drag & drop ?
}

/** Classe des événements enregistrés dans le fichier JSON */
export interface Event {
    id: number; // ID de l'événement
    titre: string; // Titre de l'événement
    details: string; // Détails de l'événement
    debut: string | Date; // Date de début de l'événement
    fin: string | Date; // Date de fin de l'événement
    statut: number; // ID du statut de l'événement
    tranche: number; // ID de la tranche de l'événement
}