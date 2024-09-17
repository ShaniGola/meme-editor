
var gMeme;


function getMeme(){
    return gMeme
}

function setLineText(txt){
    gMeme.lines[gMeme.selectedLineIdx].txt = txt
}

function setImg(imgId){
    const selectedImg = gImgs.find(img => img.id === imgId)
    gMeme = {selectedImgId: selectedImg.id,
        selectedLineIdx: 0 ,font: 'impact', url: selectedImg.url,
        lines: [{txt: '', size: 40, align: 'center', color: '#000000', underline: false, pos: {x: 0, y:0}, drag: false}]}
}


function getImgUrl(imgId){
    const selectedImg = gImgs.find(img => img.id === imgId)
    return selectedImg.url
}

function addRow(){
    gMeme.lines.push({txt:'', size: 40, align: 'center', color: '#000000', underline: false, pos: {x: 0, y:0}, drag: false})
    gMeme.selectedLineIdx = gMeme.lines.length - 1
}

function switchRow(row){
    gMeme.selectedLineIdx = row ? row : (gMeme.selectedLineIdx + 1) % gMeme.lines.length
}

function deleteRow(){
    gMeme.lines.splice(gMeme.selectedLineIdx, 1)
    if(!gMeme.lines.length){
        addRow()
    }
    switchRow()
}

function changeFontSize(sign){
    gMeme.lines[gMeme.selectedLineIdx].size += sign*5
}

function changeAlign(where){
    gMeme.lines[gMeme.selectedLineIdx].align = where
}

function changeFont(font){
    gMeme.font = font
}

function underlineRow(){
    gMeme.lines[gMeme.selectedLineIdx].underline = !gMeme.lines[gMeme.selectedLineIdx].underline
}

function changeColor(newColor){
    gMeme.lines[gMeme.selectedLineIdx].color = newColor
}

function getSelectedLineIdx(){
    return gMeme.selectedLineIdx
}

function setRowPos(x, y){
    gMeme.lines[getSelectedLineIdx()].pos = {x, y}
}

function findClickedRow(pos){
    return gMeme.lines.findIndex(line => line.pos.y-0.5 * line.size <= pos.y && line.pos.y+0.5 * line.size >= pos.y)
}

function setCurrRowDrag(setTo){
    gMeme.lines[getSelectedLineIdx()].drag = setTo
}

function getCurrRow(){
    return gMeme.lines[getSelectedLineIdx()]
}

function moveRow(dx, dy){
    const row = getCurrRow()
    row.pos.x += dx
    row.pos.y += dy
}

function checkHoveringRow(pos, canvasWidth){
    return gMeme.lines.some(line => line.pos.y-0.5 * line.size < pos.y && line.pos.y+0.5 * line.size > pos.y 
        && 1 < pos.x && canvasWidth-1 > pos.x)
        //we dont want to stay on "grab" cursor when outside the canvas or not hovering row
    
}