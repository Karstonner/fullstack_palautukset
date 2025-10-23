import { useState } from 'react'

const Header = ({ text }) => {
  return (
    <div>
      <h1>{text}</h1>
    </div>
  )
}

const Average = ({ good, neutral, bad }) => {
  const total = good + neutral + bad
  if (total === 0) return (<div>average 0</div>)
  const average = (good - bad) / total
  return (<div>average {average}</div>)
}

const Total = ({ good, neutral, bad }) => {
  const total = good + neutral + bad
  return (<div>all {total}</div>)
}

const Percentage = ({ good, neutral, bad }) => {
  const total = good + neutral + bad
  const percent = total === 0 ? 0: (good / total) * 100
  return (<div>positive {percent} %</div>)
}

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad
  if (total === 0) return (
    <div>No feedback given</div>
  )

  return (
    <div>
      <div>good {good}</div>
      <div>neutral {neutral}</div>
      <div>bad {bad}</div>

      <Total good={good} neutral={neutral} bad={bad} />
      <Average good={good} neutral={neutral} bad={bad} />
      <Percentage good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

const App = () => {
  const headers = ['give feedback', 'statistics']

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => {setGood(good + 1)}
  const handleNeutral = () => {setNeutral(neutral + 1)}
  const handleBad = () => {setBad(bad + 1)}

  return (
    <div>
      <Header text={headers[0]} />
      <Button onClick={handleGood} text='good' />
      <Button onClick={handleNeutral} text='neutral' />
      <Button onClick={handleBad} text='bad' />

      <Header text={headers[1]} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App