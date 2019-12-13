import React from 'react'
import {
  Link
} from 'react-router-dom'

const User = ({ user }) => {
  const blogsAmount = user.blogs.length
  console.log('blogsAmountis: ', blogsAmount )

  if ( user === undefined ) {
    return null
  }

  //TODO: tsekkaa miten se Visible setVisible-touhu toimii, tän voisi vetää sillä.
  //Rendaa ehdollisesti joko koko lista tai sitte ...
  //Ei mutta, tässä pitääkin vissii käyttää sitä Routeria.

  //Aloita siitä, että teet routerin, jolla löytää yksittäisen tyypin id:n ja sitte vastaavat tiedot. 
  //Sitten voit tehdä ton ehdollisjutun.

  return (
    <div>
      <Link to="#"> {user.name} </Link> {blogsAmount}
    </div>
  )
}

export default User