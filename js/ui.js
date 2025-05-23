import Handlebars from "handlebars";

/**
 * Compile un template Handlebars et affiche les données dans un élément du DOM.
 * @param {string} templateId - Sélecteur CSS du template.
 * @param {Object} data - Données à injecter.
 * @param {string} targetId - ID de l'élément HTML cible.
 */
function renderTemplate(templateId, data, targetId) {
    const source = document.querySelector(templateId).innerHTML;
    const template = Handlebars.compile(source);
    document.getElementById(targetId).innerHTML = template(data);
}

/** Affiche une image individuelle */
export function displayPicture(image) {
    renderTemplate("#photoTemplate", image, "la_photo");
}

/** Affiche une catégorie associée à l'image */
export function displayCategorie(categorie) {
    renderTemplate("#categorieTemplate", categorie, "la_categorie");
}

/** Affiche les commentaires liés à une image */
export function displayComments(comments) {
    renderTemplate("#commentsTemplate", comments, "les_commentaires");
}
