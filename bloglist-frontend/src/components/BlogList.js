import React from 'react'
import { connect } from 'react-redux'
import Blog from './Blog'
import { likeBlog, deleteBlog, clickTitle } from '../reducers/blogReducer'

const BlogList = (props) => {
  // props vaan saa LISÄÄ kenttiä. Sekä kun kutsutaan komponenttia että mapStateToPropsin avulla
  const blogs = props.blogs
  console.log('here in BlogList, blogs are: ', blogs )
  console.log('props: ', props)
  return (
    blogs.sort((a, b) => b.likes - a.likes).map(blog =>
      <Blog
        key={blog.id}
        blog={blog}
        user={props.user}
        userToken={props.user.token}
        putLikedBlogToState={() => like()} //Tohon tulee: props.likeBlog()
        removeBlogFromState={() => like()} //Koska connect, ei tarvitse: store.props.dispatch
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
    //statessa on myös notification-kenttä, mutta ei tarvita täällä. kai.
  }
}

const mapDispatchToProps = {
  //initializeBlogs <-- Tämän pitäisi tulla propsina, joten ei tarvi tehdä täällä
  likeBlog, //nää on kenttiä, joiden arvo on funktio
  deleteBlog,
  clickTitle
  //Näitä ei käytetä vielä missään.
}

const ConnectedBlogList = connect(
  mapStateToProps,
  mapDispatchToProps
)(BlogList)

export default ConnectedBlogList