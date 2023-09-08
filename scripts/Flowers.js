export const Flowers = async () => {
    const response = await fetch("http://localhost:8088/flowers")
    const flowers = await response.json()

    let flowersHTML = `<div id="flowers">`
    
    const divStringArray = flowers.map(
        (flower) => {
            return `<div id="flower">
                <h2>${flower.commonName}</h2>
            </div>`
        }
    )

    flowersHTML += divStringArray.join("")

    return flowersHTML
}