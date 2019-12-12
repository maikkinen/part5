
import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
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
})  //This thing equals to: meillä on nyt olio, jolla on kaksi kenttää.

const store = createStore(
  reducer,
  applyMiddleware(thunk)
)

//console.log(store.getState())

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
