import { Flowers } from "./Flowers.js"
import { Retailers } from "./Retailers.js"

const container = document.querySelector("#container")

const render = async () => {
    const flowersHtml = await Flowers()
    const retailersHTML = await Retailers()

    const composedHTML = `
    <h1>Are You Feeling Bouquet?</h1>
    ${flowersHtml}
    ${retailersHTML}`

    container.innerHTML = composedHTML
}

render()