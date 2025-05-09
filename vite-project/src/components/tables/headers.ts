/**
 * Header du tableau des clients
 */
const clientHeaders: Record<string, any>[] = [
    { title: 'Id', key: 'id', align: 'center'},
    { title: 'Nom', key: 'nom', align: 'center'},
    { title: 'Adresse', key: 'adresse', align: 'center'},
    { title: 'Mail', key: 'mail', align: 'center'},
    { title: 'Num TVA', key: 'numTva', align: 'center'},
    { title: 'Siret', key: 'siret', align: 'center'},
    { title: 'Actions', key: 'actions', align: 'center', sortable: false}
]


/**
 * Header du tableau des factures
 */
const factureHeaders: Record<string, any>[] = [
    { title: 'ID', key: 'id', align: 'center'},
    { title: 'Date', key: 'date', align: 'center'},
    { title: 'Client', key: 'client', align: 'center'},
    { title: 'Montant HT', key: 'montantHt', align: 'center'},
    { title: 'TVA', key: 'tva', align: 'center'},
    { title: 'Montant TTC', key: 'montantTTC', align: 'center'},
    { title: 'Statut', key: 'statut', align: 'center'},
    { title: 'Date paiement', key: 'datePaiement', align: 'center'},
    { title: 'Actions', key: 'actions', align: 'center', sortable: false}
]


export { 
    clientHeaders, 
    factureHeaders 
}