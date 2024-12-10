import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')
  const [persons, setPersons] = useState([])
  const [message, setMessage] = useState({ text: null })

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
    : persons;

  const addPerson = (event) => {
    event.preventDefault()
    const found = persons.find(person => person.name === newName)
    const newPersonObj = { name: newName, number: newNumber }

    if (found) {
      if (confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        personService
          .update(found.id, newPersonObj)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== found.id ? person : returnedPerson))
            setMessage({ text: `Updated ${returnedPerson.name}` })
          })
          .catch(({ status }) => {
            let errorMsg;
            if (status === 400) {
              errorMsg = 'Missing number'
            } else if (status === 404) {
              errorMsg = `Information of ${newName} does not exist on the server anymore.`
              // Person was already removed so lets remove it from client 
              setPersons(persons.filter(person => person.id !== found.id))
            } else {
              errorMsg = 'Unknown Error'
            }

            setMessage({ text: errorMsg, error: true })
          })

      } else return
    } else {
      personService
        .create(newPersonObj)
        .then(returnedPerson => {
          console.log(returnedPerson)
          setPersons(persons.concat(returnedPerson))
          setMessage({ text: `Added ${returnedPerson.name}` })
        })
        .catch(({ response }) => {
          console.log(response.data.error)
          setMessage({ text: response.data.error, error: true })
        })
    }

    setNewNumber('')
    setNewName('')
    setTimeout(() => setMessage({ text: null }), 3000)
  }

  const removePerson = (id) => {
    const selectedPerson = persons.find(person => person.id === id)
    if (confirm(`Delete ${selectedPerson.name}`)) {
      personService.remove(id)
      setPersons(persons.filter(person => person.id !== id))
      setMessage({ text: `Deleted ${selectedPerson.name}` })
      setTimeout(() => setMessage({ text: null }), 3000)

    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
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
