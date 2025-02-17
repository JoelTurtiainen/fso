import { createSlice } from '@reduxjs/toolkit'

const filterSlice = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    filterChange: (_state, action) => sanitizeString(action.payload)
  }
})

const sanitizeString = str => {
  str = str.replace(/[^\w .,_-]/gim, "");
  return str.trim();
}

export const { filterChange } = filterSlice.actions
export default filterSlice.reducer
