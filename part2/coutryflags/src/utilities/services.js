import countryHandlers from './handlers'


async function storeCountryNames() {

    const countriesRequest = await countryHandlers.getAllCountries()
    return countriesRequest.map(country => country.name.common)
}


async function getCountryByName(countryName) {
    try {
        const countryRequest = await countryHandlers.getCountriesByName(countryName)
        console.log(countryRequest)
        const {name, capital, region, subregion, languages, area, flags, population} = countryRequest
        console.log({
            name: name.common,
            capital,
            region,
            subregion,
            languages,
            area,
            flags: flags.svg,
            population
        })
        return {
            name: name.common,
            capital,
            region,
            subregion,
            languages,
            area,
            flags: flags.svg,
            population
        }
    } catch (error) {
        console.log("There was an error fetching country : ", countryName, error)
        return {}
    }
}


export default {storeCountryNames, getCountryByName}