import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
  //First param is the state that's in the store.
  //Reducer returns the new state according to the type of the action.
  switch (action.type) {
    case 'LIKE':
      return action.data
    case 'DELETE':
      return state
    case 'CLICK_TITLE':
      return state
    case 'INITIALIZE':
      console.log('here in reducer init')
      console.log('blogreducers initialize returns: ', action.data)
      return action.data
    default:
      return state
  }
}

// Reduceria ei koskaan kutsuta suoraan sovelluksen koodista.
// Siksipä reducerin annetaankin parametrina createStore-funktiolle,
// joka annetaan parametrina createStore-funktiolla, joka luo sen varsinaisen storen.

export const likeBlog = (blog) => {
  const newObject = { ...blog, likes: blog.likes + 1 }
  //state.map(b => b.id !== newObject.id ? b : newObject)
  console.log('likes before: ', blog.likes)
  console.log('likes after: ', newObject.likes, newObject)
  blogService.update(blog.id, newObject)
  return {
    type: 'LIKE',
    data: newObject
  }
}

export const deleteBlog = (id) => {
  return {
    type: 'DELETE',
    data: { id }
  }
}

export const clickTitle = (id) => {
  return {
    type: 'CLICK_TITLE',
    data: { id }
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const allBlogs = await blogService.getAll()
    dispatch({
      type: 'INITIALIZE',
      data: allBlogs,
    })
  }
}

// export const handleSetValue = setReducerValue(blogService.getAll())

/*
export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_NOTES',
      data: anecdotes,
    })
  }
}
 */

export default blogReducer


