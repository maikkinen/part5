import React from 'react'
import {
  BrowserRouter as Router,
  Route, Link, Redirect, withROuter
} from 'react-router-dom'

const User = ({ user }) => {
  const blogsAmount = user.blogs.length
  const userIdLink = `/users/${user.id}`

  console.log('userID is: ', userIdLink)

  console.log('blogsAmountis: ', blogsAmount)

  if (user === undefined) {
    return null
  }

  //TODO: tsekkaa miten se Visible setVisible-touhu toimii, tän voisi vetää sillä.
  //Rendaa ehdollisesti joko koko lista tai sitte ...
  //Ei mutta, tässä pitääkin vissii käyttää sitä Routeria.

  //Aloita siitä, että teet routerin, jolla löytää yksittäisen tyypin id:n ja sitte vastaavat tiedot. 
  //Sitten voit tehdä ton ehdollisjutun.

  return (
    <div>
      <Router>
        <Link to={userIdLink}> {user.name} </Link> {blogsAmount}
        {//Probis: pitäis saada id toimimaan.
        }
      </Router>
    </div>
  )
}

const UserInfo = ({ user }) => {
  return (
    <div>
      <Router>
        <h2>{user.name}</h2>
        <br />
        <p>has added blogs</p>
        <ul>
          {user.blog.map(b =>
            <li key={b.id}>{b.title}</li>
          )}
        </ul>
      </Router>
    </div>
  )
}

export default User