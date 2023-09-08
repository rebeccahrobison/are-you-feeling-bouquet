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

    // find flowers that are used by a nursery
    const getFlowers = (id) => {

    }

    console.log(getNurseries(1))

    let retailersHTML = `<div id="retailers">`
    
    const divStringArray = retailers.map(
        (retailer) => {
            return `<div id="retailer">
                <h2>${retailer.name}--${retailer.distributor.name}</h2>
                <div class="sourceNurseries">${getNurseries(retailer.distributorId).map(nur => {
                    return `<p>${nur.nursery.name}</p>`
                }).join("")}</div>
            </div>`
        }
    )

    retailersHTML += divStringArray.join("")

    return retailersHTML
}