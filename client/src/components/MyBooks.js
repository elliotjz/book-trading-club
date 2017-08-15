import React from 'react'
import PropTypes from 'prop-types'
import { Card, CardTitle } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

const MyBooks = ({
	lookupBook,
	queryChange,
	query,
	results
	}) => (
	<Card>
		<CardTitle
      title="My Books"
    />
  	<form onSubmit={lookupBook}>
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
    	<div id='results-gallery'>
    	{results.length !== 0 ?
    		results.map( (item, index) => {
    			return (
    				<div className='result' key={index}>
			      	<h3>{item.title}</h3>
			      	<p>{item.author}</p>
			      	<img src={item.thumbnail} alt='thumbnail' />
			      </div>
    			) 
    		}) :
		    (
		    	null
		    )
	  	}
	    </div>

  	</form>
	</Card>
)

MyBooks.PropTypes = {
	lookupBook: PropTypes.func.isRequired,
	queryChange: PropTypes.func.isRequired,
	query: PropTypes.string.isRequired,
	results: PropTypes.object.isRequired
}

export default MyBooks