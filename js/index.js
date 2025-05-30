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
function getComments(image) {
    const uriComments = image.links.comments.href;
    console.log(uriComments);

    loadResource(uriComments)
        .then(collection => {
            const comments = collection.comments.map(c => ({
                id: c.id,
                titre: c.titre,
                content: c.content,
                pseudo: c.pseudo,
                date: c.date,
            }));
            displayComments(comments);

            // Supprimer les anciens event listeners pour éviter les doublons
            const existingForm = document.getElementById("commentForm");
            if (existingForm) {
                existingForm.replaceWith(existingForm.cloneNode(true));
            }

            const form = document.getElementById("commentForm");
            if (form) {
                form.addEventListener("submit", async (e) => {
                    e.preventDefault();

                    const pseudo = document.getElementById("pseudo");
                    const titre = document.getElementById("titreComment");
                    const comment = document.getElementById("commentaire");

                    // Vérification que les champs ne sont pas vides
                    if (!pseudo.value.trim() || !titre.value.trim() || !comment.value.trim()) {
                        alert("Tous les champs sont obligatoires !");
                        return;
                    }

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
                            headers: {
                                'Content-Type': "application/json"
                            }
                        });

                        if (response.ok) {
                            // Succès : vider les champs et recharger les commentaires
                            pseudo.value = '';
                            titre.value = '';
                            comment.value = '';

                            console.log("Commentaire ajouté avec succès !");

                            // Recharger les commentaires pour voir le nouveau
                            setTimeout(() => {
                                getComments(image);
                            }, 500);

                        } else {
                            console.error("Erreur lors de l'envoi :", response.status, response.statusText);
                            alert("Erreur lors de l'envoi du commentaire. Veuillez réessayer.");
                        }

                    } catch (err) {
                        console.error("Erreur réseau :", err);
                        alert("Erreur de connexion. Veuillez vérifier votre connexion internet.");
                    }
                });
            }
        })
        .catch(err => console.error("Erreur chargement commentaires :", err));
}

// Chargement automatique si l'URL contient un ID de photo
getPicture(window.location.hash ? window.location.hash.substr(1) : 105);

// Bouton pour recharger la galerie
document.getElementById("buttonGallery").addEventListener("click", () => {
    load().catch(err => console.error("Erreur lors du chargement de la galerie :", err));
});


