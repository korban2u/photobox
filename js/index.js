import {loadPicture, loadResource} from "./lib/photoloader.js";
import {load} from "./gallery";
import {displayComments, displayPicture, displayCategorie} from "./ui.js";
import {API} from "./lib/phox_api";

/**
 * Charge et affiche une photo avec ses informations, sa catégorie et ses commentaires.
 * @param {number|string} id - ID de la photo à afficher.
 */
export function getPicture(id) {
    loadPicture(id)
        .then(p => {
            getCategorie(p);
            getComments(p);

            const image = {
                id: p.photo.id,
                titre: p.photo.titre,
                type: p.photo.type,
                url: API.WEB_ETU_URL + p.photo.url.href,
                descr: p.photo.descr,
            };

            displayPicture(image);
        })
        .catch(err => console.error("Erreur lors du chargement de la photo :", err));
}

/**
 * Charge et affiche la catégorie d'une photo.
 * @param {Object} image - Données complètes de la photo.
 */
function getCategorie(image) {
    const uriCategorie = image.links.categorie.href;
    loadResource(uriCategorie)
        .then(cat => {
            const categorie = {
                id: cat.categorie.id,
                nom: cat.categorie.nom,
                descrCategorie: cat.categorie.descr,
            };
            displayCategorie(categorie);
        })
        .catch(err => console.error("Erreur chargement catégorie :", err));
}

/**
 * Charge et affiche les commentaires associés à une photo.
 * @param {Object} image - Données complètes de la photo.
 */
async function getComments(image) {
    const uriComments = image.links.comments.href;

    try {
        const comments = await fetchLastComments(uriComments);
        displayComments(comments);
        setupCommentForm(image, uriComments);
    } catch (err) {
        console.error("Erreur chargement commentaires :", err);
    }
}

// Récupère les derniers commentaires
async function fetchLastComments(uriComments) {
    const collection = await loadResource(uriComments);
    const lastURI = collection.links?.last?.href || uriComments;
    const cl = await loadResource(lastURI);

    return cl.comments.map(function(comment) {
        return {
            id: comment.id,
            titre: comment.titre,
            content: comment.content,
            pseudo: comment.pseudo,
            date: comment.date
        };
    });
}

// Prépare le formulaire et gère l'envoi
function setupCommentForm(image, uriComments) {


    const oldForm = document.getElementById("commentForm");
    if (!oldForm) {
        return;
    }

    // on evite de cloner les listener donc on clone et remplace pour les supprimer
    const newForm = oldForm.cloneNode(true);
    oldForm.replaceWith(newForm);

    newForm.addEventListener("submit", async  (e) => {
        e.preventDefault();

        const pseudo = document.getElementById("pseudo");
        const titre = document.getElementById("titreComment");
        const comment = document.getElementById("commentaire");


        // recup les valeur et on eleve les espaces inutiles
        const json_data = JSON.stringify({
            titre: titre.value.trim(),
            pseudo: pseudo.value.trim(),
            content: comment.value.trim()
        });

        try {

            const response = await fetch(API.WEB_ETU_URL + uriComments, {
                method: 'POST',
                body: json_data,
                credentials: 'include',
                headers: { 'Content-Type': "application/json" }
            });

            if (response.ok) { // on vide les champs du formulaire
                pseudo.value = '';
                titre.value = '';
                comment.value = '';

                getComments(image); // puis on affiche le nouveau commentaire
            } else {
                alert("Erreur lors de l'envoi du commentaire.");
            }
        } catch (err) {
            console.error("Erreur réseau :", err);
            alert("Erreur de connexion.");
        }
    });
}




// Chargement automatique si l'URL contient un ID de photo
getPicture(window.location.hash ? window.location.hash.substr(1) : 105);

// Bouton pour recharger la galerie
document.getElementById("buttonGallery").addEventListener("click", () => {
    load().catch(err => console.error("Erreur lors du chargement de la galerie :", err));
});


