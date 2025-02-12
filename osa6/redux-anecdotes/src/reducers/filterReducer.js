const filterReducer = (state = 'ALL', action) => {
  switch (action.type) {
    case 'SET_FILTER':
      return action.payload.length > 0 ? sanitizeString(action.payload) : 'ALL'
    default:
      return state
  }
}

const sanitizeString = str => {
  str = str.replace(/[^\w .,_-]/gim, "");
  return str.trim();
}

export const filterChange = filter => {
  return {
    type: 'SET_FILTER',
    payload: filter
  }
}

export default filterReducer
