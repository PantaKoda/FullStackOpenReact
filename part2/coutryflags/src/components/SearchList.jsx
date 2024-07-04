import CountryDetails from "./CountryDetails";
import countryServices from '../utilities/services'
import {useEffect} from 'react'

export function SearchList({
                               countryNames,
                               activeIndices,
                               setActiveIndices,
                               filterInput,
                               setCountriesCache,
                               countriesCache
                           }) {


// Use effect to reset activeIndices when filterInput is cleared


    const filteredArray = countryNames.filter(country => country.toLowerCase().includes(filterInput.toLowerCase()))

    useEffect(() => {
        if (filterInput === '' || filteredArray.length > 1) {
            setActiveIndices(new Set());
        }
    }, [filterInput, setActiveIndices]);

    const getCountry = async (name) => {

        //If it is open to request again
        if (activeIndices.has(name)) {
            return null
        }
        // Check if the country is already in the cache
        if (countriesCache.some(country => country.name === name)) {
            return;
        }
        const country = await countryServices.getCountryByName(name)

        setCountriesCache((previousState) => {
            return [...previousState, country];
        });

    }

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

