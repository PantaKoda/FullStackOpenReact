import CountryDetails from "./CountryDetails";
import countryServices from '../utilities/services'
import {useEffect} from 'react'
import utilities from '../utilities/utilities'

export function SearchList({
                               countryNames,
                               activeIndices,
                               setActiveIndices,
                               filterInput,
                               setCountriesCache,
                               countriesCache,
                               setCountriesClickTime,
                               countriesClickTime
                           }) {


// Use effect to reset activeIndices when filterInput is cleared


    const filteredArray = countryNames.filter(country => country.toLowerCase().includes(filterInput.toLowerCase()))

    useEffect(() => {
        if (filterInput === '' || filteredArray.length > 1) {
            setActiveIndices(new Set());
        }
    }, [filterInput, setActiveIndices]);

    useEffect(() => {
        console.log(countriesClickTime)
        console.log(countriesCache)
    }, [countriesClickTime, countriesCache])

    //Get data when hover over button
    const getCountry = async (name) => {
        const currentTime = new Date().getTime();

        // If it is open to request again
        if (activeIndices.has(name)) {
            return null;
        }

        // Check if the country is already in the cache
        if (countriesCache.some(country => country.name === name)) {
            return;
        }

        // Fetch country data
        const country = await countryServices.getCountryByName(name);

        // Fetch weather data independently
        const weather = await utilities.checkWeatherApiTime(
            currentTime,
            countriesClickTime,
            name,
            setCountriesClickTime,
            async (name) => await countryServices.currentWeatherData('252871d9986eac617bcc6690cbfd0d88', country.capital, country.cca2)
        );

        // Add weather data to the country data
        const combinedData = {
            ...country,
            weather
        };

        // Cache the combined data
        setCountriesCache(previousState => [...previousState, combinedData]);
    };

    const handleClick = (index) => {


        setActiveIndices((prevActiveIndices) => {
            const newIndices = new Set(prevActiveIndices);
            if (prevActiveIndices.has(index)) {
                newIndices.delete(index);
            } else {
                newIndices.add(index);
            }
            return newIndices;
        });
    };


    const countryListResults = () => {
        return (
            <>
                {filteredArray.map((item) => (
                    <li key={item} className={`grid grid-cols-2 ${activeIndices.has(item) ? 'row-span-2' : ''}`}>
                        {item}
                        <button
                            type='button'
                            onMouseEnter={() => getCountry(item)}
                            onClick={() => handleClick(item)}
                            className="bg-amber-100 border-2 rounded">
                            show
                        </button>
                        <CountryDetails index={item} activeIndices={activeIndices}
                                        countriesCache={countriesCache}/>
                    </li>
                ))}
            </>
        )
    }


    const notificationTooManyResults = (text) => {
        return (
            <div className="text-center text-2xl">
                {text}
            </div>
        )
    }

    if (!filterInput) {
        return null
    }
    if (filterInput && filteredArray.length === 0) {
        return notificationTooManyResults("No results found")
    }


    return (
        filteredArray.length > 10 ? notificationTooManyResults("Too many results") : countryListResults()
    );
}

