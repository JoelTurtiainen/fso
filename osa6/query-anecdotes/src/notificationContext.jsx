import { createContext, useReducer, useContext } from 'react'

const notificationReducer = (state, action) => {
  const anecdote = action.anecdote.content
  let suffix = ''

  switch (action.type) {
    case "ADD":
      suffix = `added`
      break;
    case "REMOVE":
      suffix = `removed`
      break;
    case "VOTE":
      suffix = `voted`
      break;
    case "CLEAR":
      return
    default:
      return state
  }

  return `$'{anecdote}' ${suffix}`
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, 'test')

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export const useNotificationValue = () => {
  const notificationAndDispatch = useContext(NotificationContext)
  return notificationAndDispatch[0]
}

export const useNotificationDispatch = () => {
  const notificationAndDispatch = useContext(NotificationContext)
  return notificationAndDispatch[1]
}

export const setNotification = (content, timeout = 1) => {
  return async dispatch => {
    dispatch({ type: 'ADD', content })

    setTimeout(() => {
      dispatch({ type: 'CLEAR' })
    }, timeout * 1000)
  }
}

export default NotificationContext
