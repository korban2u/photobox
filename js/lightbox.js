import {getPicture} from "./index.js";

let currentGalleryData = null;
let currentPhotoIndex = 0;

/**
 * Initialise la lightbox avec les données de la galerie
 * @param {Object} galleryData - Données de la galerie avec photos
 */
export function initLightbox(galleryData) {
    currentGalleryData = galleryData;

    document.getElementById("lightbox-close").addEventListener("click", closeLightbox);
    document.getElementById("lightbox-prev").addEventListener("click", showPrevImage);
    document.getElementById("lightbox-next").addEventListener("click", showNextImage);

    // pour pouvoir fermer avec la touche escape, et utiliser les flèches pour naviger
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            closeLightbox();
        }
        if (e.key === "ArrowLeft") {
            showPrevImage();
        }
        if (e.key === "ArrowRight") {
            showNextImage();
        }
    });

    // pour pouvoir fermer en cliquant sur l'arrière-plan
    document.getElementById("lightbox").addEventListener("click", (e) => {
        if (e.target.id === "lightbox") {
            closeLightbox();
        }
    });
}

/**
 * Ouvre la lightbox avec une photo spécifique
 * @param {string} photoId - ID de la photo à afficher
 */
export function openLightbox(photoId) {
    if (!currentGalleryData) {
        return;
    }

    // trouver l'index de la photo dans la galerie
    currentPhotoIndex = currentGalleryData.photos.findIndex(photo => photo.id == photoId);

    if (currentPhotoIndex === -1){
        return; // si y'a pas de photo selectionner on fait rien
    }

    getPicture(photoId);

    showCurrentImage();
    document.getElementById("lightbox").classList.add("active"); // pour le css
}

/**
 * Ferme la lightbox
 */
function closeLightbox() {
    document.getElementById("lightbox").classList.remove("active");
}

/**
 * Affiche l'image courante dans la lightbox
 */
function showCurrentImage() {
    if (!currentGalleryData || currentPhotoIndex < 0 || currentPhotoIndex >= currentGalleryData.photos.length) {
        return;
    }

    const currentPhoto = currentGalleryData.photos[currentPhotoIndex];

    document.getElementById("lightbox-image").src = currentPhoto.url;
    document.getElementById("lightbox-image").alt = currentPhoto.titre;
    document.getElementById("lightbox-title").textContent = currentPhoto.titre;

    const prevBtn = document.getElementById("lightbox-prev");
    const nextBtn = document.getElementById("lightbox-next");

    // on affiche ou pas les bouton (first/last)
    prevBtn.style.display = currentPhotoIndex > 0 ? "block" : "none";
    nextBtn.style.display = currentPhotoIndex < currentGalleryData.photos.length - 1 ? "block" : "none";
}

/**
 * Affiche l'image précédente
 */
function showPrevImage() {
    if (currentPhotoIndex > 0) {
        currentPhotoIndex--;
        const currentPhoto = currentGalleryData.photos[currentPhotoIndex];

        // met à jour l'URL dans le navigateur sans recharger la page
        window.location.hash = currentPhoto.id;

        getPicture(currentPhoto.id);

        showCurrentImage();
    }
    // Si on est au début, on ne fait rien (le bouton sera caché)
}



/**
 * Affiche l'image suivante
 */
function showNextImage() {
    if (currentPhotoIndex < currentGalleryData.photos.length - 1) {
        currentPhotoIndex++;
        const currentPhoto = currentGalleryData.photos[currentPhotoIndex];

        // met à jour l'URL dans le navigateur sans recharger la page
        window.location.hash = currentPhoto.id;


        getPicture(currentPhoto.id);

        showCurrentImage();
    }
    // Si on est à la fin, on ne fait rien (le bouton sera caché)
}