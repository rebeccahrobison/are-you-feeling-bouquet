export const DistributorNurseries = async () => {
    const response = await fetch("http://localhost:8088/distributorNurseries?_expand=distributor&_expand=nursery")
    const distributorNurseries = await response.json()

    return distributorNurseries


}

export const NurseryFlowers = async () => {
    const response = await fetch("http://localhost:8088/nurseryFlowers?_expand=nursery&_expand=flower")
    const nurseryFlowers = await response.json()

    return nurseryFlowers
}