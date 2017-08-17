import React from 'react'
import { Redirect } from 'react-router-dom'
import Auth from '../modules/Auth'
import AllBooks from '../components/AllBooks'

class AllBooksPage extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			secretData: ''
		}
	}

	componentDidMount() {
    const xhr = new XMLHttpRequest();
    xhr.open('get', '/api/allbooks');
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    // set the authorization HTTP header
    xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        this.setState({
          secretData: xhr.response.message
        });
      }
    });
    xhr.send();
  }

  render() {
    return Auth.isUserAuthenticated() ?
    (
      <AllBooks
        secretData={this.state.secretData}
        onAddBook={this.addBook}
      />
    ) :
    (
      <Redirect to="/" push />
    )
  }

}

export default AllBooksPage



