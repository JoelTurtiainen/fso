import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'

const App = () => {
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')
  const [persons, setPersons] = useState([])

  useEffect(() => {
    console.log("effect")
    axios
      .get("http://localhost:3001/persons")
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])
  console.log('render', persons.length, 'persons')

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
