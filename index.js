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

function getColorsHtml(colorsArr) {
    return colorsArr.map(color => {
        const {value} = color.hex
        return `
        <div class="color-container">
            <div class="color" style="background-color: ${value}"></div>
            <p>${value}</p>
        </div>`
    }).join('')
}
