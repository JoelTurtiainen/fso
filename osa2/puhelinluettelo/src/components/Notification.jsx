const Notification = ({ message }) => {
  if (!message.text) return null

  const notificationStyle = {
    fontSize: "1.3em",
    color: message.error
      ? "red"
      : "green",
    border: "solid 3px",
    backgroundColor: "lightgray",
    borderRadius: 10,
    padding: 5,
    marginBottom: 10,
  }

  return (
    <div style={notificationStyle}>
      {message.text}
    </div>
  )
}
export default Notification
