import React, { useState } from 'react'
import { connect } from 'react-redux' //To be continued... tee connectjuttu ja mapStateToProps
import { likeBlog, clickTitle, deleteBlog } from '../reducers/blogReducer'

const Blog = ({ key, user, blog, like, removal }) => {
  const [fullBlogVisible, setFullBlogVisible] = useState(false)

  const blogUser = blog.user.username
  const logdInUser = user.username

  //console.log('blog user is: ', blog.user.username)
  //console.log('user user is: ', logdInUser)

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

  return (
    <div style={blogStyle}>
      <div className='contentHeader' onClick={() => handleClickTitle()}>
        {blog.title} by {blog.author}
        <div className='hiddenContent' style={showWhenVisible}>
          <p>Author: {blog.author}</p>
          <p>Likes: {blog.likes}<button onClick={like} >Like</button></p>
          <p>Url: {blog.url}</p>
          <div className='deleteButton'>
            {console.log(blogUser, ' is blog.user, logged in user is ', logdInUser)}
            {blogUser === logdInUser ?
              <button onClick={removal}>Delete</button> :
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

const mapDispatchToProps = {
  clickTitle,
  likeBlog,
  deleteBlog
}


const ConnectedBlog = connect(
  mapStateToProps,
  mapDispatchToProps
)(Blog) //instead of a regular component, we're now exporting a connected one. First param for functions, 2nd for the component that's to be connected.

export default ConnectedBlog