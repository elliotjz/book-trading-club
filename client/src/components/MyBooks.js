import React from 'react'
import PropTypes from 'prop-types'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import BookGallery from './BookGallery'
import Divider from 'material-ui/Divider'
import CircularProgress from 'material-ui/CircularProgress';
import Trades from './Trades'

class MyBooks extends React.Component {
  
  addBook(event) {
    event.preventDefault()
    this.props.addBook(event.target.id)
  }

  removeBook(event) {
    event.preventDefault()
    this.props.removeBook(event.target.id)
  }

  render() {
    return (
    	<div id='mybooks-page'>
        <Trades
          user={this.props.user}
          acceptTrade={this.props.acceptTrade}
          cancelTrade={this.props.cancelTrade}
        />
        <div className='divider'>
          <Divider />
        </div>
    		<h3>My Books</h3>
        {this.props.myBooksLoading &&
          <CircularProgress />
        }
        {(this.props.userBooks.length === 0 && !this.props.myBooksLoading) ?
          <div>
            <p>You don't currently have any books. Seach for a book below to add one.</p>
          </div> :
          null
        }
        <BookGallery
          books={this.props.userBooks}
          actionName='Remove'
          onAction={this.removeBook.bind(this)}
          secondaryBtn={true}
        />
        
        <div className='divider'>
          <Divider />
      	</div>

        <h3>Search for a new book</h3>
        <form onSubmit={this.props.bookSearch}>
      		<div className="field-line">
            <TextField
              floatingLabelText="search for a book..."
              name="search"
              onChange={this.props.queryChange}
              value={this.props.query}
            />
            <RaisedButton type="submit" label="Search" primary />
          </div>
        </form>
        {this.props.searchLoading &&
          <CircularProgress />
        }
      	<BookGallery
          books={this.props.searchResults}
          actionName='Add Book'
          onAction={this.addBook.bind(this)}
        />
    	</div>
    )
  }
}

MyBooks.PropTypes = {
	bookSearch: PropTypes.func.isRequired,
	queryChange: PropTypes.func.isRequired,
	query: PropTypes.string.isRequired,
	searchResults: PropTypes.object.isRequired,
  userBooks: PropTypes.object.isRequired,
  addBook: PropTypes.func.isRequired,
  myBooksLoading: PropTypes.bool.isRequired,
  searchLoading: PropTypes.bool.isRequired
}

export default MyBooks

