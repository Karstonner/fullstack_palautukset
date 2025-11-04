import { useState } from 'react'
import Persons from "./components/PersonComponent"

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const handleNameChange = (e) => setNewName(e.target.value)
  const handleNumberChange = (e) => setNewNumber(e.target.value)
  const handleFilterChange = (e) => setFilter(e.target.value)

  const addPerson = (e) => {
    e.preventDefault()
    const nameTrimmed = newName.trim()
    const numberTrimmed = newNumber.trim()
    if (!nameTrimmed) return
    if (!numberTrimmed) return

    if (persons.some(p => p.name === nameTrimmed)) {
      alert(`${nameTrimmed} is already added`)
      return
    }

    if (persons.some(p => p.number === numberTrimmed)) {
      alert(`${nameTrimmed} is already added`)
      return
    }

    const newPerson = {
      name: nameTrimmed,
      number: numberTrimmed
    }

    setPersons(prev => prev.concat(newPerson))
    setNewName('')
    setNewNumber('')
  }

  const filteredPersons = persons.filter(p =>
    p.name.toLowerCase().includes(filter.toLowerCase())
  )

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with: <input value={filter} onChange={handleFilterChange} />
      </div>
      <h2>add a new</h2>
      <form onSubmit={addPerson}>
        <div>name: <input value={newName} onChange={handleNameChange} /></div>
        <div>number: <input value={newNumber} onChange={handleNumberChange} /></div>
        <div><button type="submit">add</button></div>
      </form>
      <h2>Numbers</h2>
      <Persons persons={filteredPersons} />
    </div>
  )

}

export default App