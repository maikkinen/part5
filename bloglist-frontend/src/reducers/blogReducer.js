const blogReducer = (state = [], action) => {
  //First param is the state that's in the store.
  //Reducer returns the new state according to the type of the action.
  switch (action.type) {
  case 'LIKE':
    return [...state, action.data] //placeholder stuff.
  case 'DELETE':
    return state
  case 'CLICK_TITLE':
    return state
  default:
    return state
  }
}

// Reduceria ei koskaan kutsuta suoraan sovelluksen koodista.
// Siksipä reducerin annetaankin parametrina createStore-funktiolle,
// joka annetaan parametrina createStore-funktiolla, joka luo sen varsinaisen storen.

export default blogReducer
