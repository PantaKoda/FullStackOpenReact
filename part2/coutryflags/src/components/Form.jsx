import {SearchList} from "./SearchList";

export default function Form({
                                 countryNames,
                                 activeIndices,
                                 setActiveIndices,
                                 filterInput,
                                 setFilterInput,
                                 setCountriesCache,
                                 countriesCache
                             }) {


    return (
        <>
            <form className="w-1/4 flex flex-col gap-2">
                <input placeholder="Search for country"
                       onChange={(e) => setFilterInput(e.target.value)}
                       className="w-2/3 border-2 rounded-l mt-0.5 self-center"
                />
                <ul className="list-none my-1.5 space-y-1">
                    <SearchList
                        countryNames={countryNames}
                        activeIndices={activeIndices}
                        setActiveIndices={setActiveIndices}
                        filterInput={filterInput}
                        setFilterInput={setFilterInput}
                        setCountriesCache={setCountriesCache}
                        countriesCache={countriesCache}
                    />
                </ul>
            </form>
        </>
    );
}
