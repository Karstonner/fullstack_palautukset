import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/FilterComponent'

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  const showMore = (name) => {
    setFilter(name)
  }

  useEffect(() => {
    const query = filter.trim()
    if (query === '') {
      setCountries([])
      return
    }

    if (countries.length > 0) return

    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => setCountries(response.data))
  }, [filter, countries.length])

  const handleFilterChange = (e) => setFilter(e.target.value)
  
  const filteredCountries = countries.filter(country =>
    country.name.common.toLowerCase().includes(filter.toLowerCase())
  )

  return (
    <div>
      <Filter filter={filter} onChange={handleFilterChange} />
      {filter.trim() === '' ? null : filteredCountries.length > 10 ? (
        <p>Too many matches, specify another filter</p>
      ) : filteredCountries.length === 1 ? (
        <div>
        {filteredCountries.map(country => (
          <div key={country.cca3}>
            <h1>{country.name.common}</h1>
            <p>Capital {country.capital} <br />Area {country.area}</p>
            <h2>Languages</h2>
            <ul>
              {country.languages
                ? Object.entries(country.languages).map(([code, name]) => (
                  <li key={code}>{name}</li>
                ))
              : <li>No languages</li>}
            </ul>
            <img src={country.flags.png} alt="flag" />
          </div>
        ))}
        </div>
      ) : (
        <ul>
        {filteredCountries.map(country => (
          <li key={country.cca3}>
            {country.name.common}
            <Button onClick={() => showMore(country.name.common)} text="Show" />
          </li>
        ))}
      </ul>
      )}
    </div>
  )
}

export default App
