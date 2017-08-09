import React from 'react'
import { Link } from 'react-router'


class Home extends React.Component {

  render() {
    return (
      <div id='home' >
        <h2>Welcome to Bookaholics Anonymous</h2>
        <p>Trade books with people in your area</p>
        <p><Link to='/login'>Login</Link> to start.</p>
      </div>
    );
  }
}

export default Home
