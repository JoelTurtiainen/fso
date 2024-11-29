import { useState, useEffect } from 'react'
import countryService from "./services/country"

const App = () => {
  const [search, setSearch] = useState('')
  const [country, setCountry] = useState(null)

  useEffect(() => {
    console.log("effect")

    countryService
      .getAll()
      .then(data => {
        console.log('promise fulfilled')
        console.log(data)
      })

  }, [country])

  const formSubmitHandler = (event) => {
    event.preventDefault()
    setCountry(search)
  }

  return (
    <form onSubmit={formSubmitHandler}>
      <input value={search} onChange={(event) => setSearch(event.target.value)} />
      <button type="submit">Search</button>
    </form>
  )
}

export default App 
