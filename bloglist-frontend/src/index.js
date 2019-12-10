
import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import App from './App'
import blogReducer from './reducers/blogReducer'

// Note the order: 
// createStore is the one that creates the whole state tree.
// It has to be in place before the App is rendered.

const store = createStore(blogReducer)

const renderApp = () => {
  ReactDOM.render(
    <App store={store}/>, 
    document.getElementById('root')
  )
}

renderApp()
store.subscribe(renderApp)