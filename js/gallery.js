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

        // Transformation des données brutes en structure utilisable
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

        // Initialiser la lightbox avec les données de la galerie
        initLightbox(galleryData);

        // Ajout des gestionnaires pour la navigation
        document.getElementById("next")?.addEventListener("click", () => next(galleryData));
        document.getElementById("prev")?.addEventListener("click", () => prev(galleryData));
        document.getElementById("last")?.addEventListener("click", () => last(galleryData));
        document.getElementById("first")?.addEventListener("click", () => first(galleryData));

        // Mettre à jour l'état des boutons
        updateNavigationButtons(galleryData);

        // Clic sur une image pour ouvrir la lightbox ET changer la photo principale
        document.querySelectorAll("img[data-photoId]").forEach(img => {
            img.addEventListener("click", () => {
                const photoId = img.dataset.photoid;

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

    // Méthode simple : on regarde si les liens existent et s'ils sont différents

    // Pour la première page : si prev existe et qu'il est différent de first
    const isFirstPage = !gallery.links.prev ||
        (gallery.links.prev && gallery.links.first &&
            gallery.links.prev.href === gallery.links.first.href);

    // Pour la dernière page : si next n'existe pas OU si next est égal à last
    const isLastPage = !gallery.links.next ||
        (gallery.links.next && gallery.links.last &&
            gallery.links.next.href === gallery.links.last.href);

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