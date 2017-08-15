import React from 'react'
import Dashboard from '../components/Dashboard'
import Auth from '../modules/Auth'

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
    /*
    const xhr = new XMLHttpRequest();
    xhr.open('get', '/api/dashboard');
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    // set the authorization HTTP header
    xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        this.setState({
          user: xhr.response.user
        });
      }
    });
    xhr.send();*/
  }
  
	render() {
		return (
			<Dashboard user={this.state.user} />
		)
	}
}

export default DashboardPage