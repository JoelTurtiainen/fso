import { createSlice } from '@reduxjs/toolkit'

const initialState = null

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification: (_state, action) => action.payload,
    clearNotification: () => null
  }
})

export const { setNotification, clearNotification } = notificationSlice.actions
export default notificationSlice.reducer
