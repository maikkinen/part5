import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import SimpleBlog from './SimpleBlog'

//React-testing-library kehoittaa kutsumaan cleanuppia jokaisen testin jälkeen.
//Voisit importata tarvittavat jutut ja suorittaa sen esim. afterEachilla.
//Toinen vaihtoehto, joka tässä toteutettu, on konffata setupTests.js.

test('renders content', () => {
  const blog = {
    title: 'Chocolate & Confectionery Consumption in Norway from 2016 to 2026',
    author: 'Elise Sjokolade',
    owner: 'Leevi Lapinpöllö',
    likes: '452',
    url: 'www.sjokoladefabrikkene.no',
  }

  const component = render(
    <SimpleBlog blog={blog} />
  )

  //container on render-funktion palauttaman olion yksi kenttä, joka on aina olemassa.
  //container sisältää koko komponentin renderöimän HTML:n.
  expect(component.container).toHaveTextContent(
    'Chocolate & Confectionery Consumption in Norway from 2016 to 2026'
  )

  //Ylläolevan voisi tehdä myös näin:
  /*
    const element = component.getByText(
      'Component testing is done with react-testing-library'
    )
    expect(element).toBeDefined()

  */

  const div = component.container.querySelector('.BlogHeader')
  expect(div).toHaveTextContent(
    'Chocolate & Confectionery Consumption in Norway from 2016 to 2026'
  )

  console.log(prettyDOM(div))

})