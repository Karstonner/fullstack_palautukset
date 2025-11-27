const express = require('express')
const app = express()

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

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
