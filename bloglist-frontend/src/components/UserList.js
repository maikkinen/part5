import React from 'react'
import User from './User'

const UserList = ({ users }) => {
  return (
    <div>
      <h4>Users</h4>
      <p>Users and their productivity in terms of amount of blogs.</p>
      <br/>
      {users.map(u =>
        <User
          key={u.id}
          user={u}
        />
      )}
    </div>
  )
}

export default UserList