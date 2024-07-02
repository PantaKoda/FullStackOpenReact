import {useEffect, useState} from 'react'
import axios from 'axios'


function Form({onFilterTextChange, filterText}) {

    return (
        <form>
            find countries <input
            type="text"
            value={filterText} placeholder="Search..."
            onChange={(e) => onFilterTextChange(e.target.value)}/>
        </form>
    )
}


async function getAllCountries(setCountries) {
    try {
        const request = await axios.get('https://studies.cs.helsinki.fi/restcountries/api/all');
        setCountries(request.data.map(res => res.name.common));
    } catch (error) {
        console.error('Error fetching countries:', error);
    }
}

async function getCountryByName(countryName, setCountryObject) {
    try {
        const response = await axios.get(`https://studies.cs.helsinki.fi/restcountries/api/name/${countryName}`)
        const country = response.data;
        const {name, languages, area, capital, flags} = country;
        const filteredCountry = {name, languages, area, capital, flags};
        setCountryObject(prevCountries => [...prevCountries, filteredCountry]);

    } catch (error) {
        console.log(error)
    }
}

function Notification({message}) {
    if (message === null) {
        return null
    }

    return (
        <>
            <div>
                <h3>{message}</h3>
            </div>
        </>
    )
}

function Country({countryObject, filterText, filteredCountries}) {

    if ((!filterText) || (filteredCountries.length > 1) || (filteredCountries.length === 0)) {
        return null
    }


    const specificCountry = countryObject.filter(country => country.name.common.toLowerCase() === filteredCountries[0].toLowerCase())

    return (
        <>
            {specificCountry.map(country => (
                <div key={country.name.common}>
                    <h2>{country.name.common}</h2>
                    <p>area: {country.area}</p>
                    <p>Capital: {country.capital}</p>
                    <h3>Languages</h3>
                    <ul>
                        {Object.keys(country.languages).map(key => <li key={key}>{country.languages[key]}</li>)}
                    </ul>
                    <img src={country.flags['svg']} alt={country.flags['alt']}/>
                </div>
            ))}
        </>

    )
}

function App() {
    //console.clear()
    const [filterText, setFilterText] = useState('');
    const [countries, setCoutries] = useState([])
    const [message, setMessage] = useState('')
    const [countryObject, setCountryObject] = useState([])
    const [filteredCountries, setFilteredCountries] = useState([]);

    const fetchCountry = async () => {
        if (!filterText) {
            setFilteredCountries([]);
            setMessage('');
            return;
        }


        const arr = countries.filter(country => country.toLowerCase().includes(filterText.toLowerCase()));
        setFilteredCountries(arr);


        if (arr.length > 1 && arr.length <= 10) {
            //setFilteredCountries(arr);
            setMessage('');
        } else if (arr.length > 10) {
            setFilteredCountries(arr.slice(0, 11));
            setMessage('Too many results. Be more specific.');
        } else if (arr.length === 1) {
            //setFilteredCountries(arr);
            setMessage('');
            const checkCache = countryObject.some(country => country.name.common.toLowerCase() === arr[0].toLowerCase())
            if (!checkCache) {
                await getCountryByName(arr[0], setCountryObject);
            }

        } else {
            setFilteredCountries([]);
            setMessage('No results found.');
        }
    }


    useEffect(() => {
        fetchCountry();
    }, [filterText, countries]);

    useEffect(() => {
        getAllCountries(setCoutries)
    }, []);


    return (
        <>
            <Form filterText={filterText} onFilterTextChange={setFilterText} handleFormClick={handleFormClick}/>
            {filteredCountries.map(country => <div key={country}>{country}</div>)}
            <Country countryObject={countryObject} filterText={filterText} filteredCountries={filteredCountries}/>
            <Notification message={message}/>
        </>
    );
}


export default App
