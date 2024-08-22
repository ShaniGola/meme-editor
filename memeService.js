var gImgs = []
var gMeme;

function createImgs(){
    for(var i = 1; i < 19; i++){
        gImgs.push({id: i-1, url: `pics/${i}.jpg`, keywords: []})
    }
}


function getMeme(){
    return gMeme
}

function setLineText(txt){
    gMeme.lines[gMeme.selectedLineIdx].txt = txt
}

function setImg(imgId){
    const selectedImg = gImgs.find(img => img.id === imgId)
    gMeme = {selectedImgId: selectedImg.id,
        selectedLineIdx: 0 ,
        lines: [{txt: '', size: 20, align: 'center', color: 'white'}]}
}

function getImgUrl(imgId){
    const selectedImg = gImgs.find(img => img.id === imgId)
    return selectedImg.url
}

