const Person = ({ person }) => {
  return (
    <li>
      {person.name} {person.number}
    </li>
  )
}
 
const Persons = ({ persons }) => (
  <div>
    {persons.map(person => (
      <Person key={person.name} person={person} />
    ))}
  </div>
)

export default Persons
