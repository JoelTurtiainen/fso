import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/'

const getAll = async () => {
  const request = axios.get(`${baseUrl}/all`)
  return request.then(response => response.data)
}

const getDetails = async countryName => {
  const request = axios.get(`${baseUrl}name/${countryName}`)
  return request.then(response => response.data)
}

export default { getAll, getDetails }

