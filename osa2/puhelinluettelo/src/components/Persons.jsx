const Persons = ({ personsToShow, removeHandler }) => {
  return (
    <div>
      {
        personsToShow.map(({ name, number, id }) => {
          return (
            <p key={id}>
              {name} {number} {" "} <button onClick={() => removeHandler(id)}>Delete</button>
            </p>
          )
        })
      }
    </div>
  )
}

export default Persons

