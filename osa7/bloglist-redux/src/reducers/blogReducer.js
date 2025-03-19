import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const initialState = []

const blogSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    changeBlog(state, action) {
      const id = action.payload
      const blogToChange = state.find((n) => n.id === id)
      console.debug('blogToChange:', blogToChange)
      const changedBlog = {
        ...blogToChange,
        likes: blogToChange.likes + 1,
      }

      return state.map((blog) => (blog.id !== id ? blog : changedBlog))
    },
    filterBlog(state, action) {
      const id = action.payload

      return state.filter((blog) => blog.id !== id)
    },
    appendBlog(state, action) {
      state.push(action.payload)
    },
    setBlogs(state, action) {
      return action.payload
    },
  },
})

export const { changeBlog, filterBlog, appendBlog, setBlogs } =
  blogSlice.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (content, user) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(content, user)
    dispatch(appendBlog(newBlog, user))
  }
}

export const likeBlog = (id) => {
  return async (dispatch) => {
    await blogService.like(id)
    dispatch(changeBlog(id))
  }
}

export const removeBlog = (id, user) => {
  return async (dispatch) => {
    await blogService.remove(id, user)
    dispatch(filterBlog(id))
  }
}

export default blogSlice.reducer
