import countryHandlers from './handlers'


async function storeCountryNames() {

    const countriesRequest = await countryHandlers.getAllCountries()
    return countriesRequest.map(country => country.name.common)
}


async function getCountryByName(countryName) {
    try {
        const countryRequest = await countryHandlers.getCountriesByName(countryName)
        const {name, capital, region, subregion, languages, area, flags, population, cca2} = countryRequest
        return {
            name: name.common,
            capital,
            region,
            subregion,
            languages,
            area,
            flags: flags.svg,
            population,
            cca2
        }
    } catch (error) {
        console.log("There was an error fetching country : ", countryName, error)
        return {}
    }
}


async function currentWeatherData(LAT, LON, API_KEY, name, countryCode) {

    const response = await countryHandlers.getCurrentWeather(LAT, LON, API_KEY, name, countryCode)

    const {weather, main, wind, sys} = response
    return {
        weather,
        temp: main.temp,
        humidity: main.humidity,
        windSpreed: wind.speed,
        sunrise: sys.sunrise,
        sunset: sys.sunset
    }

}

export default {storeCountryNames, currentWeatherData, getCountryByName}