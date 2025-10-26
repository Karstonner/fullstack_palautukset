import { useState } from 'react'

const Header = ({ text }) => {
  return (
    <div>
      <h1>{text}</h1>
    </div>
  )
}

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const StatisticLine = ({ text, value }) => {
  if (text === "positive") {
    return <div>{text} {value} %</div>
  }
  return <div>{text} {value}</div>
}

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad
  if (total === 0) return (
    <div>No feedback given</div>
  )

  return (
    <div>
      <StatisticLine text="good" value={good} />
      <StatisticLine text="neutral" value={neutral} />
      <StatisticLine text="bad" value={bad} />
      <StatisticLine text="all" value={total} />
      <StatisticLine text="average" value={((good - bad) / total)} />
      <StatisticLine text="positive" value={((good / total) * 100)} />
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