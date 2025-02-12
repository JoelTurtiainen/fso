import { useDispatch } from "react-redux"

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const create = (event) => {
    event.preventDefault()
    const content = event.target.content.value
    event.target.content.value = ''
    return (
      dispatch({ type: 'anecdotes/createAnecdote', payload: content })
    )
  }

  return (
    <form onSubmit={create}>
      <h2>create new</h2>
      <div><input name='content' /></div>
      <button type='submit'>create</button>
    </form>
  )
}

export default AnecdoteForm
