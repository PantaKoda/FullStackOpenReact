import {useState, useEffect} from 'react'
import _ from 'lodash';
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


function Persons({filteredPersons}) {

    return (
        <>
            {filteredPersons.map(person => (<div
                key={person.id}>{person.name} {person.number}
                <button onClick={handleDelete}>delete</button>
            </div>))}
        </>

    )
}


function App() {

    const [persons, setPersons] = useState([])
    const [filteredPersons, setFilteredPersons] = useState([]);
    const [newName, setNewName] = useState('Bob')
    const [newNumber, setNewNumber] = useState('39-44-5323523')

    const addPerson = (event) => {
        event.preventDefault()
        if (persons.some(person => _.isEqual(person, {name: newName, number: newNumber, id: newName}))) {
            console.log('Person already exists');
            return;
        }


        personService.create({name: newName, number: newNumber})
            .then(returnedPersons => {
                setPersons(persons.concat({name: newName, number: newNumber, id: newName}))
                setFilteredPersons(persons.concat({name: newName, number: newNumber, id: newName}))
                setNewName('')
                setNewNumber('')
            })


    }

    const handlePersonChange = (event) => {
        setNewName(event.target.value)
    }

    const handlePhoneNumber = (event) => {
        setNewNumber(event.target.value)
    }

    const handleFilter = (event) => {
        const filterValue = event.target.value.toLowerCase()
        console.log(filterValue)
        if (filterValue === "") {
            setFilteredPersons(persons)
        } else {
            const filteredPersons = persons.filter(person =>
                person.name.toLowerCase().includes(filterValue)
            )

            setFilteredPersons(filteredPersons)
        }
    }


    const hook = () => {

        personService.getAll()
            .then(initialPersons => {
                setPersons(initialPersons)
                setFilteredPersons(initialPersons)
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
        <Persons filteredPersons={filteredPersons}/>
    </div>)
}

export default App
