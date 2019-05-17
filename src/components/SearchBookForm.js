import React from 'react';
import axios from 'axios';
import { Form, Dropdown } from 'semantic-ui-react';
import PropTypes from 'prop-types';

class SearchBookForm extends React.Component {
	state = {
		query: '',
		loading: false,
		options: [],
		books: {}
	};

	onChange = (e, data) => {
		this.setState({ query: data.value })
		this.props.onBookSelect(this.state.book[data.value])
	}

	onSearchChange = (e, data) => {
		clearTimeout(this.timer);
		this.setState({
			query: data
		});
		this.timer = setTimeout(this.fetchOptions, 1000);
	};

	fetchOptions = () => {
		if (!this.state.query) return;
		this.setState({ loading: true });
		axios
			.get(`/api/books/search?q=${this.state.query}`)
			.then(res => res.data.books)
			.then(books => {
				const options = [];
				const bookHash = {};
				books.forEach(book => {
					bookHash[book.goodreadsId] = book;
					options.push({
						key: book.goodreadsId,
						value: book.goodreadsId,
						text: book.title
					});
				});
				this.setState({ loading: false, options, book: bookHash });
			});
	};

	render() {
		const { query, options, loading } = this.state;
		return (
			<Form>
				<Dropdown
					search
					fluid
					placeholder='Search a book by title'
					value={query}
					onSearchChange={this.onSearchChange}
					options={options}
					loading={loading}
					onChange={this.onChange}
				/>
			</Form>
		);
	}
}

SearchBookForm.propTypes = {
	onBookSelect: PropTypes.func.isRequired
};

export default SearchBookForm;
