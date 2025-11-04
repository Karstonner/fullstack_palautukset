const Name = ({ person }) => {
  return (
    <li>
      {person.name}
    </li>
  )
}
 
const Names = ({ names }) => (
  <ul>
    {names.map(person => (
      <Name key={person.name} person={person} />
    ))}
  </ul>
)

export default Names
