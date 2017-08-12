import React from 'react'
import { Redirect } from 'react-router-dom'
import Auth from '../modules/Auth'

class Logout extends React.Component {

  render() {
  	Auth.deauthenticateUser();
    return (
      <Redirect to="/" push />
    );
  }
}

export default Logout
