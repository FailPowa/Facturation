import { CallbackMessage, FullFacture } from '../types';
import { getFullFactureById } from './';
import { dialog } from 'electron';
import path from 'path';
import { isDev } from "../config";
import puppeteer from 'puppeteer';
import fs from 'fs';
import { formatDateWithWeekday } from '../utils/dateUtils';
import { formatDate } from '../utils/dateUtils';
import { calculMontantHT, calculTVA, calculMontantTTC } from '../utils/factureUtils';

const templatesPath = isDev ? './Electron/templates' : path.join(process.resourcesPath, 'Electron/templates');

/**
 * 
 * @param _event 
 * @param id 
 * @returns 
 */
async function generatePdfFromFacture(_event: any, id: string): Promise<{ response : CallbackMessage, url: string }> {
    const fullFacture = getFullFactureById(id);
    
    // Si la facture n'est pas trouvé alors on retourne un echec
    if (!fullFacture){        
        return { 
            response:{
                code: 1,
                message: "Conversion de la facture en PDF échouée.",
                details: [`Facture ${id} introuvable.`]
            },
            url: ''
        }
    }
    // Nom par défaut du fichier
    const fileName = `${fullFacture.isAvoir ? "AVOIR" : "FACTURE"}-` + `${fullFacture.id}-` + `${fullFacture.client.nom.toUpperCase().replaceAll(' ', '-')}` 
    // Fenêtre de dialogue pour choisir l'emplacement de sauvegarde de la facture
    const result = await dialog.showSaveDialog({
        title: "Exporter facture en PDF",
        defaultPath: fileName,
        filters: [{ name: 'PDF', extensions: ['pdf'] }]
    });

    // Si l'opération a été annulé
    if (result.canceled) {
        return{ 
            response:{
                code: 2,
                message: "Export annulé.",
                details: []
            },
            url: ''
        };
    }

    const filePath = result.filePath; // Chemin absolu vers le fichier pdf
    const html = renderTemplate(fullFacture); // le template facture en html modifié
    const header = getHeaderTemplate();
    const footer = getFooterTemplate();

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Injecte le HTML brut au lieu de charger une URL
    await page.setContent(html, { waitUntil: 'networkidle0' });

    //  Génère un PDF propre avec en-têtes/pieds de page personnalisé
    await page.pdf({
        path: filePath,
        format: 'A4', // Le format du pdf
        printBackground: true, // Pour inclure couleurs de fond
        displayHeaderFooter: true, // Autorise l'affichage des en-têtes/pieds de page
        headerTemplate: header, // Header du PDF
        footerTemplate: footer, // Footer du PDF
        margin: {
            top: "60px",
            bottom: "40px"
        }
    });

    await browser.close();

    return {
        response: {
            code: 0,
            message: "Export de la facture en PDF réussi.",
            details: []
        },
        url: filePath
    }
}

/**
 * Lit et retourne le contenu HTML du template d'en-tête à insérer dans le PDF.
 *
 * @returns {string} - Le HTML du header, prêt à être injecté dans Puppeteer.
 */
function getHeaderTemplate(): string {
    const headerTemplatePath = path.join(templatesPath, 'headerTemplate.html');
    const headerTemplateHtml = fs.readFileSync(headerTemplatePath, 'utf-8');
    return headerTemplateHtml
}

/**
 * Lit et retourne le contenu HTML du template de pied de page à insérer dans le PDF.
 *
 * @returns {string} - Le HTML du footer, prêt à être injecté dans Puppeteer.
 */
function getFooterTemplate(): string {
    const footerTemplatePath = path.join(templatesPath, 'footerTemplate.html');
    const footerTemplateHtml = fs.readFileSync(footerTemplatePath, 'utf-8');
    return footerTemplateHtml
}

/**
 * Génère une chaîne HTML à partir d'un template de facture et des données d'une facture complète.
 * Remplace dynamiquement les balises personnalisées dans le fichier HTML par les valeurs réelles.
 *
 * @param {FullFacture} fullFacture - L'objet contenant toutes les informations de la facture.
 * @returns {string} - Le contenu HTML final prêt à être rendu ou converti en PDF.
 */
function renderTemplate(fullFacture: FullFacture): string {
    const templatePath = path.join(templatesPath, 'factureTemplate.html');
    const templateContent = fs.readFileSync(templatePath, 'utf8');

    // Formatage des nombres pour afficher les nombres avec 2 décimales (ex: 122 => 122,00)
    const formater = new Intl.NumberFormat("fr-FR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    })

    // Calcul des dates de début et de fin du mois de la facture
    const startDate = new Date(fullFacture.date.getFullYear(), fullFacture.date.getMonth(), 1);
    const endDate = new Date(fullFacture.date.getFullYear(), fullFacture.date.getMonth() + 1, 0);

    // Calcul des montants
    const montantHt = calculMontantHT(fullFacture.tjm, fullFacture.nbJours);
    const montantTva = calculTVA(montantHt, fullFacture.tva);
    const montantTTC = calculMontantTTC(fullFacture.tjm, fullFacture.nbJours, fullFacture.tva);

    // Date limite de paiement = date de facture + nombre de jours pour payer
    const datePaiementMax = new Date(fullFacture.date.getTime());
    datePaiementMax.setDate(datePaiementMax.getDate() + fullFacture.nbJoursPaiement)


    // Remplacer les balises dynamiques du template par les valeurs
    const html = templateContent
        // Remplace les balises de la facture
        .replace(/\[FACTURE-ID]/g, fullFacture.id)
        .replace(/\[FACTURE-TYPE]/g, `${fullFacture.isAvoir ? "AVOIR" : "FACTURE"}`)
        .replace(/\[FACTURE-DATE]/, `${formatDateWithWeekday(fullFacture.date)}`)
        .replace(/\[FACTURE-TJM]/g, `${formater.format(fullFacture.tjm).replace(/\u202F/, ' ')}`)
        .replace(/\[FACTURE-START-DATE]/g, `${formatDate(startDate)}`)
        .replace(/\[FACTURE-END-DATE]/g, `${formatDate(endDate)}`)
        .replace(/\[FACTURE-DATE-PAIEMENT-MAX]/g, `${formatDate(datePaiementMax)}`)
        .replace(/\[FACTURE-NB-JOURS-PAIEMENT]/g, `${fullFacture.nbJoursPaiement}`)
        .replace(/\[FACTURE-NB-JOURS]/g, `${formater.format(fullFacture.nbJours)}`)
        .replace(/\[FACTURE-TVA]/g, `${fullFacture.tva ? "20" : "0"}`)
        .replace(/\[FACTURE-MONTANT-HT]/g, `${formater.format(montantHt).replace(/\u202F/, ' ')}`)
        .replace(/\[FACTURE-MONTANT-TVA]/g, `${formater.format(montantTva).replace(/\u202F/, ' ')}`)
        .replace(/\[FACTURE-MONTANT-TTC]/g, `${formater.format(montantTTC).replace(/\u202F/, ' ')}`)
        // Remplace les balises de l'entreprise prestataire
        .replace(/\[ENTREPRISE-NOM]/g, fullFacture.entreprise.nom)
        .replace(/\[ENTREPRISE-MAIL]/g, fullFacture.entreprise.mail)
        .replace(/\[ENTREPRISE-ADRESSE]/g, fullFacture.entreprise.adresse)
        .replace(/\[ENTREPRISE-CP]/g, fullFacture.entreprise.codePostal)
        .replace(/\[ENTREPRISE-VILLE]/g, fullFacture.entreprise.ville)
        .replace(/\[ENTREPRISE-SIRET]/g, fullFacture.entreprise.siret)
        .replace(
            /\[ENTREPRISE-TVA]/g, 
            `${fullFacture.entreprise.numTva.length !== 0 ?
                'N° TVA Intracommunautaire : ' + fullFacture.entreprise.numTva : ""
            }`
        )
        // Remplace les balises de l'entreprise cliente
        .replace(/\[CLIENT-NOM]/g, fullFacture.client.nom)
        .replace(/\[CLIENT-ADRESSE]/g, fullFacture.client.adresse)
        .replace(/\[CLIENT-CP]/g, fullFacture.client.codePostal)
        .replace(/\[CLIENT-VILLE]/g, fullFacture.client.ville)
        .replace(/\[CLIENT-SIRET]/g, fullFacture.client.siret)
        .replace(
            /\[CLIENT-TVA]/g, 
            `${fullFacture.client.numTva.length !== 0 ?
                'N° TVA Intracommunautaire : ' + fullFacture.client.numTva : ""
            }`
        );
    return html
}


export {
    generatePdfFromFacture
}

