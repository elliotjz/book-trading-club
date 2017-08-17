import React from 'react'
import PropTypes from 'prop-types'
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import BookGallery from './BookGallery'
import Divider from 'material-ui/Divider';


class MyBooks extends React.Component {
  
  addBook(event) {
    event.preventDefault()
    this.props.onAddBook(event.target.id)
  }

  removeBook(event) {
    event.preventDefault()
    console.log('remove Book')
  }

  render() {
    return (
    	<div id='page'>
    		<h2>My Books</h2>
        {this.props.userBooks.length > 0 ?
          <BookGallery
            books={this.props.userBooks}
            actionName='Remove'
            onAction={this.removeBook.bind(this)}
          /> :
          <div>
            <p>You don't currently have any books. Seach for a book below to add one.</p>
          </div>
        }
        
        <div className='divider'>
          <Divider />
      	</div>
        <form onSubmit={this.props.bookSearch}>
      		<div className="field-line">
            <TextField
              floatingLabelText="Book"
              name="search"
              onChange={this.props.queryChange}
              value={this.props.query}
            />
            <RaisedButton type="submit" label="Search" primary />
          </div>
        </form>
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
  onAddBook: PropTypes.func.isRequired
}

export default MyBooks

