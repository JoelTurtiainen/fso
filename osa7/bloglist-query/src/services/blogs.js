import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

export const getBlogs = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

export const createBlog = async ({ newBlog, user }) => {
  setToken(user.token)
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

export const updateBlog = async newBlog => {
  const id = newBlog.id
  const response = await axios.put(`${baseUrl}/${id}`, newBlog)
  return response.data
}

export const removeBlog = async ({ blogId, user }) => {
  setToken(user.token)
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.delete(`${baseUrl}/${blogId}`, config)
  console.log(response)
  return response.data
}

