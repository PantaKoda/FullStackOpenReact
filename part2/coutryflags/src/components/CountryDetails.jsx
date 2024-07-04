export default function CountryDetails({activeIndices, index, countriesCache}) {
    if (!activeIndices.has(index)) {
        return null;
    }

    const country = countriesCache.find(country => country.name === index);

    if (!country) {
        return null;
    }

    return (
        <div className="col-span-2 grid grid-cols-3 gap-4 mt-2 items-stretch">
            <div className="col-span-2 flex flex-col">
                <table className="w-full border-collapse border border-gray-400 flex-grow" cellPadding="5">
                    <caption className="mb-2 text-lg font-semibold">{country.name} Country facts</caption>
                    <thead>
                    <tr>
                        <th className="border border-gray-300">Capital</th>
                        <th className="border border-gray-300">Region</th>
                        <th className="border border-gray-300">Sub region</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td className="border border-gray-300">{country.capital}</td>
                        <td className="border border-gray-300">{country.region}</td>
                        <td className="border border-gray-300">{country.subregion}</td>
                    </tr>
                    </tbody>
                    <thead>
                    <tr>
                        <th className="border border-gray-300">Languages</th>
                        <th className="border border-gray-300">Area</th>
                        <th className="border border-gray-300">Population</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td className="border border-gray-300">{country.languages && Object.values(country.languages).join(', ')}</td>
                        <td className="border border-gray-300">{country.area}</td>
                        <td className="border border-gray-300">{country.population}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div className="flex items-center justify-center">
                <img src={country.flags} alt="country flag" className="w-[200px] h-[100px] object-contain"/>
            </div>
            <div className="flex flex-col items-center justify-center">
                {/* Add any additional content here */}
            </div>
        </div>
    );
}
