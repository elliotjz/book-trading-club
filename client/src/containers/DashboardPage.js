import React from 'react'
import Dashboard from '../components/Dashboard'

class DashboardPage extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			user: {}
		}
	}

	componentDidMount() {
    let user = JSON.parse(localStorage.getItem('user'))
    if (user !== null) {
      this.setState({
        user
      })
    }
  }
  
	render() {
		return (
			<Dashboard user={this.state.user} />
		)
	}
}

export default DashboardPage