import React from 'react';
import PropTypes from 'prop-types'
import RaisedButton from 'material-ui/RaisedButton'
import { Link } from 'react-router-dom'

const Dashboard = ({ user }) => (
  <div className="container">
    <h3>Dashboard</h3>
    {user && <p style={{ fontSize: '16px', color: 'green' }}>Welcome, {user.name}</p>}
    <Link to='/allbooks'>
    	<RaisedButton primary={true} className='dash-btn'>
    		All Books
    	</RaisedButton>
    </Link>
    <Link to='/mybooks'>
    	<RaisedButton primary={true} className='dash-btn' >
    		My Books
    	</RaisedButton>
    </Link>
  </div>
)

Dashboard.PropTypes = {
	user: PropTypes.object.isRequired
}

export default Dashboard