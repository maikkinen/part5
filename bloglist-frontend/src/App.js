import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import BlogList from './components/BlogList'
import Notification from './components/Notification'
import blogService from './services/blogs'
import userService from './services/user'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import {
  initializeBlogs, // PITÄÄ connectaa. EI vapaaehtoista
} from './reducers/blogReducer'
import {
  putMessage,
} from './reducers/notificationReducer'


const App = (props) => {

  useEffect(() => {
    props.initializeBlogs()
  }, [])

  //  const [blogs, setBlogs] = useState([])
  //  const [message, setMessage] = useState(null)
  const [user, setUser] = useState(null)
  const [users, setUsers] = useState(null)

  useEffect(() => {
    userService
      .getAll()
      .then(users => {
        setUsers(users)
        console.log('Users initialized in useEffect:',  users)
      })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogout = () => {
    setUser(null)
    window.localStorage.clear()
  }

  const addBlog = (newBlog, newAuthor, newUrl) => {
    blogFormRef.current.toggleVisibility()

    const blogObject = {
      title: newBlog,
      author: newAuthor,
      owner: user,
      likes: '0',
      url: newUrl,
    }

    blogService
      .create(blogObject)
      .then(data => {
        console.log(data)
        //setBlogs(blogs.concat(data))
      })

    putMessage(`New blogpost "${blogObject.title}" added`)
    setTimeout(() => {
      putMessage(null)
    }, 5000)
  }

  const removeBlogFromState = (blogId) => {
    console.log('tämä')
    //console.log(blogs.filter(b => b.id !== blogId))
    //setBlogs(blogs.filter(b => b.id !== blogId))
  }

  const putLikedBlogToState = (likedBlog) => {
    console.log('tämä')
    props.blogs.map(b => b.id === likedBlog.id ? likedBlog : b)
  }

  const blogFormRef = React.createRef()

  if (user === null) { //also: {user === null && loginForm()}
    return (
      <div>
        <Notification/>
        <h2>Log in to Application</h2>
        <Togglable buttonLabel='login'>
          <LoginForm
            setUser={setUser}
          />
        </Togglable>
      </div>
    )
  } else if (user !== null) {
    return (
      <div>
        <h1>Blogs</h1>
        <Notification />
        <p>Logged in as {user.name}</p>
        <button onClick={handleLogout}>logout</button>

        <Togglable buttonLabel='New Blog' ref={blogFormRef}>
          <h4>New Blogpost</h4>
          <BlogForm addBlog={(a, b, c) => addBlog(a, b, c)} />
        </Togglable>
        {console.log('user token is: ', user.token)}
        {console.log('user is: ', user.name, user.username)}
        <h4>Blogs</h4>
        <BlogList user={user}/>
      </div>
    )   //Nyt kun nää komponentit on jo kaikki connectattu, eiks
    //pitäis voida skipata storen antaminen propsina BlogListille?
  } else return (
    console.log('sos')
  )
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
    notification: state.notification
  }
}

const mapDispatchToProps = {
  initializeBlogs
}


export default connect(
  mapStateToProps,
  { mapDispatchToProps, initializeBlogs }
)(App)