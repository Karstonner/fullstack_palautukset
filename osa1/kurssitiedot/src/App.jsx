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
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14
  const parts = [
    { part: part1, exercises: exercises1 },
    { part: part2, exercises: exercises2 },
    { part: part3, exercises: exercises3 },
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
