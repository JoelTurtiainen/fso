import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/users'

const initialState = []

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers(state, action) {
      return action.payload
    },
  },
})

export const { setUsers } = usersSlice.actions

export const initializeUsers = () => {
  return async (dispatch) => {
    const users = await userService.getUsers()
    dispatch(setUsers(users))
  }
}

export default usersSlice.reducer
