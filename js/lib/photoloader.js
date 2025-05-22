import {API} from "./phox_api.js"

export async function loadPicture(idPicture) {
    let response = await fetch(API.BASE_URL + API.ENDPOINTS.PHOTOS + `/${idPicture}`);
    if (response.ok) {
        return await response.json();
    } else {
        throw new Error(`Erreur HTTP: ${response.status}`);
    }
}

export async function loadResource(uri){
    // console.log(API.WEB_ETU_URL + uri)
    let response = await fetch(API.WEB_ETU_URL + uri);
    if(response.ok){
        return await response.json()
    } else {
        throw new Error(`Erreur HTTP: ${response.status}`);
    }
}

