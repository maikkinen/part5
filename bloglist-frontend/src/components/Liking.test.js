import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom' 
import SimpleBlog from './SimpleBlog'

// ...

test('clicking the Like-button calls event handler once', async () => {
  const blog = {
    title: 'Chocolate & Confectionery Consumption in Norway from 2016 to 2026',
    author: 'Elise Sjokolade',
    owner: 'Leevi Lapinpöllö',
    likes: '452',
    url: 'www.sjokoladefabrikkene.no',
  }

  /*
   Mock functions allow you to test the links between code
   by erasing the actual implementation of a function,
   capturing calls to the function (and the parameters
   passed in those calls), capturing instances of constructor
   functions when instantiated with new,
   and allowing test-time configuration of return values.
   */


  const onClick = jest.fn() //officially, called as "mockHandler"

  const { getByText } = render(
    <SimpleBlog blog={blog} onClick={onClick} />
  )

  const button = getByText('Like')
  fireEvent.click(button)
  fireEvent.click(button)

  expect(onClick.mock.calls.length).toBe(2)

  console.log(prettyDOM(button))
})