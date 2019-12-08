// Note: the name __mocks__ (2 underscores in each) is a Jest's required,
// default thing. 

const blogs = [
  {
    id: '5a451df7571c224aaas3431b5c8ce',
    title: 'Chocolate Consumption by Area in Norway in 2019',
    author: 'Elise Sjokolade',
    likes: '45467',
    url: 'www.chocolateinnorway.com',
    user: {
      _id: '5a437a9e514ab7f168ddf138',
      username: 'Lintu',
      name: 'Liisa Lintu'
    }
  },
  {
    id: '5a451df7571c224a31biiop5c8ce',
    title: 'Bästa kladdkakorna i Göteborg',
    author: 'Linda Mums',
    likes: '2067',
    url: 'www.lindasmatblog.com',
    user: {
      _id: '5a437a9e514ab7f168ddf138',
      username: 'Lintu',
      name: 'Liisa Lintu'
    }
  },
  {
    id: '5a451df757grt51c224a31b5c8ce',
    title: 'How to Make Colored Chocolate Bonbons',
    author: 'Guillaume Roch',
    likes: '49001',
    url: 'www.patisserie-chocolaterie-roch.com',
    user: {
      _id: '5a437a9e514ab7f168ddf138',
      username: 'Lintu',
      name: 'Liisa Lintu'
    }
  }
]

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  return Promise.resolve(blogs)
}

export default { getAll, setToken, blogs }