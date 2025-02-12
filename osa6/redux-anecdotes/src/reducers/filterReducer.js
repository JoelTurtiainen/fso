import { createSlice } from '@reduxjs/toolkit'

const filterSlice = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    filterChange(_state, action) {
      return sanitizeString(action.payload)
    }
  }
})

const sanitizeString = str => {
  str = str.replace(/[^\w .,_-]/gim, "");
  return str.trim();
}

//const filterReducer = (state = 'ALL', action) => {
//  switch (action.type) {
//    case 'SET_FILTER':
//      return action.payload.length > 0 ? sanitizeString(action.payload) : 'ALL'
//    default:
//      return state
//  }
//}



//export const filterChange = filter => {
//  return {
//    type: 'SET_FILTER',
//    payload: filter
//  }
//}


export const { filterChange } = filterSlice.actions
export default filterSlice.reducer
