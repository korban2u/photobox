import Handlebars from "handlebars";

export function display_galerie(galerie){
    // console.log(galerie);
    let templateSource = document.querySelector("#galeryTemplate").innerHTML;
    let template = Handlebars.compile(templateSource);
    // console.log(template(galerie))
    document.getElementById("les_photos").innerHTML = template(galerie)

}