import React from 'react'
import { connect } from 'react-redux'
import { putMessage } from '../reducers/notificationReducer'

const Notification = (props) => {
  if (props.message === null) {
    return null
  }
  return (
    <div className="error">
      {props.message}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}

const mapDispatchToProps = {
  putMessage
}

const ConnectedNotification = connect(
  mapStateToProps,
  mapDispatchToProps
)(Notification)

export default ConnectedNotification