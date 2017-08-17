 import React from 'react'
import PropTypes from 'prop-types'
import RaisedButton from 'material-ui/RaisedButton';

const BookGallery = ({
	books,
	actionName,
	onAction
}) => (
	<div id='book-gallery'>
		{books.length !== 0 ?
			books.map( (item, index) => {
				return (
					<div className='result' key={index}>

		      	<h3>{item.title}</h3>
		      	<p>{item.author}</p>
		      	{item.thumbnail ?
		      		<img src={item.thumbnail} alt='thumbnail' /> :
		      		<div className='image-placeholder'>
		      			<p>Image not found</p>
		      		</div>
		      	}
		      	<div className='add-book-btn'>
			      	<form onSubmit={onAction} id={index}>
			      		<RaisedButton
			      			label={actionName}
		      				type='submit'
		      				primary
		      			/>
			      	</form>
		      	</div>
		      </div>
				) 
			}) :
	    (
	    	null
	    )
		}
	</div>
)

BookGallery.PropTypes = {
	books: PropTypes.object.isRequired,
	actionName: PropTypes.string.isRequired,
	onAction: PropTypes.func.isRequired
}

export default BookGallery

