var gElCanvas;
var gCtx;
var gBackground;
const reg = new RegExp('[^a-zA-Z0-9!@#$%^&*()<>?":{}]', 'g');

function onWriteChar(val){
    const meme = getMeme()
    const line = meme.selectedLineIdx
    var val = document.querySelector('.text-box').value
    setLineText(val)
    if(reg.test(val)){
        gElCanvas.setAttribute('dir', 'rtl')
    }
    else{
        gElCanvas.setAttribute('dir', 'ltr')
    }
        renderMeme()    
}

function drawText() {
    const meme = getMeme()
    const font = meme.font
    var x;
    var y;
    gCtx.lineWidth = 2
    gCtx.textBaseline = 'middle'
    meme.lines.forEach((line, Idx) => {
        gCtx.font = `${line.size}px ${font}`;
        gCtx.strokeStyle = line.color
        gCtx.textAlign = line.align
        x = getX(line)
        y = getY(Idx)
        if(gBackground && Idx === meme.selectedLineIdx){
            drawBackground(y, line.size)
        }
        if(line.underline){
            drawUnderline(x, y, line, line.align)
        }
        fitText(line, font)
        gCtx.fillText(line.txt, x, y) 
        gCtx.strokeText(line.txt, x, y) 
    })
    gBackground = true
}

function getX(line){
    if(line.align === "center"){
        return gElCanvas.width / 2
    }
    else if(line.align === "left"){
        return 0
    }
    return gElCanvas.width
}

function getY(Idx){
    if(Idx === 0){
        return 50
    }
    else if(Idx === 1){
        return gElCanvas.height - 50
    }
    return gElCanvas.height / 2
}

function fitText(line, font){
    var i = 0
    while(gCtx.measureText(line.txt).width > gElCanvas.width){
        var size = line.size
        gCtx.font = `${size - i}px ${font}`
        i += 1
    }
}

function drawBackground(y, height){
    gCtx.fillStyle = "rgb(231, 248, 255, 0.5)"
    gCtx.fillRect(0, y-0.5*height, gElCanvas.width, height)
}

function drawUnderline(x, y, line, align){
    if(align === "center"){
        x = x - (gCtx.measureText(line.txt).width / 2)
    }
    else if(align === "right"){
        x = x - gCtx.measureText(line.txt).width
    }
    gCtx.beginPath()
    gCtx.moveTo(x, (y + line.size / 2) - 2)
    gCtx.lineTo(x + gCtx.measureText(line.txt).width, (y + line.size / 2) - 2)
    gCtx.stroke()
}

function renderMeme(){
    const meme = getMeme()
    let img = new Image()
    img.src = getImgUrl(meme.selectedImgId)
    img.onload = () => {
        renderImg(img)
        drawText()}
}

function renderImg(img) {
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)   
}

function onImgSelect(Idx){
    switchDisplay()
    setImg(Idx)
    renderMeme()
}

function onAddRow(){
    addRow()
    document.querySelector(".text-box").value = ''
    renderMeme()
}

function onSwitchRow(){
    switchRow()
    renderMeme()
}

function onDeleteRow(){
    deleteRow()
    document.querySelector(".text-box").value = ''
    renderMeme()
}

function onChangeFontSize(sign){
    changeFontSize(sign)
    renderMeme()
}

function onChangeAlign(where){
    changeAlign(where)
    renderMeme()
}

function onChangeFont(font){
    changeFont(font)
    renderMeme()
}

function onUnderlineRow(){
    underlineRow()
    renderMeme()
}

function onChangeColor(newColor){
    changeColor(newColor)
    renderMeme()
    document.querySelector(".change-color").value = newColor
}

function onDownload(){
    gBackground = false
    console.log("in download", gBackground)
    const elLink = document.querySelector(".download-href")
    renderMeme()
    const imgContent = gElCanvas.toDataURL('image/jpeg') // image/jpeg the default format
    elLink.href = imgContent
    elLink.download = "my-canvas.jpg"
}

function onShare(){

}
