import React from 'react';
import PropTypes from 'prop-types'
import BookGallery from './BookGallery'


class AllBooks extends React.Component {

	render() {
		console.log(this.props.allBooks)
		return (
			<div id='allbooks-page'>
		    <h1>All Books</h1>
		    {this.props.allBooks && <BookGallery books={this.props.allBooks}/> }
		  </div>
		)
	}
}

AllBooks.PropTypes = {
	allBooks: PropTypes.string.isRequired
}

export default AllBooks;