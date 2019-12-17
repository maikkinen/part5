import React from 'react'
import User from './User'
import {
  BrowserRouter as Router,
  Route, Link
} from 'react-router-dom'

const UserList = ({ users }) => {

  return (
    <div>
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
    </div>
  )
}

export default UserList