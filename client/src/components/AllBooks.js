import React from 'react';
import PropTypes from 'prop-types'
import { Card, CardTitle, CardText } from 'material-ui/Card';


const AllBooks = ({ secretData }) => (
  <Card className="container">
    <CardTitle
      title="All Books"
      subtitle="You should get access to this page only after authentication."
    />

    {secretData && <CardText style={{ fontSize: '16px', color: 'green' }}>{secretData}</CardText>}
  </Card>
)

AllBooks.PropTypes = {
	secretData: PropTypes.string.isRequired
}

export default AllBooks;