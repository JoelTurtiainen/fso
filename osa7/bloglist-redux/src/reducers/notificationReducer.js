import { createSlice } from '@reduxjs/toolkit'

const initialState = null

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    changeNotification: (_state, action) => action.payload,
    clearNotification: () => null,
  },
})

export const { changeNotification, clearNotification } =
  notificationSlice.actions

export const setNotification = (content, timeout = 5) => {
  return async (dispatch) => {
    dispatch(changeNotification(content))

    setTimeout(() => {
      dispatch(clearNotification())
    }, timeout * 1000)
  }
}

export default notificationSlice.reducer
