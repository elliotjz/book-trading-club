import React from 'react'
import PropTypes from 'prop-types'
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import BookGallery from './BookGallery'
import Divider from 'material-ui/Divider';


const MyBooks = ({
	bookSearch,
	queryChange,
	query,
	searchResults,
  userBooks
	}) => (
	<div id='page'>
		<h2>My Books</h2>
    {userBooks.length > 0 ?
      <BookGallery books={[]} /> :
      <div>
        <p>You don't currently have any books. Seach for a book below to add one.</p>
      </div>
    }
    
    <div className='divider'>
      <Divider />
  	</div>
    <form onSubmit={bookSearch}>
  		<div className="field-line">
        <TextField
          floatingLabelText="Book"
          name="search"
          //errorText={errors.email}
          onChange={queryChange}
          value={query}
        />
        <RaisedButton type="submit" label="Search" primary />
      </div>
    </form>
  	<BookGallery books={searchResults}/>
	</div>
)

MyBooks.PropTypes = {
	bookSearch: PropTypes.func.isRequired,
	queryChange: PropTypes.func.isRequired,
	query: PropTypes.string.isRequired,
	searchResults: PropTypes.object.isRequired,
  userBooks: PropTypes.object.isRequired
}

export default MyBooks