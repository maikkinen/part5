import React, { useState } from 'react'
import { connect } from 'react-redux' //To be continued... tee connectjuttu ja mapStateToProps

import blogService from '../services/blogs'
import { likeBlog, clickTitle } from '../reducers/blogReducer'

const Blog = ( store, { blog, user, removeBlogFromState, putLikedBlogToState }) => {
  const [fullBlogVisible, setFullBlogVisible] = useState(false)

  // const hideWhenVisible = { display: fullBlogVisible ? 'none' : '' }
  const showWhenVisible = { display: fullBlogVisible ? '' : 'none' }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 5,
    marginBottom: 5,
    borderRadius: 5,
    borderColor: 'lightgray',
  }

  const handleClickTitle = () => {
    setFullBlogVisible(!fullBlogVisible)
  }

  const handleLiking = () => {
    console.log('blog id: ', blog.id)
    console.log('blog title is: ', blog.title)
    console.log('blog likes equals to', blog.likes)
    console.log('blog.author is: ', blog.author)
    console.log('blog.user is: ', blog.user)
    console.log('Logged in user is: ', user)

    const newObject = {
      title: blog.title,
      author: blog.author,
      //      user: userToken, //Tähän vissii tarvittais se id...
      likes: blog.likes + 1,
      url: blog.url,
      user: blog.user,
      id: blog.id,
    }

    blogService
      .update(blog.id, newObject)
      //      .then(putLikedBlogToState(blog.id))
      .then(
        putLikedBlogToState(newObject)
      )
  }

  const handleDeleting = () => {
    blogService
      .remove(blog.id)
      .then(removeBlogFromState(blog.id))
      .then(console.log('doned with Deleting.'))
  }

  return (
    <div style={blogStyle}>
      <div className='contentHeader' onClick={() => handleClickTitle()}>
        {blog.title} by {blog.author}
        <div className='hiddenContent' style={showWhenVisible}>
          <p>Author: {blog.author}</p>
          <p>Likes: {blog.likes}<button onClick={() => likeBlog(blog)} >Like</button></p>
          <p>Url: {blog.url}</p>
          <div className='deleteButton'>
            {console.log(blog.user.username, ' is blog.user, logged in user is ', user.username)}
            {blog.user.username === user.username ?
              <button onClick={handleDeleting}>Delete</button> :
              null
            }
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs
  }
}


const ConnectedBlog = connect ()(Blog) //instead of a regular component, we're now exporting a connected one. First param for functions, 2nd for the component that's to be connected.

export default ConnectedBlog