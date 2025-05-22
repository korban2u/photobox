import {loadPicture,loadResource} from "./lib/photoloader.js";
import {load,next} from "./gallery";
import {display_galerie} from "./gallery_ui";
import {displayComments, displayPicture} from "./ui.js";
import {API} from "./lib/phox_api";
import {displayCategorie} from "./ui.js";



function getPicture(id) {
    let photo = loadPicture(id);
    photo.then(p => {

        getCategorie(p)
        getComments(p)
        let image = {
            id: p.photo.id,
            titre: p.photo.titre,
            type: p.photo.type,
            url: API.WEB_ETU_URL + p.photo.url.href,
            descr: p.photo.descr,
        };
        // console.log(image);

        displayPicture(image);
    });

}

function getCategorie(image) {
    let uriCategorie = image.links.categorie.href
    let promiseCategorie = loadResource(uriCategorie);

    promiseCategorie.then(cat => {
        let categorie = {
            id: cat.categorie.id,
            nom: cat.categorie.nom,
            descrCategorie: cat.categorie.descr,
        }
        displayCategorie(categorie);

    });

}

function getComments(image){
    let uriComments = image.links.comments.href;
    let prosimeComments = loadResource(uriComments);

    prosimeComments.then(collection =>{
        let comments = [];

        collection.comments.forEach(c =>{
            let comment = {
                id: c.id,
                titre: c.titre,
                content: c.content,
                pseudo: c.pseudo,
                date: c.date,
            }
            comments.push(comment);
        })
        // console.log(comments);
        displayComments(comments);
    })

}


getPicture(window.location.hash ? window.location.hash.substr(1) : 105);
// console.log("idfjope");
document.getElementById("buttonGallery").addEventListener("click", e =>{
    // console.log('Bonjiir')
    let galleryData = load();

})


