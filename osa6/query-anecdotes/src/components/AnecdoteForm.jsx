import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnecdote } from "../requests"
import { useNotificationDispatch } from '../notificationContext'

const AnecdoteForm = () => {
  const dispatch = useNotificationDispatch()
  const queryClient = useQueryClient()

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onError: (err) => {
      dispatch({ type: 'ERROR', content: err.response.data.error })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })

    },
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content, votes: 0 })
    console.log(content)
    dispatch({ type: 'ADD', content })
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
