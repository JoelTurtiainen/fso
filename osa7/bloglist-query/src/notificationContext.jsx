import { createContext, useReducer, useContext } from 'react'
let timeoutID

const notificationReducer = (state, action) => {
  let suffix = ''

  switch (action.type) {
    case 'added':
      suffix = 'added'
      break
    case 'voted':
      suffix = 'voted'
      break
    case 'clear':
      return ''
    case 'error':
      return action.content
    default:
      throw Error('Unknown action: ' + action.type)
  }

  return `'${action.content}' ${suffix}`
}

const NotificationContext = createContext('')

export const NotificationContextProvider = (props) => {
  const [notification, dispatch] = useReducer(
    notificationReducer,
    ''
  )

  return (
    <NotificationContext.Provider value={[notification, dispatch]}>
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
  clearTimeout(timeoutID)

  if (notificationAndDispatch[0]) {
    timeoutID = setTimeout(() => {
      notificationAndDispatch[1]({ type: 'clear' })
    }, 5000)
  }

  return notificationAndDispatch[1]
}

export default NotificationContext
