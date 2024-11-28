const Persons = ({ personsToShow }) => {
  return (
    <div>
      {
        personsToShow.map(({ name, number }, index) => <p key={index}> {name} {number} </p>)
      }
    </div>
  )
}

export default Persons

