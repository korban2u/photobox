import Handlebars from 'handlebars';

export function displayPicture(image){
    let templateSource = document.querySelector("#photoTemplate").innerHTML;
    let template = Handlebars.compile(templateSource);
    document.getElementById("la_photo").innerHTML = template(image);
}

export function displayCategorie(categorie){
    let templateSource = document.querySelector("#categorieTemplate").innerHTML;
    let template = Handlebars.compile(templateSource);
    document.getElementById("la_categorie").innerHTML = template(categorie);
}

export function displayComments(comments){
    // console.log(comments)
    let templateSource = document.querySelector("#commentsTemplate").innerHTML;
    let template = Handlebars.compile(templateSource);
    document.getElementById("les_commentaires").innerHTML = template(comments);
}