import { useState } from 'react'

// React components

const Button = (props) => <button onClick={props.handleClick}> {props.text} </button>

const Anecdote = ({ text, votecount }) => <>{text} < br /> has {votecount} votes. </>

// Initial data

const anecdotes = [
  'If it hurts, do it more often.',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
  'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
  'The only way to go fast, is to go well.'
]

const initialVotes = { ...new Array(anecdotes.length).fill(0) }

// Helper functions

const keyOfLargestInObj = (obj) => {
  return Object.keys(obj).reduce((a, b) => obj[a] > obj[b] ? a : b)
}

const randomIndex = (arr) => Math.floor(Math.random() * arr.length)

// Main

const App = () => {
  const [selected, setSelected] = useState(randomIndex(anecdotes))
  const [votes, setVotes] = useState(initialVotes)
  const mostVotedKey = keyOfLargestInObj(votes)


  const onVote = () => {
    const copy = { ...votes }
    copy[selected] += 1
    setVotes(copy)
  }

  return (
    <>
      <h2>Anecdote of the day</h2>
      <Anecdote text={anecdotes[selected]} votecount={votes[selected]} /> <br />
      <Button handleClick={onVote} text={"vote"} />
      <Button handleClick={() => setSelected(randomIndex(anecdotes))} text={"next anecdote"} />

      <h2>Anecdote with most votes</h2>
      {votes[mostVotedKey] === 0 ? "No votes yet" : <Anecdote text={anecdotes[mostVotedKey]} votecount={votes[mostVotedKey]} />}
    </>
  )
}

export default App
