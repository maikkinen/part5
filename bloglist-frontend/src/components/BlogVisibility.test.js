import React, { Component } from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup } from '@testing-library/react'
import { prettyDOM, getByText, fireEvent } from '@testing-library/dom'
import Blog from './Blog'

//5.15*: blogilistan testit, step3
/*
  Tee oman sovelluksesi komponentille Blog testit, jotka varmistavat,
  että oletusarvoisesti blogista on näkyvissä ainoastaan nimi ja
  kirjoittaja, ja että klikkaamalla niitä saadaan näkyviin myös muut
  osat blogin tiedoista.
 */

test('renders content', (  ) => {
  const user = {
    username: 'Leevi',
    name: 'Leevi Lapinpöllö',
    password: 'salainen',
  }

  const blog = {
    title: 'Chocolate & Confectionery Consumption in Norway from 2016 to 2026',
    author: 'Elise Sjokolade',
    owner: 'Elli', //Logged in user who's created the blogpost
    likes: '452',
    url: 'www.sjokoladefabrikkene.no',
    user: {
      username: 'Leevi',
      name: 'Leevi Lapinpöllö',
      password: 'salainen',
    }
  }

  const removeMock = jest.fn()

  const clickingHeader = render(
    <Blog blog={blog, user, removeMock} />
  )

  //Check headerin sisältö ok
  const header = clickingHeader.container.querySelector('.contentHeader')
  expect(header).toHaveTextContent(
    'by Author: Likes: LikeUrl:'
  )

  //Klikkaa headeria jotta hidden content näkyisi
  const clickedContentHeader = clickingHeader.container.querySelector('.contentHeader')
  fireEvent.click(clickedContentHeader)

  expect(clickedContentHeader).toHaveTextContent(
    'Author: Likes: LikeUrl:'
  )

  //const hiddenContent = component.container.querySelector('.hiddenContent')
  //expect(hiddenContent).toHaveTextContent(
  //  'Likes: 452'
  //)
  console.log(prettyDOM(clickedContentHeader))

})