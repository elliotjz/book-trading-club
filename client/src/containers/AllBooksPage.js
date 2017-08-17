import React from 'react'
import { Redirect } from 'react-router-dom'
import Auth from '../modules/Auth'
import AllBooks from '../components/AllBooks'

class AllBooksPage extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			allBooks: []
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
          allBooks: xhr.response.allBooks
        });
      }
    });
    xhr.send();
  }

  render() {
    return Auth.isUserAuthenticated() ?
    (
      <AllBooks
        allBooks={this.state.allBooks}
      />
    ) :
    (
      <Redirect to="/" push />
    )
  }

}

export default AllBooksPage



