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


async function generatePdfFromFacture(_event: any, id: string): Promise<CallbackMessage> {
    const fullFacture = getFullFactureById(id);
    
    
    if (!fullFacture)
        return {
            code: 1,
            message: "Conversion de la facture en PDF échouée.",
            details: []
        };

    const result = await dialog.showSaveDialog({
        title: "Exporter facture en PDF",
        filters: [{ name: 'pdf', extensions: ['pdf'] }]
    });

    if (result.canceled) {
        return {
            code: 2,
            message: "Export annulé.",
            details: []
        };
    }

    const filePath = result.filePath;
    const html = renderTemplate(fullFacture)
    const header = getHeaderTemplate();
    const footer = getFooterTemplate();

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Injecte le HTML brut au lieu de charger une URL
    await page.setContent(html, { waitUntil: 'networkidle0' });

    //  Génère un PDF propre sans en-têtes/pieds du navigateur
    await page.pdf({
        path: filePath,
        format: 'A4',
        printBackground: true, // Pour inclure couleurs de fond
        displayHeaderFooter: true,
        headerTemplate: header, // Header du PDF
        footerTemplate: footer, // Footer du PDF : page/totalPages ex: Page 1 / 1
    });

    await browser.close();

    return {
        code: 0,
        message: "Export de la facture en PDF réussi.",
        details: []
    };
}

function getHeaderTemplate(): string {
    const headerTemplatePath = path.join(templatesPath, 'headerTemplate.html');
    const headerTemplateHtml = fs.readFileSync(headerTemplatePath, 'utf-8');
    return headerTemplateHtml
}

function getFooterTemplate(): string {
    const footerTemplatePath = path.join(templatesPath, 'footerTemplate.html');
    const footerTemplateHtml = fs.readFileSync(footerTemplatePath, 'utf-8');
    return footerTemplateHtml
}


function renderTemplate(fullFacture: FullFacture): string {
    const templatePath = path.join(templatesPath, 'factureTemplate.html');
    const templateContent = fs.readFileSync(templatePath, 'utf8');
    
    const formatterEuro = new Intl.NumberFormat("fr-FR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    })

    const startDate = new Date(fullFacture.date.getFullYear(), fullFacture.date.getMonth(), 1);
    const endDate = new Date(fullFacture.date.getFullYear(), fullFacture.date.getMonth() + 1, -1);
    const montantHt = calculMontantHT(fullFacture.tjm, fullFacture.nbJours);
    const montantTva = calculTVA(montantHt, fullFacture.tva);
    const montantTTC = calculMontantTTC(fullFacture.tjm, fullFacture.nbJours, fullFacture.tva);

    const datePaiementMax =new Date(fullFacture.date.setDate(fullFacture.date.getDate() + fullFacture.nbJoursPaiement));

    // Remplacer les balises dynamiques du template par les valeurs
    const html = templateContent
        // Remplacer les balises de la facture
        .replace(/\[FACTURE-ID]/g, fullFacture.id)
        .replace(/\[FACTURE-TYPE]/g, `${fullFacture.isAvoir ? "Avoir" : "Facture"}`)
        .replace(/\[FACTURE-DATE]/, `${formatDateWithWeekday(fullFacture.date)}`)
        .replace(/\[FACTURE-TJM]/g, `${formatterEuro.format(fullFacture.tjm).replace(/\u202F/, ' ')}`)
        .replace(/\[FACTURE-START-DATE]/g, `${formatDate(startDate)}`)
        .replace(/\[FACTURE-END-DATE]/g, `${formatDate(endDate)}`)
        .replace(/\[FACTURE-DATE-PAIEMENT-MAX]/g, `${formatDate(datePaiementMax)}`)
        .replace(/\[FACTURE-NB-JOURS-PAIEMENT]/g, `${fullFacture.nbJoursPaiement}`)
        .replace(/\[FACTURE-NB-JOURS]/g, `${formatterEuro.format(fullFacture.nbJours)}`)
        .replace(/\[FACTURE-TVA]/g, `${fullFacture.tva ? "20" : "0"}`)
        .replace(/\[FACTURE-MONTANT-HT]/g, `${formatterEuro.format(montantHt).replace(/\u202F/, ' ')}`)
        .replace(/\[FACTURE-MONTANT-TVA]/g, `${formatterEuro.format(montantTva).replace(/\u202F/, ' ')}`)
        .replace(/\[FACTURE-MONTANT-TTC]/g, `${formatterEuro.format(montantTTC).replace(/\u202F/, ' ')}`)
        // Remplacer les balises de l'entreprise prestataire
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
        // Remplacer les balises de l'entreprise cliente
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

