import {useEffect, useState} from 'react'
import Form from './components/Form.jsx'
import countryServices from './utilities/services'


function App() {
    const [activeIndices, setActiveIndices] = useState(new Set());
    const [countryNames, setCountryNames] = useState([]);
    const [filterInput, setFilterInput] = useState('');
    const [countriesCache, setCountriesCache] = useState([]);


    useEffect(() => {

        const fetchCountriesNames = async () => {
            const names = await countryServices.storeCountryNames()
            setCountryNames(names)
        }

        fetchCountriesNames()

    }, []);


    return (
        <div className="flex flex-col justify-center items-center">
            <Form
                countryNames={countryNames}
                activeIndices={activeIndices}
                setActiveIndices={setActiveIndices}
                filterInput={filterInput}
                setFilterInput={setFilterInput}
                setCountriesCache={setCountriesCache}
                countriesCache={countriesCache}
            />
        </div>
    );
}


export default App

