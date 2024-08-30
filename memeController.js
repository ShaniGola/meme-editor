'use strict'
var gElCanvas;
var gCtx;
var gBackground;
const reg = new RegExp('[^a-zA-Z0-9!@#$%^&*()<>?":{}]', 'g');
const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']

function onWriteChar(val){
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
        x = line.pos.x
        y = line.pos.y
        gCtx.font = `${line.size}px ${font}`;
        gCtx.strokeStyle = line.color
        gCtx.textAlign = line.align

        if(Idx === getSelectedLineIdx()){
            drawBackground(y, line.size)
        }
        if(line.underline){
            drawUnderline(x, y, line, line.align)
        }
        fitText(line, font)
        gCtx.fillStyle = "white"
        gCtx.fillText(line.txt, x, y) 
        gCtx.strokeText(line.txt, x, y) 
    })
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
    if(!gBackground) return
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
    return img
}

function renderImg(img) {
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)   
}

function onImgSelect(Idx){
    switchDisplay()
    setImg(Idx)
    setRowPos(gElCanvas.width / 2, getY(getSelectedLineIdx()))
    renderMeme()
}

function onAddRow(){
    addRow()
    document.querySelector(".text-box").value = ''
    setRowPos(gElCanvas.width / 2, getY(getSelectedLineIdx()))
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
    renderMeme()
    const elLink = document.querySelector(".download-href")
    const imgContent = gElCanvas.toDataURL('image/jpeg') // image/jpeg the default format
    elLink.href = imgContent
}

function onShare(){

}

function onDown(ev){
    const pos = getEvPos(ev)
    const row = findClickedRow(pos)
    if(row === -1) return
    switchRow(row)
    setCurrRowDrag(true)
    document.body.style.cursor = 'grabbing'
}

function onMove(ev){
    const { drag, pos: rowPos} = getCurrRow()
    const pos = getEvPos(ev)
    changeCursor(pos)
    if(!drag) return
    const dx = pos.x - rowPos.x
    const dy = pos.y - rowPos.y
    moveRow(dx, dy)
    renderMeme()
}

function onUp(ev){
    setCurrRowDrag(false)
    renderMeme()
    document.body.style.cursor = 'grab'
}

function changeCursor(pos){
    const { width: currCanvasWidth } = document.querySelector("#my-canvas").getBoundingClientRect()
    if(checkHoveringRow(pos, currCanvasWidth)) document.body.style.cursor = 'grab'
    else document.body.style.cursor = 'default'
    return checkHoveringRow(pos, currCanvasWidth)
}
function getEvPos(ev) {
    // Gets the offset pos , the default pos
    let pos = {
        x: ev.offsetX,
        y: ev.offsetY,
    }
    // Check if its a touch ev
    if (TOUCH_EVS.includes(ev.type)) {
        //soo we will not trigger the mouse ev
        ev.preventDefault()
        //Gets the first touch point
        ev = ev.changedTouches[0]
        //Calc the right pos according to the touch screen
        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
        }
    }
    return pos
}