import React from 'react';
import PropTypes from 'prop-types'
import { Card, CardTitle, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton'
import { Link } from 'react-router-dom'

const Dashboard = ({ user }) => (
  <Card className="container">
    <CardTitle
      title="Dashboard"
    />
    {user && <CardText style={{ fontSize: '16px', color: 'green' }}>Welcome, {user.name}</CardText>}
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
  </Card>
)

Dashboard.PropTypes = {
	user: PropTypes.object.isRequired
}

export default Dashboard