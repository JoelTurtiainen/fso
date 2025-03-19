import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'
import credentialReducer from './reducers/credentialReducer'
import usersReducer from './reducers/usersReducer'

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogReducer,
    user: credentialReducer,
    users: usersReducer,
  },
})

export default store
