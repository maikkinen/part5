import React, { useState, useEffect } from 'react'
import BlogList from './components/BlogList'
import { connect } from 'react-redux'
import Notification from './components/Notification'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import {
  likeBlog,
  deleteBlog,
  clickTitle,
  initializeBlogs,
} from './reducers/blogReducer'
import {
  putMessage,
} from './reducers/notificationReducer'


const App = (props) => {
  const store = props.store

  useEffect(() => {
    initializeBlogs()
  }, [])

  //  const [blogs, setBlogs] = useState([])
  //  const [message, setMessage] = useState(null)
  const [user, setUser] = useState(null)

  /*
  useEffect(() => {
    blogService
      .getAll()
      .then(initialBlogs => {
        setBlogs(initialBlogs)
        console.log(initialBlogs)
      })
  }, [])

  */
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

    putMessage('Hype hype new blogpost added')
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
    store.blogs.map(b => b.id === likedBlog.id ? likedBlog : b)
  }


  const blogFormRef = React.createRef()

  if (user === null) { //also: {user === null && loginForm()}
    return (
      <div>
        <Notification store={store}/>
        <h2>Log in to Application</h2>
        <Togglable buttonLabel='login'>
          <LoginForm
            store={store}
            setUser={setUser}
          />
        </Togglable>
      </div>
    )
  } else if (user !== null) {
    return (
      <div>
        <h1>Blogs</h1>
        <Notification store={store} />
        <p>Logged in as {user.name}</p>
        <button onClick={() => {console.log(store.getState())}}>asfdgb</button>
        <button onClick={handleLogout}>logout</button>

        <Togglable buttonLabel='New Blog' ref={blogFormRef}>
          <h4>New Blogpost</h4>
          <BlogForm addBlog={(a, b, c) => addBlog(a, b, c)} />
        </Togglable>
        {console.log('user token is: ', user.token)}
        <h4>Blogs</h4>
        <BlogList store={store} user={user} userToken = {user.userToken} />
      </div>
    )
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

const ConnectedApp = connect(mapStateToProps)(App)

export default ConnectedApp
