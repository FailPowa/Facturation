
/**
 * Header du tableau des clients
 */
export const clientHeaders: Record<string, any>[] = [
    { title: 'Id', key: 'id', align: 'center'},
    { title: 'Nom', key: 'nom', align: 'center'},
    { title: 'Adresse', key: 'adresse', align: 'center'},
    { title: 'Mail', key: 'mail', align: 'center'},
    { title: 'Num TVA', key: 'numTva', align: 'center'},
    { title: 'Siret', key: 'siret', align: 'center'},
    { title: 'Actions', key: 'actions', align: 'center', sortable: false}
]