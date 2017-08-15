import React from 'react'
import PropTypes from 'prop-types'
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router-dom'

const BookGallery = ({ books }) => (
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
			      	<Link to='/addbook'>
			      		<RaisedButton label='Add Book' primary/>
			      	</Link>
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
	books: PropTypes.object.isRequired
}

export default BookGallery