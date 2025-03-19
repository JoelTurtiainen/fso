import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (newObject, user) => {
  setToken(user.token)
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const like = async (id) => {
  const returnedObj = await axios.get(`${baseUrl}/${id}`)
  const newObject = { ...returnedObj.data, likes: returnedObj.data.likes + 1 }
  const response = await axios.put(`${baseUrl}/${id}`, newObject)
  return response.data
}

const comment = async ({ id, newComment }) => {
  const returnedObj = await axios.get(`${baseUrl}/${id}`)
  const newObject = {
    ...returnedObj.data,
    comments: [...returnedObj.data.comments, newComment],
  }
  const response = await axios.put(`${baseUrl}/${id}`, newObject)
  return response.data
}

const update = async (newObject, user) => {
  setToken(user.token)
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.put(
    `${baseUrl}/${newObject.id}`,
    { ...newObject, user: user.id },
    config
  )
  return response.data
}

const remove = async (blogId, user) => {
  setToken(user.token)
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.delete(`${baseUrl}/${blogId}`, config)
  return response.data
}

export default { getAll, create, update, remove, like, comment }
