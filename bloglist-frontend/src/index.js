
import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import App from './App'
import blogReducer from './reducers/blogReducer'
import notificationReducer from './reducers/notificationReducer'

// Note the order: 
// createStore is the one that creates the whole state tree.
// It has to be in place before the App is rendered.

const reducer = combineReducers({
  blogs: blogReducer,
  notification: notificationReducer
})

const store = createStore(reducer)

//console.log(store.getState())

const renderApp = () => {
  ReactDOM.render(
    <Provider store={store}>
      <App/>
    </Provider>,
    document.getElementById('root')
  )
}

renderApp()
store.subscribe(renderApp)