import { useState } from 'react'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'

const App = () => {
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])


  const personsToShow = newSearch
    ? persons.filter(person => person.name.match(new RegExp(newSearch, "gi")))
    : persons

  const addPerson = (event) => {
    event.preventDefault()
    const exists = persons.map(person => person.name).includes(newName)

    if (exists) {
      alert(`${newName} is already added to phonebook`)
    } else {
      setPersons(persons.concat({ name: newName, number: newNumber }))
      setNewNumber('')
      setNewName('')
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter state={newSearch} setState={setNewSearch} />
      <h3>add a new</h3>
      <PersonForm
        submitHandler={addPerson}
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
      />
      <h3>Numbers</h3>
      <Persons personsToShow={personsToShow} />
    </div>
  )
}

export default App
