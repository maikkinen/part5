import React from 'react'

const SimpleBlog = ({ blog, onClick }) => (
  <div>
    <div className='BlogHeader'>
      {blog.title} {blog.author}
    </div>
    <div className='BlogLikes'>
      blog has {blog.likes} likes
      <button onClick={onClick}>Like</button>
    </div>
  </div>
)

export default SimpleBlog