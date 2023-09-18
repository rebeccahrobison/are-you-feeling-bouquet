import { DistributorNurseries, NurseryFlowers } from "./Nurseries.js"

export const Retailers = async () => {
    const response = await fetch("http://localhost:8088/retailers?_expand=distributor")
    const retailers = await response.json()

    const nurseryFlowers = await NurseryFlowers()
    const distributorNurseries = await DistributorNurseries()

    // find nurseries that are used by a distributor
    const getNurseries = (distId) => {
        // filter distributors based on retailer
        const foundDistributors = distributorNurseries.filter((distN) => distN.distributorId === distId)
        // filter nurseries based on filtered distributors
        const foundNurseries = foundDistributors.map(fD => {
            return distributorNurseries.find(nursery => nursery.id === fD.nurseryId)
        })
        return foundNurseries
    }

    // find flowers that are grown by a nursery
    const getFlowers = async (nurseryId) => {
        const foundFlowers = nurseryFlowers.filter((nursF) => nursF.nurseryId === nurseryId)
        const flowersNameArray = foundFlowers.map(flower => {return flower.flower.commonName})
        return flowersNameArray
    }

    let retailersHTML = `<div id="retailers">`

    for (const retailer of retailers) {
        retailersHTML += `<div id="retailer">
            <h2>${retailer.name}--Distributor: ${retailer.distributor.name}</h2>`
        for(const nursery of getNurseries(retailer.distributorId)) {
            let flowersFound = await getFlowers(nursery.nurseryId)
            retailersHTML += `<div class="sourceNurseries">${nursery.nursery.name} grows: <ul>`
            for(const flower of flowersFound) {
                retailersHTML += `<li>${flower}</li>`
            }
            retailersHTML += `</ul></div>`
        }
        retailersHTML+= `</div>`
    }
    
    return (retailersHTML)
}