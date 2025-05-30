import Handlebars from "handlebars";

/**
 * Décode les entités HTML en caractères normaux
 * @param {string} text - Texte avec des entités HTML
 * @returns {string} Texte décodé
 */
function decodeHtmlEntities(text) {
    return text.replace(/&#39;/g, "'")
        .replace(/&quot;/g, '"')
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>');
}

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
    // Nettoyer le texte avant affichage
    image.titre = decodeHtmlEntities(image.titre);
    image.descr = decodeHtmlEntities(image.descr);
    renderTemplate("#photoTemplate", image, "la_photo");
}

/** Affiche une catégorie associée à l'image */
export function displayCategorie(categorie) {
    // Nettoyer le texte avant affichage
    categorie.nom = decodeHtmlEntities(categorie.nom);
    renderTemplate("#categorieTemplate", categorie, "la_categorie");
}

/** Affiche les commentaires liés à une image */
export function displayComments(comments) {
    // Nettoyer chaque commentaire
    for (let i = 0; i < comments.length; i++) {
        comments[i].titre = decodeHtmlEntities(comments[i].titre);
        comments[i].content = decodeHtmlEntities(comments[i].content);
        comments[i].pseudo = decodeHtmlEntities(comments[i].pseudo);
    }
    renderTemplate("#commentsTemplate", comments, "les_commentaires");
}