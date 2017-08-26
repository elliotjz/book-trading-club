import React from 'react'
import { Redirect } from 'react-router-dom'
import Auth from '../modules/Auth'
import AllBooks from '../components/AllBooks'


class AllBooksPage extends React.Component {

	constructor(props) {
		super(props);
    let user = JSON.parse(localStorage.getItem('user'))
		this.state = {
			allBooks: [],
      loading: true,
      user,
      errorMessage: ''
		}

    this.requestTrade = this.requestTrade.bind(this)
    this.acceptTrade = this.acceptTrade.bind(this)
    this.cancelTrade = this.cancelTrade.bind(this)
	}

  requestTrade(id) {

    let email = JSON.parse(localStorage.getItem('user')).email
    let requestData = `email=${email}&bookid=${id}`
    const xhr = new XMLHttpRequest();
    xhr.open('post', '/api/requesttrade');
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    // set the authorization HTTP header
    xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      if (xhr.status === 400) {
        console.log('error message:')
        console.log(xhr.response.message)
        this.setState({
          errorMessage: xhr.response.message
        })
      }

      if (xhr.status === 200) {
        let user = JSON.parse(localStorage.getItem('user'))
        let outgoingTrades = xhr.response.outgoingTrades
        
        user['outgoingTrades'] = outgoingTrades
        this.setState({
          user,
          errorMessage: ''
        })
        localStorage.setItem('user', JSON.stringify(user))
      }
    });
    xhr.send(requestData);
  }

  acceptTrade(id) {
    const xhr = new XMLHttpRequest();
    let email = JSON.parse(localStorage.getItem('user')).email
    let requestData = `email=${email}&bookid=${id}`
    xhr.open('post', '/api/accepttrade');
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    // set the authorization HTTP header
    xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        console.log('success')
        console.log('incomingTrades from server:')
        console.log(xhr.response.incomingTrades)
        console.log('')
        let user = this.state.user
        user['incomingTrades'] = xhr.response.incomingTrades
        localStorage.setItem('user', JSON.stringify(user))
        this.setState({
          user
        })
      }
    });
    xhr.send(requestData);

  }

  cancelTrade(id, isIncomingTrade) {
    const xhr = new XMLHttpRequest();
    let email = this.state.user.email
    let requestData = `email=${email}&bookid=${id}&isIncomingTrade=${isIncomingTrade}`
    xhr.open('post', '/api/canceltrade');
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    // set the authorization HTTP header
    xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {

      if (xhr.status === 200) {

        let user = this.state.user

        if (isIncomingTrade) {
          console.log('response:')
          console.log(xhr.response.incomingTrades)
          user['incomingTrades'] = xhr.response.incomingTrades
          localStorage.setItem('user', JSON.stringify(user))
          this.setState({
            user
          })
        } else {
          console.log('response:')
          console.log(xhr.response.outgoingTrades)
          user['outgoingTrades'] = xhr.response.outgoingTrades
          localStorage.setItem('user', JSON.stringify(user))
          this.setState({
            user
          })
        }
        
      }
    });
    xhr.send(requestData);
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
          allBooks: xhr.response.allBooks,
          loading: false
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
        requestTrade={this.requestTrade}
        acceptTrade={this.acceptTrade}
        cancelTrade={this.cancelTrade}
        loading={this.state.loading}
        user={this.state.user}
        errorMessage={this.state.errorMessage}
      />
    ) :
    (
      <Redirect to="/" push />
    )
  }

}

export default AllBooksPage



