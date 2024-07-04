function countryTimeIndex(countriesClickTime, name) {
    return countriesClickTime.findIndex(entry => entry.country === name);
}

async function countryExists(countriesClickTime, existingIndex, currentTime, setCountriesClickTime, getWeatherData, name) {
    const storedTime = new Date(countriesClickTime[existingIndex].time).getTime();
    const timeDiff = currentTime - storedTime;

    if (timeDiff < (60 * 60 * 1000)) {
        return null; // No need to fetch new data
    } else {
        const hoverTime = new Date().toISOString();
        setCountriesClickTime(previousTime => {
            const updatedTimeEntries = [...previousTime];
            updatedTimeEntries[existingIndex] = {country: countriesClickTime[existingIndex].country, time: hoverTime};
            return updatedTimeEntries;
        });

        // Fetch new weather data
        return await getWeatherData(name);
    }
}

async function checkWeatherApiTime(currentTime, countriesClickTime, name, setCountriesClickTime, getWeatherData) {
    const existingIndex = countryTimeIndex(countriesClickTime, name);

    if (existingIndex !== -1) {
        const weather = await countryExists(countriesClickTime, existingIndex, currentTime, setCountriesClickTime, getWeatherData, name);
        if (weather !== null) {
            return weather; // Return the fetched weather data if it was fetched
        }
        return null; // No need to fetch new data
    } else {
        // Country not found, just add the current info (name, time)
        const hoverTime = new Date().toISOString();
        setCountriesClickTime(previousTime => [...previousTime, {country: name, time: hoverTime}]);

        // Fetch new weather data
        return await getWeatherData(name);
    }
}

export default {checkWeatherApiTime};
