const colorSelectorForm = document.getElementById("color-selector-form")

colorSelectorForm.addEventListener('submit', e => {
    e.preventDefault()

    const colorFormData = new FormData(colorSelectorForm)
    const rawSeed = colorFormData.get("seed-color")
    const seedColor = rawSeed.replace(/^#/, "")
    const colorMode = colorFormData.get("mode")

    fetch(`https://www.thecolorapi.com/scheme?hex=${seedColor}&mode=${colorMode}`)
        .then(res => res.json())
        .then(schemeData => {
            document.getElementById('color-scheme-container').innerHTML = getColorsHtml(schemeData.colors)
        })
})

document.getElementById("color-scheme-container").addEventListener("click", e => {
    e.preventDefault()
    
    if (e.target.dataset.color) {
        copyToClipboard(e.target.dataset.color)
    }
})

function getColorsHtml(colorsArr) {
    return colorsArr.map((color, index) => {
        const {value} = color.hex
        return `
        <div class="color-container" id=${index} data-color=${value}>
            <div class="color" style="background-color: ${value}" data-color=${value}></div>
            <p>${value}</p>
        </div>`
    }).join('')
}


async function copyToClipboard(text) {
    try {
        await navigator.clipboard.writeText(text)
        console.log("Text copied to clipboard:", text)
    } catch (err) {
        console.error("Failed to copy text:", err)
    }
}