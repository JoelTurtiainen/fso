import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const initialState = []

const blogSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    addLike(state, action) {
      const id = action.payload
      const blogToChange = state.find((n) => n.id === id)
      const changedBlog = {
        ...blogToChange,
        likes: blogToChange.likes + 1,
      }

      return state.map((blog) => (blog.id !== id ? blog : changedBlog))
    },
    addComment(state, action) {
      const id = action.payload.id
      const newComment = action.payload.newComment
      const blogToChange = state.find((n) => n.id === id)
      console.log(blogToChange)
      const changedBlog = {
        ...blogToChange,
        comments: [...blogToChange.comments, newComment],
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

export const { addLike, addComment, filterBlog, appendBlog, setBlogs } =
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
    dispatch(appendBlog(newBlog))
  }
}

export const likeBlog = (id) => {
  return async (dispatch) => {
    await blogService.like(id)
    dispatch(addLike(id))
  }
}

export const commentBlog = ({ id, newComment }) => {
  return async (dispatch) => {
    console.log(id, newComment)
    await blogService.comment({ id, newComment })
    dispatch(addComment({ id, newComment }))
  }
}

export const removeBlog = (id, user) => {
  return async (dispatch) => {
    await blogService.remove(id, user)
    dispatch(filterBlog(id))
  }
}

export default blogSlice.reducer
