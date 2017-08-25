import React from 'react';
import PropTypes from 'prop-types'
import BookGallery from './BookGallery'
import CircularProgress from 'material-ui/CircularProgress';


class AllBooks extends React.Component {

	requestTrade(event) {
		event.preventDefault()
		this.props.requestTrade(event.target.id)
	}

	render() {
		return (
			<div id='allbooks-page'>
		    <h1>All Books</h1>
		    {this.props.loading &&
		    	<CircularProgress />
		    }
		    {this.props.allBooks &&
		    	<BookGallery
		    		books={this.props.allBooks}
		    		onAction={this.requestTrade.bind(this)}
		    		actionName='Request Trade'
		    	/>
		    }
		  </div>
		)
	}
}

AllBooks.PropTypes = {
	allBooks: PropTypes.string.isRequired
}

export default AllBooks;