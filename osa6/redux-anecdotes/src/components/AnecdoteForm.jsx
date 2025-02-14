import { useDispatch } from "react-redux"
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.content.value
    event.target.content.value = ''

    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({ type: 'anecdotes/createAnecdote', payload: newAnecdote })
    dispatch({ type: 'notification/setNotification', payload: `you created '${newAnecdote.content}'` })

    setTimeout(() => {
      dispatch({ type: 'notification/clearNotification' })
    }, 5000)
  }

  return (
    <form onSubmit={addAnecdote}>
      <h2>create new</h2>
      <div><input name='content' /></div>
      <button type='submit'>create</button>
    </form>
  )
}

export default AnecdoteForm
