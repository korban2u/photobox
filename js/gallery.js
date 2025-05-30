
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

        // Clic sur une image pour ouvrir la lightbox
        document.querySelectorAll("img[data-photoId]").forEach(img => {
            img.addEventListener("click", () => {
                openLightbox(img.dataset.photoid);
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