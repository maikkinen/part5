import React from 'react'

const User = ({ user }) => {
  console.log(user)
  if (user === undefined) {
    return null
  }

  const blogsAmount = user.blogs.length

  return (
    <div>
      <h2>{user.name}</h2>
      {blogsAmount > 0 ?
        <div>
          <p>has added {blogsAmount} wonderful blog(s):</p>
          <ul>
            {user.blogs.map(b =>
              <li key={b.id}>{b.title}</li>
            )}
            {console.log('here in user stuff')}
          </ul> </div> :
        <p> has not found his inner Shakerspeare yet.</p>
      }
    </div>
  )
}

export default User