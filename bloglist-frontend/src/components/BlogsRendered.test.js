import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, waitForElement } from '@testing-library/react'
jest.mock('../services/blogs')
import { prettyDOM } from '@testing-library/dom'
import App from '../App'

describe('<App />', () => {
  test('if user is logged in, blogs are rendered nicely', async () => {
    const user = {
      token: '5a437a9e514ab7f168ddf138',
      username: 'Lintu',
      name: 'Liisa Lintu'
    }
    window.localStorage.setItem('loggedInUser', JSON.stringify(user))

    const component = render(
      <App />
    )
    component.rerender(<App />)

    await waitForElement(() => component.getAllByText('blogs'))

    const blogsRendered = component.container.querySelectorAll('.contentHeader')

    console.log('here', blogsRendered)

    expect(blogsRendered.length).toBe(3)

  })
})