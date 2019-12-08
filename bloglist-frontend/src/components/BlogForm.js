import React from 'react'
import { useField } from '../hooks/index'

const BlogForm = ({ addBlog }) => {
  const newBlog = useField('')
  const newAuthor = useField('')
  const newUrl = useField('')


  // ♥♥♥♥♥


  const handleAddBlog = (event) => {
    event.preventDefault()
    addBlog(newBlog.value,
      newAuthor.value,
      newUrl.value,
    ) //they say: pitäis olla s.e. addBlog ei ottaisi propseja. Pelkkä addBlog riittäisi.
  }


  return (
    <form onSubmit={handleAddBlog}>
      Title: <input
        type={newBlog.type}
        value={newBlog.value}
        onChange={newBlog.onChange}
      />
      Author: <input
        type={newAuthor.type}
        value={newAuthor.value}
        onChange={newAuthor.onChange}
      />
      Url: <input
        type={newUrl.type}
        value={newUrl.value}
        onChange={newUrl.onChange}
      />
      <button type="submit">create</button>
    </form>
  )
}

export default BlogForm