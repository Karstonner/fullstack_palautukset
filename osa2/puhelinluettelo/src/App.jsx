import { useState, useEffect } from 'react'
import personService from './services/person'
import Filter from './components/FilterComponent'
import PersonForm from './components/PersonFormComponent'
import Persons from './components/PersonComponent'

const App = () => {
  const [persons, setPersons] = useState([])
  
  useEffect(() => {
    personService.getAll()
      .then(data => setPersons(data))
      .catch(err => console.error('Failed to fetch persons:', err))
  }, [])

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
    if (!nameTrimmed || !numberTrimmed) return

    if (persons.some(p => p.name === nameTrimmed)) {
      alert(`${nameTrimmed} is already added`)
      return
    }

    if (persons.some(p => p.number === numberTrimmed)) {
      alert(`${numberTrimmed} is already added`)
      return
    }

    const newPerson = {
      name: nameTrimmed,
      number: numberTrimmed
    }

    personService.create(newPerson)
      .then(returned => {
        setPersons(prev => prev.concat(returned))
        setNewName('')
        setNewNumber('')
      })
      .catch(err => console.error('Failed to create person:', err))
  }

  const handleDelete = (id, name) => {
    if (!window.confirm(`Delete ${name} ?`)) return
    personService.remove(id)
      .then(() => {
        setPersons(prev => prev.filter(p => p.id !== id))
      })
      .catch(err => {
        console.error('Failed to delete person:', err)
        alert(`Information of ${name} has already been removed from server!`)
        setPersons(prev => prev.filter(p => p.id !== id))
      })
  }

  const filteredPersons = persons.filter(p =>
    p.name.toLowerCase().includes(filter.toLowerCase())
  )

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter filter={filter} onChange={handleFilterChange} />

      <h2>add a new</h2>
      <PersonForm
        onSubmit={addPerson}
        newName={newName}
        onNameChange={handleNameChange}
        newNumber={newNumber}
        onNumberChange={handleNumberChange}
      />

      <h2>Numbers</h2>
      <Persons persons={filteredPersons} onDelete={handleDelete} />
    </div>
  )
}

export default App
