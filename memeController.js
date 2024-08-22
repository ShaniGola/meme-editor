var gElCanvas;
var gCtx;
// gShifted = {""}
var gText = ''
const reg = new RegExp('[^a-zA-Z0-9!@#$%^&*()<>?":{}]', 'g');

function init(){
    gElCanvas = document.getElementById('my-canvas')
    gCtx = gElCanvas.getContext('2d')
    addListeners()
    createImgs()
    
    renderGallery()
    // renderMeme()

}
function addListeners(){
    const input = document.querySelector('#meme-text')
    input.addEventListener('keydown', onWriteChar)
}

function onWriteChar(ev){
    const meme = getMeme()
    const line = meme.selectedLineIdx
    var key = ev.key
    var txt = meme.lines[line].txt
    if(key.length === 1){
        setLineText(txt += key)
    }
    else if(key === 'Backspace' && txt.length > 0){
        setLineText(txt.slice(0, -1))
        // gCurrMeme.lines[line].txt = gCurrMeme.lines[line].txt.slice(0, -1)
    }
    console.log(getMeme().lines[line].txt)
    if(reg.test(getMeme().lines[line].txt)){
        gElCanvas.setAttribute('dir', 'rtl')
    }
    else{
        gElCanvas.setAttribute('dir', 'ltr')
    }
        renderMeme()    
}

function drawText() {
    const meme = getMeme()
    var x;
    var y;
    gCtx.lineWidth = 2
    gCtx.font = "40px arial";
    gCtx.textBaseline = 'middle'
    gCtx.strokeStyle = 'brown'
    meme.lines.forEach((line, Idx) => {
        gCtx.fillStyle = line.color
        gCtx.textAlign = line.align
        if(Idx === 0){
            x = gElCanvas.width / 2
            y = 30
        }
        else if(Idx === 1){
            x = gElCanvas.width / 2
            y = gElCanvas.height - 30
        }
        gCtx.fillText(line.txt, x, y) 
        gCtx.strokeText(line.txt, x, y) 
    })

}

function renderMeme(){
    const meme = getMeme()
    let img = new Image()
    img.src = getImgUrl(meme.selectedImgId)
    img.onload = () => {
        renderImg(img)
        drawText(gElCanvas.width/2, 30)}
}


function renderImg(img) {
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)   
}

function onImgSelect(path){
    setImg(path)
    renderMeme()
}

// function onImgInput(ev) {
//     loadImageFromInput(ev, renderImg)
// }

// function loadImageFromInput(ev, onImageReady) {
//     const reader = new FileReader()
//     // After we read the file
//     reader.onload = (event) => {
//         let img = new Image() // Create a new html img element
//         img.src = event.target.result // Set the img src to the img file we read
//         // Run the callBack func, To render the img on the canvas
//         img.onload = () => onImageReady(img)
//     }


//     reader.readAsDataURL(ev.target.files[0]) // Read the file we picked


// }