import React from 'react'
import { Redirect } from 'react-router-dom'
import $ from 'jquery'
import MyBooks from '../components/MyBooks'
import Auth from '../modules/Auth'


class MyBooksPage extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			query: '',
			message: '',
			searchResults: [],
      userBooks: [],
      loading: false
		}

		this.bookSearch = this.bookSearch.bind(this)
		this.queryChange = this.queryChange.bind(this)
    this.addBook = this.addBook.bind(this)
	}

	bookSearch(event) {
    event.preventDefault()

    // Get query from form
    const query = encodeURIComponent(this.state.query)
		
    // AXAJ request
    $.ajax({
    	url: 'https://www.googleapis.com/books/v1/volumes?q=' + query,
    	type: 'GET',
    	success: (data) => {
    		let searchResults = []
    		let title
    		let author
    		let thumbnail
    		for (let i = 0; i < 20; i++) {
    			if (data.items[i] && data.items[i].volumeInfo && data.items[i].volumeInfo.authors) {
    				title = data.items[i].volumeInfo.title
	    			author = data.items[i].volumeInfo.authors[0]
	    			thumbnail = data.items[i].volumeInfo.imageLinks ? data.items[i].volumeInfo.imageLinks.thumbnail : null
	    			searchResults.push({ title, author, thumbnail })
    			}
    			
    		}
    		
    		this.setState({
    			searchResults
    		})
    	},
    	error: (xhr,status,error) => {
    		console.log('ERROR!')
    		console.log('status:')
    		console.log(xhr.status)
    		console.log('err message:')
    		console.log(error)
    	}
    })
	}

	queryChange(event) {
		let query = event.target.value
		this.setState({
			query
		})
	}

  addBook(bookId) {
    const xhr = new XMLHttpRequest();
    xhr.open('post', '/api/addbook');
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    // set the authorization HTTP header
    xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`)
    const email = JSON.parse(localStorage.getItem('user')).email
    xhr.setRequestHeader('email', email)
    const book = this.state.searchResults[bookId]
    xhr.setRequestHeader('book', JSON.stringify(book))
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      console.log('xhr.response.user:')
      console.log(xhr.response.userData)
      if (xhr.status === 200) {
        localStorage.setItem('user', JSON.stringify(xhr.response.userData))
        this.setState({
          userBooks: xhr.response.userData.books
        })
      }
    });
    xhr.send();
  }

  componentDidMount() {
    this.setState({
      userBooks: JSON.parse(localStorage.getItem('user')).books
    })
  }

  render() {
  	return Auth.isUserAuthenticated() ?
    (
      <MyBooks
      	bookSearch={this.bookSearch}
      	queryChange={this.queryChange}
      	query={this.state.query}
      	searchResults={this.state.searchResults}
        userBooks={this.state.userBooks}
        onAddBook={this.addBook}
      />
    ) :
    (
      <Redirect to="/" push />
    )
  }

}

export default MyBooksPage