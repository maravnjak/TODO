import React, { useState, useContext } from 'react'
import { useTranslation } from 'common/i18n'

import { Link, useSearchParams } from 'react-router-dom'
import { Button, Container, Grid, TextField, Typography } from '@mui/material'
import { AuthContext } from 'AuthContext/AuthContext'

export default function Register() {

  const context = useContext(AuthContext)
  const [params] = useSearchParams()

  let myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/json')
  const { t } = useTranslation()
  const [username, setUsername] = useState(params.get('username'))
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [email, setEmail] = useState('')
  const [age, setAge] = useState()

  const [error, setError] = useState('')

  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = (event) => {
    console.log('Password event = ', event.target.value)
    setPassword(event.target.value)
  }

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value)
  }

  const handleEmailChange = (event) => {
    setEmail(event.target.value)
  }

  const handleAgeChange = (event) => {
    setAge(event.target.value)
  }

  const handleSubmit = (event) => {

    let isPassword = ''
    event.preventDefault()
    try {
      isPassword = context.checkPassword(password, confirmPassword)
    } catch (e) {
      setError(e.message)
    }

    if (isPassword) {

      console.log('isPassword = ', isPassword)

      let raw = JSON.stringify({
        'name': username,
        'email': email,
        'password': password,
        'age': age
      })

      console.log('raw = ', raw)

      let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      }

      fetch('https://api-nodejs-todolist.herokuapp.com/user/register', requestOptions)
        .then(response => response.text())
        .then(result => console.log(setUserCredential(result)))
        .then(data => console.log('data = ', data))
        .catch(error => console.log('error = ', error))
    }
  }

  const setUserCredential = (result) => {

    setUsername(result.name)
    console.log('result.name = ', result.name)

    setEmail(result.email)
    console.log('result.email = ', result.email)

    setAge(result.age)
    console.log('result.age = ', result.age)

  }
  return (
    <Container maxWidth='sm'>
      <form onSubmit={handleSubmit}>

        <Grid >
          <Grid sx={{ display: 'grid', gridTemplateRows: 'repeat(6,1fr)', maxWidth: '250px' }} >
            <Typography variant='h5'>{t('Please Register in')}</Typography>

            <TextField
              margin = 'normal'
              label={t('Username')}
              type='text'
              value={username} onChange={handleUsernameChange}>
          Username
            </TextField>

            <TextField
              margin = 'normal'
              label={t('Password')}
              type="password"
              value={password}
              onChange={handlePasswordChange}>
          Password
            </TextField>

            <TextField
              margin = 'normal'
              label={t('Confirm Password')}
              type="password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange} >
          Confirm Password
            </TextField>

            <TextField
              margin = 'normal'
              label='e-mail'
              type='e-mail'
              value={email}
              onChange={handleEmailChange}>
          e-mail
            </TextField>

            <TextField
              margin = 'normal'
              label={t('Age')}
              type='number'
              value={age}
              onChange={handleAgeChange}>
          Age
            </TextField>

          </Grid>
        </Grid>
        <Typography variant='h5'color ='error' >{error}</Typography>
        <Button type='submit' variant='contained' color='grey' >{t('Register')}</Button>
        <Button LinkComponent={Link} to={{ pathname: '/', }} color='error'>{t('Cancel')}</Button>
      </form>

    </Container>
  )
}
