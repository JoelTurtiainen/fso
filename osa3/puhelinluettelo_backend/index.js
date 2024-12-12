require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

const app = express()

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
app.use(express.json())
app.use(express.static('dist'))
app.use(cors())

morgan.token('body', function(req, res) {
  return JSON.stringify(req.body)
})

Person.find({}).then(result => {
  console.log('phonebook:')

  result.forEach(user => {
    console.log(`${user.name} ${user.number}`)
  })
})


app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/info', (request, response) => {
  Person.countDocuments({}).then(documents => {
    response.send(`
    <p>Phonebook has info for ${documents} people</p>
    <p>${new (Date)}</p>
  `)
  })
})

app.get('/api/persons', (request, response) => {
  Person.find({}).then(result => {
    response.json(result)
  })
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body

  const person = {
    name: body.name,
    number: body.number
  }

  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then(updatedPerson => {
      if (!updatedPerson) response.status(404).end()
      else response.json(updatedPerson)
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
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

  Person.findOne({ name: body.name })
    .then(result => {
      if (!result) {
        const person = new Person({
          name: body.name,
          number: body.number
        })

        person.save().then(savedPerson => {
          response.json(savedPerson)
        })

      } else {
        response.status(400).json(result)
      }
    })
    .catch(error => next(error))
})

const PORT = process.env.port || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

// Error Handling
const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformed id' })
  }
  next(error)
}

app.use(errorHandler)
