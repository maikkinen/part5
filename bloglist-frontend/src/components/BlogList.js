import React from 'react'
import { connect } from 'react-redux'
import Blog from './Blog'

const BlogList = (props, { user, userToken }) => {
  const blogs = props.blogs
  return (
    blogs.sort((a, b) => b.likes - a.likes).map(blog =>
      <Blog
        key={blog.id}
        blog={blog}
        user={user}
        userToken={userToken}
        putLikedBlogToState={() => like()}
        removeBlogFromState={() => like()}
      />
    )
  )
}

const like = () => {
  console.log('yolo')
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs
  }
}

const ConnectedBlogList = connect(mapStateToProps)(BlogList)

export default ConnectedBlogList