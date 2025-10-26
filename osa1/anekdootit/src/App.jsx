import { useState } from 'react'

const Header = ({ text }) => {
  return (
    <div>
      <h1>{text}</h1>
    </div>
  )
}

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  
  const nextAnecdote = () => setSelected(Math.floor(Math.random() * anecdotes.length))

  const [votes, setVotes] = useState(() => Array(anecdotes.length).fill(0))
  const voteup = () => {
    setVotes(prev => {
      const copy = [...prev]
      copy[selected] += 1
      return copy
    })
  }

  const currentVotes = votes[selected] ?? 0
  const maxVotes = Math.max(...votes)
  const topIndex = votes.indexOf(maxVotes)

  const headers = ['Anecdote of the day', 'Anecdote with most votes']

  return (
    <div>
      <Header text={headers[0]} />
      {anecdotes[selected]} <br />
      has {currentVotes} votes <br />
      <Button onClick={voteup} text="vote"/>
      <Button onClick={nextAnecdote} text="next anecdote"/>

      <Header text={headers[1]} />
      {anecdotes[topIndex]} <br />
      has {votes[topIndex]} votes <br />
    </div>
  )
}

export default App