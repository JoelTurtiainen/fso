import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

// eslint-disable-next-line react/prop-types
const Anecdote = ({ id, content, votes, handler }) => {
  return (
    <div>
      <div>
        {content}
      </div>
      <div>
        has {votes}
        <button onClick={handler}>vote</button>
      </div>
    </div>
  )
}

const AnecdoteList = () => {
  const dispatch = useDispatch()

  const anecdotes = useSelector(state => {
    if (!state.filter) {
      return state.anecdotes
    }
    const regex = new RegExp(state.filter, "gi")
    return state.anecdotes.filter(anecdote => anecdote.content.match(regex))
  })

  const anecdoteHandler = (id, content) => {
    dispatch(voteAnecdote(id))
    dispatch(setNotification(`you voted '${content}'`, 5))
  }

  return (
    <div>
      {[...anecdotes].sort((a, b) => b.votes - a.votes)
        .map(({ id, content, votes }) =>
          <Anecdote
            key={id}
            content={content}
            votes={votes}
            handler={() => anecdoteHandler(id, content)}
          />
        )}
    </div>
  )
}

export default AnecdoteList
