import React from 'react'

export const AuthContext = React.createContext({
  isAuth: false,
  login: (username, password) => {
  },
  register: (username, password, confirmPassword) => {
  },
  checkPassword: (password,confirmPassword) =>{
  },
  logout: () => {
  },
  getUser: () => {
  },
  updateUsernameLoggedIn: () => {
  }
})

