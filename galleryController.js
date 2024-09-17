
function renderGallery(imgs){
    var htmlArray = imgs.map(img => `<img id="${img.id}" class="img img${img.id}" src="${img.url}"
        onclick="onImgSelect(${img.id})"/>`)
    htmlArray.push(`<div class="img upload-img"><input type="file" onchange="onImgInput(event)" style="opacity:0; width:100%; height:100%;"/><p>Upload</p></div>`)
    document.querySelector(".meme-display").innerHTML = htmlArray.join('')
    }
    
function renderSearchedWords(){
    const idx = window.innerWidth > 900 ? 5 : window.innerWidth < 700 ? 4: 3
    const words = ['funny', 'cats', 'politics', 'babies', 'cute'].slice(0, idx)
    const wordMap = getWordsMap()
    var searchBarEl = document.querySelector(".words-bar")
    const htmlArray = words.map(word => {
        var searched = wordMap[word] ? wordMap[word] : 0
        var calc = Math.min(1+(searched/100), 2.5)
        return `<li><a href="#" id="${word}" onclick="onSearchImgs(this.id)" style="font-size:${calc}rem">${word}</a></li>`})
    searchBarEl.innerHTML = htmlArray.join('')
}

function onSearchImgs(searchWord){
    const imgs = searchImgs(searchWord)
    renderGallery(imgs)
    renderSearchedWords()
}

function onOpenModal(){
    const categories = Array.from(getCategories())
    const htmlArray = categories.map(category => `<li><a href="#" onclick="onSearchImgs('${category}')">${category}</a></li>`)
    document.querySelector(".modal-ul").innerHTML = htmlArray.join('')
    document.querySelector(".modal").classList.toggle("hidden")
    console.log(document.querySelector("header .more").innerText === "More")
    document.querySelector("header .more").innerText = document.querySelector("header .more").innerText === "More"? "Less" : "More"
}

function loadImageFromInput(ev, onImageReady) {
    const reader = new FileReader()
    // After we read the file
    reader.onload = (event) => {
        let img = new Image() // Create a new html img element
        img.src = event.target.result // Set the img src to the img file we read
        // Run the callBack func, To render the img on the canvas
        img.onload = () => {
            const imgId = addImg(event.target.result)
            calcDim(imgId)
            onImgSelect(imgId)}
    }


    reader.readAsDataURL(ev.target.files[0]) // Read the file we picked


}
function onImgInput(ev) {
    loadImageFromInput(ev)
}

