import { useNotificationValue } from '../notificationContext'
const Notification = () => {
  const notification = useNotificationValue()
  const style = {
    fontSize: '1.3em',
    border: 'solid 3px',
    padding: 5,
    backgroundColor: 'lightgray',
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 10
  }

  if (!notification) return

  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification
