import React from 'react'
import { useField } from '../hooks/index'
import loginService from '../services/login'
import blogService from '../services/blogs'

const LoginForm = ({
  //handleLogin,
  //username,
  //setUsername,
  //password,
  //setPassword
  setMessage,
  setUser,
}) => {

  const username = useField('text')
  const password = useField('password')

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: username.value,
        password: password.value
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      console.log('logging in här', username, password)
      blogService.setToken(user.token)
      setUser(user)  //Em. tiedot tallennetaan sovelluksen tilaan (!!) user.
      //setUsername('')
      //setPassword('')
    } catch (exception) {
      setMessage('Those credentials are wrong, honey.')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  return (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type={username.type}
          value={username.value}
          onChange={username.onChange}
        />
      </div>
      <div>
        password
        <input
          type={password.type}
          value={password.value}
          onChange={password.onChange}
        />
      </div>
      <button onClick={(e) => handleLogin(e)} type="submit">login</button>
    </form>
  )
}

export default LoginForm