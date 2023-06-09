import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { AuthContext } from 'AuthContext/AuthContext'
import { useTranslation } from 'common/i18n'

const Auth = (props) => {

  const [userLoggedIn, setUserLoggedIn] = useState()
  const [users, setUsers] = useState([])
  const [registerUser, setRegistarUser] = useState([])
  const { t } = useTranslation()

  useEffect(() => {
    const localStorageUser = localStorage.getItem('userLoggedIn')
    if (localStorageUser) {
      setUserLoggedIn(JSON.parse(localStorageUser))
    }
  }, [])

  const login = (username, password) => {

    if (!username) {
      throw new Error ('Missing username.')
    }
    if (!password) {
      throw new Error('Missing password.')
    }

    const userToLogin = users.find((user) => {
      return user.username === username && user.password === password
    })
    if (!userToLogin) {
      throw new Error('Username or password is not correct.')

    }
    setUserLoggedIn(userToLogin)
    localStorage.setItem('userLoggedIn', JSON.stringify(userToLogin))
  }

  const checkPassword = (password, confirmPassword) => {

    let trimedPassword = password.trim()
    let trimedConfirmPassword = confirmPassword.trim()

    if (trimedPassword.length < 7 || trimedConfirmPassword < 7) {
      throw new Error('password must bin longe then 6 characters')
    }

    if (!password) {
      throw new Error('Missing password.')
    }
    if (!confirmPassword) {
      throw new Error('Missing confirmPassword.')
    }
    if (password !== confirmPassword) {
      throw new Error('Password is not equals with Comfirm Password.')
    }
    return true
  }
  const register = (username, password, confirmPassword) => {
    if (!username) {
      throw new Error('Username is request')
    }
    if (!password) {
      throw new Error('Password is request')
    }
    if (!confirmPassword) {
      throw new Error('Confirm password is request')
    }
    setRegistarUser(registerUser)
    localStorage.setItem('userLoggedIn', JSON.stringify(registerUser))
  }
  const logout = () => {
    setUserLoggedIn()
    localStorage.setItem('userLoggedIn', '')
  }

  const getUser = () => {
    if (!userLoggedIn) {
      return {}
    }
    return {
      username: userLoggedIn.username,
    }
  }

  const updateUsernameLoggedIn = (newUsername) => {
    let oldUsername = getUser().username
    var tempUsers = [...users]

    const index = users.findIndex((user) => user.username === oldUsername)

    let tempUser = { ...tempUsers[index] }

    tempUser.username = newUsername

    tempUsers[index] = tempUser

    setUsers(tempUsers)

    setUserLoggedIn(tempUser)
    localStorage.setItem('userLoggedIn', JSON.stringify(tempUser))
  }

  return <AuthContext.Provider value={{
    isAuth: !!userLoggedIn,
    login,
    checkPassword,
    register,
    logout,
    getUser,
    updateUsernameLoggedIn
  }}>
    {props.children}
  </AuthContext.Provider>
}
Auth.propTypes = {
  children: PropTypes.element.isRequired
}
export default Auth
