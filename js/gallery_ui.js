import Handlebars from "handlebars";

/**
 * Affiche une galerie de photos dans la section "les_photos" à partir d'un template Handlebars.
 * @param {Object} galerie - Contient la liste des photos et les liens de navigation.
 */
export function display_galerie(galerie) {
    renderTemplate("#galeryTemplate", galerie, "les_photos");
}

/**
 * Fonction utilitaire pour compiler un template Handlebars et insérer le rendu dans le DOM.
 * @param {string} templateId - Sélecteur CSS du template Handlebars.
 * @param {Object} data - Données à injecter dans le template.
 * @param {string} targetId - ID de l'élément HTML cible pour le rendu.
 */
function renderTemplate(templateId, data, targetId) {
    const source = document.querySelector(templateId).innerHTML;
    const template = Handlebars.compile(source);
    document.getElementById(targetId).innerHTML = template(data);
}
