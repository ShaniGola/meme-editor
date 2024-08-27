
function renderGallery(){
    const pics = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16 , 17, 18]
    const htmlArray = pics.map((pic, Idx) => `<img id="${Idx}" class="img img${Idx}" src="pics/${pic}.jpg"
        onclick="onImgSelect(${Idx})"/>`)
    document.querySelector(".meme-display").innerHTML = htmlArray.join('')
}
