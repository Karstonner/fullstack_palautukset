import { useState } from 'react'
import Names from "./components/NameComponent"

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const handleNameChange = (e) => setNewName(e.target.value)

  const addPerson = (e) => {
    e.preventDefault()
    const nameTrimmed = newName.trim()
    if (!nameTrimmed) return

    if (persons.some(p => p.name === nameTrimmed)) {
      alert(`${nameTrimmed} is already added`)
      return
    }

    const newPerson = {
      name: nameTrimmed
    }

    setPersons(prev => prev.concat(newPerson))
    setNewName('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Names names={persons} />
    </div>
  )

}

export default App