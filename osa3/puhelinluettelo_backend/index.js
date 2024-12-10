const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
app.use(express.json())
app.use(express.static('dist'))
app.use(cors())

morgan.token('body', function(req, res) {
  return JSON.stringify(req.body)
})

let persons = [
  {
    name: "Arto Hellas",
    number: "040-123456",
    id: "1"
  },
  {
    name: "Ada Lovelace",
    number: "39-44-5323523",
    id: "2"
  },
  {
    name: "Dan Abramov",
    number: "12-43-234345",
    id: "3"
  },
  {
    name: "Mary Poppendieck",
    number: "39-23-6423122",
    id: "4"
  }
]


app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/info', (request, response) => {
  response.send(`
    <p>Phonebook has info for ${persons.length} people</p>
    <p>${new (Date)}</p>
  `)
})

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const person = persons.find(person => person.id === id)
  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

// Changing existing users number
app.put('/api/persons/:id', (request, response) => {
  const body = request.body
  const found = persons.find(person => person.name === request.body.name)

  if (!found) {
    // Person has likely been removed already
    return response.status(404).json()
  }

  if (!body.number || body.number.length < 1) {
    // Missing number
    return response.status(400).end()
  }

  const newPerson = { ...found, number: request.body.number }
  const rest = persons.filter(person => person.id !== found.id)

  persons = [...rest, newPerson]
  response.json(newPerson)
})

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})

const generateId = () => {
  return String(Math.floor(Math.random() * 1000))
}

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.name || body.name.length < 1) {
    return response.status(400).json({
      error: 'name missing'
    })
  }

  if (!body.number || body.number.length < 1) {
    return response.status(400).json({
      error: 'number missing'
    })
  }

  if (persons.find(person => person.name === body.name)) {
    return response.status(400).json({
      error: 'name must be unique'
    })
  }

  const person = {
    name: body.name,
    number: body.number,
    id: generateId(),
  }

  persons = persons.concat(person)

  response.json(person)
})

const PORT = process.env.port || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
