import { useState, useEffect } from 'react'
import personService from './services/person'
import Filter from './components/FilterComponent'
import PersonForm from './components/PersonFormComponent'
import Persons from './components/PersonComponent'
import Notification from './components/NotificationComponent'

const App = () => {
  const [persons, setPersons] = useState([])
  const [notification, setNotification] = useState(null)

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type })
    setTimeout(() => setNotification(null), 5000)
  }
  
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

    const existing = persons.find(p => p.name === nameTrimmed)

    if (existing) {
      if (existing.number === numberTrimmed) {
        alert(`${nameTrimmed} is already added with the same number`)
        return
      }

      if (window.confirm(`${nameTrimmed} is already added to the phonebook, replace the old number with the new one?`)) {
        const updatedPerson = { ...existing, number: numberTrimmed }
        personService.update(existing.id, updatedPerson)
          .then(returned => {
            setPersons(prev => prev.map(p => p.id !== existing.id ? p : returned))
            setNewName('')
            setNewNumber('')
            showNotification(`Updated ${returned.name}`, 'success')
          })
          .catch(err => {
            console.error('Failed to update person:', err)
            setPersons(prev => prev.filter(p => p.id !== existing.id))
          })
      }
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
        showNotification(`Added ${returned.name}`, 'success')
      })
      .catch(err => {
        console.error('Failed to create person:', err)
        showNotification('Failed to add person', 'error')
    })
  }

  const handleDelete = (id, name) => {
    if (!window.confirm(`Delete ${name} ?`)) return
    personService.remove(id)
      .then(() => {
        setPersons(prev => prev.filter(p => p.id !== id))
        showNotification(`${name} deleted`, 'success')
      })
      .catch(err => {
        console.error('Failed to delete person:', err)
        showNotification(`Information of ${name} has already been removed from the server!`, 'error')
        setPersons(prev => prev.filter(p => p.id !== id))
      })
  }

  const filteredPersons = persons.filter(p =>
    p.name.toLowerCase().includes(filter.toLowerCase())
  )

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification} />
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
