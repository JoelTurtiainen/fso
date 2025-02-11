import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from "../reducers/anecdoteReducer"

const Anecdote = ({ id, content, votes, handler }) => {
  return (
    <div>
      <div>
        {content}
      </div>
      <div>
        has {votes}
        <button onClick={() => handler(id)}>vote</button>
      </div>
    </div>
  )
}

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state)

  return (
    <div>
      {anecdotes.sort((a, b) => b.votes - a.votes)
        .map(({ id, content, votes }) =>
          <Anecdote
            key={id}
            content={content}
            votes={votes}
            handler={() => dispatch(voteAnecdote(id))}
          />
        )}
    </div>
  )
}

export default AnecdoteList
