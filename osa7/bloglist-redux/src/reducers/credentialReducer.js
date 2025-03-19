import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'

const initialState = null
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      return action.payload
    },
    logoffUser: () => null,
  },
})

export const { setUser, logoffUser } = userSlice.actions

export const initializeUser = (userData) => {
  return async (dispatch) => {
    dispatch(setUser(userData))
  }
}

export const loginUser = (credentials) => {
  return async (dispatch) => {
    const userData = await loginService.login(credentials)
    dispatch(setUser(userData))
    localStorage.setItem('user', JSON.stringify(userData))
  }
}

export const logOff = () => {
  return async (dispatch) => {
    localStorage.removeItem('user')
    dispatch(logoffUser())
  }
}

export default userSlice.reducer
