const btn = document.getElementById('btn')
const seedColor = document.getElementById('seedColor')
const selectMode = document.getElementById('selectMode')
const colorDisplay = document.getElementById('colorDisplay')
const copy = document.getElementById('copy')

document.addEventListener("click", function(e){
    navigator.clipboard.writeText(e.target.dataset.color)
    if(e.target.dataset.color) {
        copy.style.display="block" 
    } else{
        copy.style.display="none" 
    }
})

btn.addEventListener("click", function(){getColorPalette()})

function getSeedColor() {
    return seedColor.value.replace('#', '')
}

function getSelectMode() {
    return selectMode.value
}

function getColorPalette() {
    fetch(`https://www.thecolorapi.com/scheme?hex=${getSeedColor()}&mode=${getSelectMode()}&count=5`)
    .then(res => res.json())
    .then(data => colorSchemeHtml(data))
}

function colorSchemeHtml(data) {
    let schemeHtml = ""
    for(let color of data.colors) {
        schemeHtml += `
        <div class="color-item">
        <div class="color-bar" style='background-color:${color.hex.value}'></div>
        <div class="color-code" data-color="${color.hex.value}">${color.hex.value}</div>
        </div>
        `
    }
    colorDisplay.innerHTML = schemeHtml
}

getColorPalette()