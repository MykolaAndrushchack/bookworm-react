import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Icon } from 'semantic-ui-react';

const AddBook = () => (
	<Card centered>
		<Card.Content textAlign='center'>
			<Card.Header>Add new book</Card.Header>
			<Link to='/books/new'>
				<Icon name='plus circle' size='massive' />
			</Link>
		</Card.Content>
	</Card>
);

export default AddBook;
