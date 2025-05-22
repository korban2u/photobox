import {loadResource} from "./lib/photoloader";
import {API} from "./lib/phox_api";
import {displayPicture} from "./ui";
import {display_galerie} from "./gallery_ui";

export function load() {
    let photosPromesse = loadResource(API.AFTER_WEB_ETU_URL+API.ENDPOINTS.PHOTOS)

    return loadPhotos(photosPromesse);
}


function loadPhotos(photosPromesse){
    photosPromesse.then(collection => {
        let listPhotos = [];
        collection.photos.forEach(p => {
                let image = {
                    id: p.photo.id,
                    titre: p.photo.titre,
                    file: p.photo.file,
                    url: API.WEB_ETU_URL + p.photo.original.href,
                };

                listPhotos.push(image);
            }
        )
        let galleryData = {
            links : collection.links,
            photos: listPhotos,
        }
        // console.log(listPhotos);
        display_galerie(galleryData);
        document.getElementById("next").addEventListener("click", e =>{
                next(galleryData)
                console.log("wshh")
            }
        );
        return galleryData;
    })
}

export function next(gallery){
    let photosPromesse = loadResource(gallery.links.href);
    return loadPhotos(photosPromesse);
}