const express = require('express')
const app = express()
app.use(express.json())

let contacts = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456"
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523"
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345"
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122"
  }
]

const generateId = () => {
  let newId
  do {
    newId = Math.floor(Math.random() * 1000000).toString()
  } while (contacts.find(contact => contact.id === newId))
  return newId
}

app.get('/info', (request, response) => {
  const time = new Date()
  const responseText = `
  Phonebook has info for ${contacts.length} people
  ${time}`
  response.set('Content-Type', 'text/plain; charset=utf-8')
  response.send(responseText)
})

app.get('/api/persons', (request, response) => {
  response.json(contacts)
})

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const contact = contacts.find(contact => contact.id === id)
  if (!contact) {
    return response.status(400).json({
      error: 'no existing contact'
    })
  }
  response.json(contact)
})

app.post('/api/persons', (request, response) => {
  const body = request.body
  const newName = body.name
  const newNumber = body.number

  if (contacts.find(contact => contact.name === newName)) {
    return response.status(400).json({
      error: 'name already exists'
    })
  }

  if (contacts.find(contact => contact.number === newNumber)) {
    return response.status(400).json({
      error: 'number already exists'
    })
  }

  const newId = generateId()

  const person = {
    name: body.name,
    number: body.number,
    id: newId,
  }

  contacts = contacts.concat(person)

  response.json(person)
})

app.delete('/api/persons/:id', (request, response) => {
  // Tested using Postman
  const id = request.params.id
  contacts = contacts.filter(contact => contact.id !== id)

  response.status(204).end()
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
