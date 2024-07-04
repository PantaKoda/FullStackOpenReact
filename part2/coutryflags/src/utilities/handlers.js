import axios from "axios";


const BASE_URL = 'https://studies.cs.helsinki.fi';
const ALL_URL = `${BASE_URL}/restcountries/api/all`;
const NAME_URL = `${BASE_URL}/restcountries/api/name/`;


async function getAllCountries() {

    try {
        const request = await axios.get(ALL_URL)
        return request.data
    } catch (error) {
        console.log('Error fetching all data', error)
        return []
    }
}


async function getCountriesByName(name) {
    try {
        const request = await axios.get(`${NAME_URL}${name}`);
        return request.data
    } catch (error) {
        console.log('Error fetching data for country: ', name, error)
        return []
    }

}


async function getCurrentWeather(LAT, LON, API_KEY) {
    try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${LAT}&lon=${LON}&appid=${API_KEY}&units=metric`)
        return response.data
    } catch (error) {
        console.log("There was an error fetching weather data :", error)
        return {}
    }
}

export default {getAllCountries, getCountriesByName, getCurrentWeather}