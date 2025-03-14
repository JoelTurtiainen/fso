import { createContext, useReducer, useContext } from 'react'

const userReducer = (state, action) => {
  switch (action.type) {
    case 'loggedin':
      return action.payload
    case 'loggedout':
      return null
  }
}

const UserContext = createContext(null)

export const UserContextProvider = (props) => {
  const [user, dispatch] = useReducer(userReducer, null)

  return (
    <UserContext.Provider value={[user, dispatch]}>
      {props.children}
    </UserContext.Provider>
  )
}

export const useUserValue = () => {
  const userAndDispatch = useContext(UserContext)
  return userAndDispatch[0]
}

export const useUserDispatch = () => {
  const userAndDispatch = useContext(UserContext)
  localStorage.setItem('user', JSON.stringify(userAndDispatch[0]))
  return userAndDispatch[1]
}

export default UserContext
