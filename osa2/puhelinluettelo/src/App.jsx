import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')

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
      <h1>Phonebook</h1>
      <form onSubmit={addPerson}>
        <div>
          filter shown with <input value={newSearch} onChange={(event) => { setNewSearch(event.target.value) }} />

        </div>

        <div>
          <h2>add a new</h2>
          <div>
            name: <input value={newName} onChange={(event) => setNewName(event.target.value)} />
          </div>
          <div>
            number: <input value={newNumber} onChange={(event) => setNewNumber(event.target.value)} />
          </div>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {personsToShow.map(({ name, number }, index) => <p key={index}> {name} {number} </p>)}
    </div>
  )

}

export default App
