import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import personService from './services/persons.js'

const App = () => {
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')
  const [persons, setPersons] = useState([])

  useEffect(() => {
    console.log("effect")
    personService
      .getAll()
      .then(initialPersons => {
        console.log('promise fulfilled')
        setPersons(initialPersons)
      })
  }, [])
  console.log('render', persons.length, 'persons')

  const personsToShow = newSearch
    ? persons.filter(person => person.name.match(new RegExp(newSearch, "gi")))
    : persons

  const addPerson = (event) => {
    event.preventDefault()
    const newPersonObj = { name: newName, number: newNumber }
    const found = persons.find(person => person.name === newName)

    if (found) {
      if (confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        personService
          .update(found.id, newPersonObj)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== found.id ? person : returnedPerson))
          })
      }
      return
    } else {
      personService
        .create(newPersonObj)
        .then(returnedPerson => {
          console.log(returnedPerson)
          setPersons(persons.concat(returnedPerson))
          setNewNumber('')
          setNewName('')
        })
    }
  }


  const removePerson = (id) => {
    const selectedPerson = persons.find(person => person.id === id)
    if (confirm(`Delete ${selectedPerson.name}`)) {
      personService
        .remove(id)
        .then(deletedPerson => {
          console.log(deletedPerson)
          setPersons(persons.filter(person => person.id !== deletedPerson.id))
        })
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
      <Persons personsToShow={personsToShow} removeHandler={removePerson} />
    </div>
  )
}

export default App
