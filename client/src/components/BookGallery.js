 import React from 'react'
import PropTypes from 'prop-types'
import RaisedButton from 'material-ui/RaisedButton';

const BookGallery = ({
	books,
	actionName,
	onAction,
	secondaryBtn
}) => (
	<div className='book-gallery'>
		{books.length !== 0 ?
			books.map( (item, index) => {
				return (
					<div className='result' key={index}>
						<div className='book-info'>
							<div className='two-line-ellipsis'>
			      		<p><b>{item.title}</b></p>
			      	</div>
							<div className='two-line-ellipsis'>
			      		<p>{item.author}</p>
			      	</div>
			      </div>
		      	{item.thumbnail ?
		      		<img src={item.thumbnail} alt='thumbnail' /> :
		      		<div className='image-placeholder'>
		      			<p>Image not found</p>
		      		</div>
		      	}
		      	{onAction && (
			      	<div className='gallery-action-btn'>
				      	<form onSubmit={onAction} id={index}>
				      		{secondaryBtn ?
				      			<RaisedButton
				      				label={actionName}
				      				type='submit'
				      				secondary
				      			/> :
					      		<RaisedButton
					      			label={actionName}
				      				type='submit'
				      				primary
				      			/>
			      			}
				      	</form>
			      	</div>
			      )}
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
	actionName: PropTypes.string,
	onAction: PropTypes.func,
	buttonStyle: PropTypes.string
}

export default BookGallery

