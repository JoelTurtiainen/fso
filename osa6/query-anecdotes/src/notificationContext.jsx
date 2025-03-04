import { createContext, useReducer, useContext } from 'react'
let timeoutID;

const notificationReducer = (state, action) => {
  let suffix = ''

  switch (action.type) {
    case "ADD":
      suffix = `added`
      break;
    case "VOTE":
      suffix = `voted`
      break;
    case "CLEAR":
      return null
    case "ERROR":
      return action.content
    default:
      return state
  }

  return `'${action.content}' ${suffix}`
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, null)

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
  clearTimeout(timeoutID)

  if (notificationAndDispatch[0]) {
    timeoutID = setTimeout(() => {
      notificationAndDispatch[1]({ type: 'CLEAR' })
    }, 5000)
  }

  return notificationAndDispatch[1]
}

export default NotificationContext
