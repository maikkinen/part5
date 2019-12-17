import React from 'react'
import User from './User'
import {
  BrowserRouter as Router,
  Route, Link
} from 'react-router-dom'

const UserList = ({ users }) => {

  const userById = (id) => {
    const a = users.find(u => u.id === id)
    console.log('a is: ', a)
    return a
  }

  return (
    <div>
      <Router>
        <h4>Users</h4>
        <p>Users and their productivity in terms of amount of blogs.</p>
        <br />
        <ul>
          {users.map(u =>
            <li key={u.id}>
              <Link to={`/users/${u.id}`}>{u.name}</Link>
            </li>
            /*<User
              key={u.id}
              user={u}
            />*/
          )}
        </ul>
        <Route exact path="/users/:id" render={({ match }) =>
          <User user={userById(match.params.id)} />} />
        {console.log('here in redir stuff')}
      </Router>
    </div>
  )
}

export default UserList