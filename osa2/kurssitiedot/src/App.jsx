const Header = (props) => {
  return (
    <div>
      <h2>
        {props.name}
      </h2>
    </div>
  )
}

const Course = ({ course }) => {
  return (
    <div>
      {course.parts.map(part => (
        <li key={part.id}>
          {part.name} {part.exercises}
        </li>
      ))}
    </div>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return (
    <div>
      <Header name={course.name} />
      <Course course={course} />
    </div>
  )
}

export default App
