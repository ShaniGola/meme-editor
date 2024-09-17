function onClickGallery(){
    document.querySelector(".gallery").classList.remove("hidden")
    document.querySelector(".editor").classList.add("hidden")
    document.querySelector("#gallery").classList.add("pressed")
    document.querySelector("text-box").value = ""
}

function switchDisplay(){
    document.querySelector(".gallery").classList.add("hidden")
    document.querySelector(".editor").classList.remove("hidden")
    document.querySelector("#gallery").classList.toggle("pressed")
    resizeCanvas()
}

function addMouseListeners() {
    gElCanvas.addEventListener('mousemove', onMove)
    gElCanvas.addEventListener('mousedown', onDown)
    gElCanvas.addEventListener('mouseup', onUp)
}


function addTouchListeners() {
    gElCanvas.addEventListener('touchmove', onMove)
    gElCanvas.addEventListener('touchstart', onDown)
    gElCanvas.addEventListener('touchend', onUp)
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
        // resizeCanvas()
        renderSearchedWords()
    })
    addMouseListeners()
    addTouchListeners()
    console.log("init!!")
}

function resizeCanvas(){
    console.log('resize')
    const canvasContainer = document.querySelector(".canvas-container")
    const canvas = document.getElementById("my-canvas")
    canvasContainer.style.height = null
    canvasContainer.style.width = null
    canvas.style.width ='100%'
    canvas.style.height='100%'
    canvas.width  = canvas.offsetWidth
    canvas.height = canvas.offsetHeight
    if(getMeme()) renderMeme()
}