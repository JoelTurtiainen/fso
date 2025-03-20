import { Alert } from 'react-bootstrap'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector((state) => state.notification)

  if (notification === null) return
  return <Alert variant="success">{notification}</Alert>
}

export default Notification
