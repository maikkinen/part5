const initialMessage = ''

const notificationReducer = ( state = initialMessage, action) => {
  switch (action.type) {
  case 'PUT_MESSAGE':
    return action.data
  default:
    return state
  }
}

export const putMessage = (message) => {
  console.log('message is: ', message)
  return dispatch => {
    dispatch({
    type: 'PUT_MESSAGE',
    data: message,
  })
  }
}

export default notificationReducer