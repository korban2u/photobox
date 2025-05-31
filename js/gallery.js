import {loadResource} from "./lib/photoloader";
import {API} from "./lib/phox_api";
import {display_galerie} from "./gallery_ui";
import {getPicture} from "./index.js";
import {initLightbox, openLightbox} from "./lightbox.js";

/**
 * Lance le chargement initial de la galerie.
 * @returns {Promise<Object>} La galerie avec les photos et liens.
 */
export function load() {
    const photosPromesse = loadResource(API.AFTER_WEB_ETU_URL + API.ENDPOINTS.PHOTOS);
    return loadPhotos(photosPromesse);
}

/**
 * Charge les photos et prépare les données pour l'affichage.
 * @param {Promise<Object>} photosPromesse - Promesse contenant les données JSON des photos.
 */
export async function loadPhotos(photosPromesse) {
    try {
        const collection = await photosPromesse;

        // On transforme les données en objet pour les afficher plus tard avec la gallerie
        const listPhotos = collection.photos.map(p => ({
            id: p.photo.id,
            titre: p.photo.titre,
            file: p.photo.file,
            url: API.WEB_ETU_URL + p.photo.original.href,
        }));

        const galleryData = {
            links: collection.links,
            photos: listPhotos,
        };

        display_galerie(galleryData);

        initLightbox(galleryData);

        document.getElementById("next")?.addEventListener("click", () => next(galleryData));
        document.getElementById("prev")?.addEventListener("click", () => prev(galleryData));
        document.getElementById("last")?.addEventListener("click", () => last(galleryData));
        document.getElementById("first")?.addEventListener("click", () => first(galleryData));

        updateNavigationButtons(galleryData); // etat du bouton (grisé ou pas)

        // clic sur une image pour ouvrir la lightbox ET changer la photo principale
        document.querySelectorAll("img[data-photoId]").forEach(img => {
            img.addEventListener("click", () => {
                const photoId = img.dataset.photoid;

                // Mettre à jour l'URL avec l'ID de la photo
                window.location.hash = photoId;

                // Charger la photo dans la page principale
                getPicture(photoId);

                // Ouvrir la lightbox
                openLightbox(photoId);
            });
        });

        return galleryData;
    } catch (err) {
        console.error("Erreur de chargement des photos :", err);
    }
}

/**
 * Charge la page suivante de la galerie.
 * @param {Object} gallery - Données actuelles de la galerie avec liens.
 */
export function next(gallery) {
    const photosPromesse = loadResource(gallery.links.next.href);
    return loadPhotos(photosPromesse);
}

/**
 * Charge la page précédente de la galerie.
 * @param {Object} gallery - Données actuelles de la galerie avec liens.
 */
export function prev(gallery) {
    const photosPromesse = loadResource(gallery.links.prev.href);
    return loadPhotos(photosPromesse);
}

export function first(gallery){
    const photoPromesse = loadResource(gallery.links.first.href);
    return loadPhotos(photoPromesse)
}

export function last(gallery){
    const photoPromesse = loadResource(gallery.links.last.href);
    return loadPhotos(photoPromesse)
}

/**
 * Met à jour l'état des boutons de navigation (grisés si pas disponibles)
 * @param {Object} gallery - Données actuelles de la galerie avec liens
 */
function updateNavigationButtons(gallery) {
    const nextBtn = document.getElementById("next");
    const prevBtn = document.getElementById("prev");
    const firstBtn = document.getElementById("first");
    const lastBtn = document.getElementById("last");

    // Détection de la première page :
    // Compliqué ici car l'API renvoie un lien "prev" même pour la première page,
    // et que ce lien est identique à celui de la page 2 (ils pointent tout els deux vers la meme page.
    // ça rend la différentiation difficile.
    // Solution : on vérifie si le lien "prev" correspond au lien de la première page et
    // que le lien "next" ne correspond pas à la page 3 (car la vraie première page ne peut pas précéder la page 3).
    const isFirstPage = gallery.links.prev.href === gallery.links.first.href && !gallery.links.next.href.includes("page=3");

    // Détection de la dernière page :
    // Même principe que pour la première page, il faut contourner une incohérence de l'API.
    // On récupère le numéro total de pages via le lien "last" (ex: page=5) et on calcule le numéro de l'avant-dernière page (max - 2).
    // Ensuite, on vérifie que le lien "next" pointe vers la dernière page et
    // que le lien "prev" n'est pas celui de l'avant-dernière page (car la vraie dernière page ne peut pas suivre cette page).
    let url = gallery.links.last.href;
    let match = url.match(/page=(\d+)/);
    let page = match ? parseInt(match[1]) - 2 : null;
    const isLastPage = gallery.links.next.href === gallery.links.last.href && !gallery.links.prev.href.includes("page=" + page);




    // Désactiver prev et first si on est à la première page
    if (prevBtn) {
        prevBtn.disabled = isFirstPage;
        prevBtn.style.opacity = isFirstPage ? "0.5" : "1";
    }

    if (firstBtn) {
        firstBtn.disabled = isFirstPage;
        firstBtn.style.opacity = isFirstPage ? "0.5" : "1";
    }

    // Désactiver next et last si on est à la dernière page
    if (nextBtn) {
        nextBtn.disabled = isLastPage;
        nextBtn.style.opacity = isLastPage ? "0.5" : "1";
    }

    if (lastBtn) {
        lastBtn.disabled = isLastPage;
        lastBtn.style.opacity = isLastPage ? "0.5" : "1";
    }
}