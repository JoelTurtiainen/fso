import { useState, useEffect } from 'react'
import countryService from "./services/country"
import weatherNow from './services/weather'

const Country = ({ country, handler }) => {
  return (
    <li>
      {country.name.common}
      <button type="button" onClick={() => handler(country.name.common)}>show</button>
    </li>
  )
}

const Countries = ({ countries, handler }) => {
  return (
    <ul>
      {countries.length <= 10 ? countries.map(country => <Country key={country.cca2} country={country} handler={handler} />) : "Too many matches, specify another filter"}
    </ul>
  )
}

const CountryDetailed = ({ country }) => {
  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>capital: {country.capital}</p>
      <p>area: {country.area}</p>

      <h3>languages:</h3>
      <ul>
        {Object.entries(country.languages).map(([key, val]) => <li key={key}> {val} </li>)}
      </ul>
      <img
        style={{ maxWidth: "20vw" }}
        src={country.flags.svg}
        alt={`Flag of ${country.name.official}`}>
      </img>
      <h2>Weather in {country.capital}</h2>
      <p>temperature {country.weather.toFixed(1)} °C Celsius</p>
    </div>
  )
}

const App = () => {
  const [newSearch, setNewSearch] = useState('')
  const [countryDetailed, setCountryDetailed] = useState(null)
  const [allCountries, setAllCountries] = useState([])

  const countriesToShow = newSearch
    ? allCountries.filter(country => country.name.common.match(new RegExp(newSearch, "gi")))
    : allCountries;

  useEffect(() => {
    console.log("effect: getAll")

    countryService
      .getAll()
      .then(data => {
        console.log('promise fulfilled')
        setAllCountries(data)
      })
  }, [])

  useEffect(() => {
    console.log("effect: getDetails")
    if (countriesToShow.length === 1 && !countryDetailed) {
      countryService
        .getDetails(countriesToShow[0].name.common)
        .then(data => {
          console.log("promise fullfilled")
          console.log(data.capitalInfo.latlng)

          weatherNow([...data.capitalInfo.latlng])
            .then(weatherData => {
              console.log(weatherData)
              data.weather = weatherData
              setCountryDetailed(data)
            })
        })
    } else if (countriesToShow.length > 1) {
      setCountryDetailed(null)
    }
  }, [newSearch])

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <input style={{ marginBottom: "1em" }} value={newSearch} onChange={(e) => setNewSearch(/[\w\s]*/.exec(e.target.value))} /> find countries
      {countriesToShow.length === 0 ? <p>Nothing found :(</p>
        : countryDetailed !== null ? <CountryDetailed country={countryDetailed} />
          : countriesToShow.length <= 10 ? <Countries countries={countriesToShow} handler={setNewSearch} />
            : <p>Too many matches, specify another filter</p >
      }

    </form>
  )
}

export default App 
