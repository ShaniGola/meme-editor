const COUNTSMAP = "searched words counts map"
var gImgs = []
const gImgsCategories = [['politics', 'funny'], ['dog', 'pets', 'cute'], ['babies', 'dog', 'cute', 'pets'], ['pets', 'cats', 'cute'], ['babies', 'funny'], ['funny'], ['babies', 'cute'], ['man'], ['babies'], ['man', 'politics', 'funny'], ['kiss'], ['man'], ['man', 'cheers'], ['man', 'upset'], ['man'], ['man', 'funny'], ['man', 'politics'], ['cartoon']]
var gWordSearchCounts;

function createImgs(){
    for(var i = 1; i < 19; i++){
        gImgs.push({id: i-1, url: `pics/${i}.jpg`, keywords: gImgsCategories[i-1]})
    }
}

function getImgs(){
    return gImgs
}

function addImg(path){
    gImgs.push({id: gImgs.length+1, url: path, keywords: []})
    return gImgs[gImgs.length-1].id
}

function searchImgs(searchWord){
    updateSearchMap(searchWord)
    return gImgs.filter(img => img.keywords.some(word => word.includes(searchWord.toLowerCase())))
}

function updateSearchMap(searchWord){
    if(!gImgsCategories.some(imgCat => imgCat.includes(searchWord))) return
    const currCount = gWordSearchCounts[searchWord]
    gWordSearchCounts[searchWord] = currCount ? currCount + 1 : 1
    saveToStorage(COUNTSMAP, gWordSearchCounts)
}

function getCategories(){
    const categories = gImgsCategories.reduce((categoriesSet, imgCategories) => {
        imgCategories.forEach(category => {
            categoriesSet.add(category)
        })
        return categoriesSet
    }, new Set())
    return categories 
}

function getWordsMap(){
    return gWordSearchCounts
}