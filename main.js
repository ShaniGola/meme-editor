function onClickGallery(){
    document.querySelector(".gallery").classList.remove("hidden")
    document.querySelector(".editor").classList.add("hidden")
    document.querySelector("#gallery").classList.toggle("pressed")
}

function switchDisplay(){
    document.querySelector(".gallery").classList.add("hidden")
    document.querySelector(".editor").classList.remove("hidden")
}