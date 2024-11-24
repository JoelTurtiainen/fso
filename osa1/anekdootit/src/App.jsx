import { useState } from 'react'

const Button = (props) => {
  return (
    <button onClick={props.handleClick}> {props.text} </button>
  )
}

const App = () => {
  const initialAnecdotes = [
    { text: 'If it hurts, do it more often.' },
    { text: 'Adding manpower to a late software project makes it later!' },
    { text: 'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.' },
    { text: 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.' },
    { text: 'Premature optimization is the root of all evil.' },
    { text: 'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.' },
    { text: 'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.' },
    { text: 'The only way to go fast, is to go well.' }
  ]

  const [selected, setSelected] = useState(0)
  const [anecdotes, setAnecdotes] = useState(initialAnecdotes)

  const randomAnecdote = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length))
  }

  const onVote = () => {
    setAnecdotes(anecdotes.map((item, index) => {
      if (index === selected) {
        return { ...item, votes: (item.votes || 0) + 1 }
      } else {
        return { ...item }
      }
    }))
  }


  return (
    <>
      <div>
        {anecdotes[selected].text}
      </div>
      <div>
        <Button handleClick={onVote} text={"vote"} />
        <Button handleClick={randomAnecdote} text={"next anecdote"} />
      </div>
    </>
  )
}

export default App
