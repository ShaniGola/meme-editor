function onClickGallery(){
    document.querySelector(".gallery").classList.remove("hidden")
    document.querySelector(".editor").classList.add("hidden")
    document.querySelector("#gallery").classList.add("pressed")
}

function switchDisplay(){
    document.querySelector(".gallery").classList.add("hidden")
    document.querySelector(".editor").classList.remove("hidden")
    document.querySelector("#gallery").classList.toggle("pressed")
}

function init(){
    gBackground = true
    gElCanvas = document.getElementById('my-canvas')
    gCtx = gElCanvas.getContext('2d')
    createImgs()
    renderGallery(getImgs())
    gWordSearchCounts = getFromStorage(COUNTSMAP)
    if(!gWordSearchCounts){
        gWordSearchCounts = new Map()
    }
    renderSearchedWords()
    window.addEventListener('resize', () => {
        renderSearchedWords()
    })
    console.log("init!!")
}