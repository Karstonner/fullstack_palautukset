const Header = (props) => {
  return (
    <div>
      <p>
        {props.course}
      </p>
    </div>
  )
}

const Part = (props) => {
  return (
    <div>
      {props.part} {props.exercises}
    </div>
  )
}

const Content = (props) => {
  return (
    <div>
        <Part part={props.parts[0].part} exercises={props.parts[0].exercises} />
        <Part part={props.parts[1].part} exercises={props.parts[1].exercises} />
        <Part part={props.parts[2].part} exercises={props.parts[2].exercises} />
    </div>
  )
}

const Total = (props) => {
  return (
    <div>
      <p>
        Total exercises: 
        {" "}
        {props.parts[0].exercises +
        props.parts[1].exercises +
        props.parts[2].exercises}
      </p>
    </div>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }
  const parts = [
    { part: part1.name, exercises: part1.exercises },
    { part: part2.name, exercises: part2.exercises },
    { part: part3.name, exercises: part3.exercises },
  ]

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  )
}

export default App
