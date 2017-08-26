import React from 'react'
import { Link } from 'react-router-dom'
import RaisedButton from 'material-ui/RaisedButton'

class Home extends React.Component {

  render() {
    return (
      <div id='home' >
        <h1>Welcome to Bookaholics Anonymous</h1>
        <h4>Trade books with people in your area</h4>
        <Link to='/login'>
        	<RaisedButton label='Login' primary className='home-btns'/>
        </Link>
        <Link to='/register'>
        	<RaisedButton label='Register' primary className='home-btns'/>
        </Link>
      </div>
    );
  }
}

export default Home
