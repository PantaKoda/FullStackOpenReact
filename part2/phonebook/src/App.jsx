import {useState, useEffect} from 'react'
import personService from './services/persons'

function Filter({handleFilter}) {
    return (
        <div>
            filter shown with <input onChange={handleFilter}/>
        </div>
    )
}


function PersonForm(props) {
    const {addPerson, newName, newNumber, handlePersonChange, handlePhoneNumber} = props

    return (
        <form onSubmit={addPerson}>
            <div>
                name: <input value={newName} onChange={handlePersonChange}/>
            </div>
            <div>
                number: <input value={newNumber} onChange={handlePhoneNumber}/>
            </div>
            <div>
                <button type="submit">add
                </button>
            </div>
        </form>
    )
}


function Persons({filterInputValue, persons, setPersons}) {
    const handleDelete = (id) => {
        if (window.confirm("Do you really want to delete this entry?")) {
            personService.deleteById(id)
                .then(() => {
                    setPersons(persons.filter(person => person.id !== id));
                })
                .catch(error => {
                    console.error("There was an error deleting the entry", error);
                });
        }
    };

    return (
        <>
            {persons.map(person => {
                if (person.name.toLowerCase().includes(filterInputValue.toLowerCase())) {
                    return (
                        <div key={person.id}>
                            {person.name} {person.number} {' '}
                            <button onClick={() => handleDelete(person.id)}>
                                delete
                            </button>
                        </div>
                    );
                }
                return null;
            })}
        </>
    );
}


function App() {

    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('Bob')
    const [newNumber, setNewNumber] = useState('39-44-5323523')
    const [filterValue, setFilterValue] = useState('')

    const addPerson = (event) => {
        event.preventDefault();

        //Two entries can have the same name/number but diff id(id is given by the server)
        //so check if the persons have same name/number for duplicates
        if (persons.some(person => person.name === newName && person.number === newNumber)) {
            console.log('Person already exists');
            return;
        }

        personService.create({name: newName, number: newNumber})
            .then(returnedPerson => {
                setPersons(persons.concat(returnedPerson));
                setNewName('');
                setNewNumber('');
            })
            .catch(error => {
                console.error("There was an error adding the new person", error);
            });
    };

    const handlePersonChange = (event) => {
        setNewName(event.target.value)
    }

    const handlePhoneNumber = (event) => {
        setNewNumber(event.target.value)
    }

    const handleFilter = (event) => {
        const filterInputValue = event.target.value.trim().toLowerCase()
        if (filterInputValue === "") {
            setFilterValue('')
        } else {
            setFilterValue(filterInputValue)
        }
    }


    const hook = () => {

        personService.getAll()
            .then(initialPersons => {
                setPersons(initialPersons)
            })
    }

    useEffect(hook, [])

    return (<div>
        <h2>Phonebook</h2>
        <Filter handleFilter={handleFilter}/>
        <h1>add new</h1>
        <PersonForm addPerson={addPerson} newName={newName} newNumber={newNumber}
                    handlePersonChange={handlePersonChange}
                    handlePhoneNumber={handlePhoneNumber}/>
        <h2>Numbers</h2>
        <Persons filterInputValue={filterValue} persons={persons} setPersons={setPersons}/>
    </div>)
}

export default App
