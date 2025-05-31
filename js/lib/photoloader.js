import {API} from "./phox_api.js";

/**
 * Charge les détails d'une photo spécifique par son ID.
 * @param {number|string} idPicture - ID de la photo.
 * @returns {Promise<Object>} Détails complets de la photo.
 */
export async function loadPicture(idPicture) {
    let response = await fetch(API.BASE_URL + API.ENDPOINTS.PHOTOS + `/${idPicture}`);
    if (response.ok) {
        return await response.json();
    } else {
        throw new Error(`Erreur HTTP: ${response.status}`);
    }
}

/**
 * Charge une ressource depuis l'API, via une URI relative.
 * @param {string} uri - URI de la ressource.
 * @returns {Promise<Object>} JSON des données chargées.
 */
export async function loadResource(uri){
    let response = await fetch(API.WEB_ETU_URL + uri);
    if(response.ok){
        return await response.json();
    } else {
        throw new Error(`Erreur HTTP: ${response.status}`);
    }
}