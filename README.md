# Facturation
Outil de facturation local pour un développeur indépendant

### Auteurs
##### [Bonnay Florentin](https://github.com/FailPowa) & [Ahamada Ibrahim](https://github.com/CashmereM)

---
# Environnement
    - Node JS ( 22.14 )
    - NPM ( 11.3.0 )
    - Yarn ( 1.22.22 )
    - Typescript ( 5.6.2 )
    - Electron ( 32.1.2 )
    - Vue ( 3.5 )
    - Vuetify ( 3.7 )

    Le projet est divisé en deux
        Un projet Electron pour l'architecture de notre application et les services
        Un projet Vue pour l'UI de notre application

    Les deux projets communiquent par la communication inter-processus d'Electron qui fournit à notre projet Vue un accès aux services par le biais de canaux IPC

---
# Installation

```bash
# Aller dans le projet Vue
cd vite-project
# Installer les packages
yarn install
# Retourner à la racine du projet
cd ..
# Installer les packages
yarn install
# Lancer le script de build
yarn build
# Lancer le projet en local
yarn start
# Build le projet en prod
yarn app:build
```

---
# Prérequis
Des fichiers JSON pour stocker les différentes données de l'application sont nécessaires à son bon fonctionnement

Ceux-ci sont stockés dans le dossier `Electron/resources/` et suivent les modèles de leurs types respectifs dans le dossier `Electron/types/`

> Le premier fichier JSON s'intitule `tjm.json` et suit ce modèle
>>```json
>>{
>>    "montant": "number"
>>}
>>```
>
> Le second fichier JSON s'intitule `entreprise.json` et suit ce modèle
>>```json
>>[
>>    {
>>        "id": number,
>>        "nom": "string",
>>        "adresse": "string",
>>        "codePostal": "string",
>>        "ville": "string",
>>        "mail": "string",
>>        "numTva": "string",
>>        "siret": "string",
>>        "isMe": boolean
>>    }    
>>]
>>```
>
> Le troisième fichier JSON s'intitule `statut.json` et suit ce modèle
>>```json
>>[
>>    {
>>        "id": number,
>>        "value": "string",
>>        "text": "string",
>>        "color": "string"
>>    }    
>>]
>>```
>
> Le quatrième fichier JSON s'intitule `facture.json` et suit ce modèle
>>```json
>>[
>>    {
>>        "id": number,
>>        "isAvoir": boolean,
>>        "date": "date",
>>        "tjm": number,
>>        "nbJours": number,
>>        "entrepriseId": number,
>>        "clientId": number,
>>        "tva": boolean,
>>        "nbJoursPaiement": number,
>>        "statutId": number,
>>        "datePaiement": "date"
>>    }    
>>]
>>```