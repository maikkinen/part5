import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, waitForElement } from '@testing-library/react'
jest.mock('../services/blogs')
import App from '../App'

describe('<App />', () => {
  test('if no user is logged in, no blogs are rendered either', async () => {
    const component = render(
      <App />
    )
    component.rerender(<App />)

    await waitForElement(
      () => component.getByText('login here')
    )

    const blogs = component.container.querySelectorAll('.blog')
    expect (blogs.length).toBe(0)
  })
})