
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
        selectedLineIdx: 0 ,font: 'impact',
        lines: [{txt: '', size: 40, align: 'center', color: '#000000', underline: false}]}
}

function getImgUrl(imgId){
    const selectedImg = gImgs.find(img => img.id === imgId)
    return selectedImg.url
}

function addRow(){
    gMeme.lines.push({txt:'', size: 40, align: 'center', color: '#000000'})
    gMeme.selectedLineIdx = gMeme.lines.length - 1
}

function switchRow(){
    gMeme.selectedLineIdx = (gMeme.selectedLineIdx + 1) % gMeme.lines.length
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
