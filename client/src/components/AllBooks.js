import React from 'react'
import PropTypes from 'prop-types'
import BookGallery from './BookGallery'
import CircularProgress from 'material-ui/CircularProgress'
import Trades from './Trades'
import Divider from 'material-ui/Divider'

class AllBooks extends React.Component {

	requestTrade(event) {
		event.preventDefault()
		this.props.requestTrade(event.target.id)
	}

	render() {
		return (
			<div id='allbooks-page'>
				<Trades
					user={this.props.user}
					acceptTrade={this.props.acceptTrade}
					cancelTrade={this.props.cancelTrade}
				/>
		    <div className='divider'>
          <Divider />
      	</div>
		    <h3>All Books</h3>
		    
		    {this.props.loading &&
		    	<CircularProgress />
		    }
		    {this.props.errorMessage !== '' &&
		    	<p className='error-message'>{this.props.errorMessage}</p>
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
	allBooks: PropTypes.string.isRequired,
  requestTrade: PropTypes.func.isRequired,
  acceptTrade: PropTypes.func.isRequired,
  cancelTrade: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
  errorMessage: PropTypes.string.isRequired
}

export default AllBooks

