import React from 'react'
import { connect } from 'react-redux'
import Blog from './Blog'
import { likeBlog, deleteBlog, clickTitle } from '../reducers/blogReducer'
import { putMessage } from '../reducers/notificationReducer'

const BlogList = (props) => {
  // props vaan saa LISÄÄ kenttiä. Sekä kun kutsutaan komponenttia että mapStateToPropsin avulla
  const blogs = props.blogs
  console.log('here in BlogList, blogs are: ', blogs)
  console.log('props: ', props)

  const like = (blog, event) => {
    console.log('yolo')
    event.preventDefault()
    props.likeBlog(blog)
    putMessage(`You voted for "${blog.title}"`)
    setTimeout(() => {
      putMessage(null)
    }, 5000)
  }

  return (
    <ul>
      {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          user={props.user}
          //userToken={props.user.token}
          like={(e) => like(blog, e)} //Tohon tulee: props.(likeBlog()
          deleteBlog={() => console.log('yolo del')} //Koska connect, ei tarvitse: store.props.dispatch
        />
      )}
    </ul>
  )
}

const mapStateToProps = (state) => {
  console.log('state is: ', state)
  return {
    blogs: state.blogs,
    notification: state.notification
    //statessa on myös notification-kenttä, mutta ei tarvita täällä. kai.
  }
}

const mapDispatchToProps = {
  //initializeBlogs <-- Tämän pitäisi tulla propsina, joten ei tarvi tehdä täällä
  likeBlog, //nää on kenttiä, joiden arvo on funktio
  deleteBlog,
  clickTitle,
  putMessage
  //Näitä ei käytetä vielä missään.
}

const ConnectedBlogList = connect(
  mapStateToProps,
  mapDispatchToProps
)(BlogList)

export default ConnectedBlogList