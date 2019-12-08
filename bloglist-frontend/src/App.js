import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState(null)
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService
      .getAll()
      .then(initialBlogs => {
        setBlogs(initialBlogs)
        console.log(initialBlogs)
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
        setBlogs(blogs.concat(data))
      })

    setMessage('Hype hype new blogpost added')
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const removeBlogFromState = (blogId) => {
    console.log('tämä')
    console.log(blogs.filter(b => b.id !== blogId))
    setBlogs(blogs.filter(b => b.id !== blogId))
  }

  const putLikedBlogToState = (likedBlog) => {
    console.log('tämä')
    setBlogs(blogs.map(b => b.id === likedBlog.id ? likedBlog : b))
  }


  const blogFormRef = React.createRef()

  if (user === null) { //also: {user === null && loginForm()}
    return (
      <div>
        <Notification message={message} />
        <h2>Log in to Application</h2>
        <Togglable buttonLabel='login'>
          <LoginForm
            setMessage={setMessage}
            setUser={setUser}
          />
        </Togglable>
      </div>
    )
  } else if (user !== null) {
    return (
      <div>
        <h1>Blogs</h1>
        <Notification message={message} />
        <p>Logged in as {user.name}</p>
        <button onClick={handleLogout}>logout</button>

        <Togglable buttonLabel='New Blog' ref={blogFormRef}>
          <h4>New Blogpost</h4>
          <BlogForm addBlog={(a, b, c) => addBlog(a, b, c)} />
        </Togglable>
        {console.log('user token is: ', user.token)}
        <h4>Blogs</h4>
        {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
          <Blog
            key={blog.id}
            blog={blog}
            user={user}
            userToken={user.token}
            putLikedBlogToState={(b) => putLikedBlogToState(b)}
            removeBlogFromState={(b) => removeBlogFromState(b)}
          />
        )}
      </div>
    )
  } else return (
    console.log('sos')
  )
}

export default App
