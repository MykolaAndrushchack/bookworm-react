import React from 'react';
import { Form, Grid, Button, Segment, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import InlineError from './InlineError';

class SearchBookForm extends React.Component {
	state = {
		data: {
			goodreadsId: this.props.book.goodreadsId,
			title: this.props.book.title,
			authors: this.props.book.authors,
			cover: this.props.book.covers[0],
			pages: this.props.book.pages
		},
		covers: this.props.covers,
		index: 0,
		loading: false,
		errors: {}
	};

	componentWillReceiveProps(props) {
		this.setState({
			data: {
				goodreadsId: props.book.goodreadsId,
				title: props.book.title,
				authors: props.book.authors,
				cover: props.book.covers[0],
				pages: props.book.pages
			},
			covers: props.covers
		});
	}

	onChange = e =>
		this.setState({
			data: { ...this.state.data, [e.target.name]: e.target.value }
		});

	onChange = e =>
		this.setState({
			data: {
				...this.state.data,
				[e.target.name]: parseInt(e.target.value, 10)
			}
		});

	onSubmit = () => {
		const errors = this.validate(this.state.data);
		this.setState({ errors });
		if (Object.keys(errors).length === 0) {
			this.setState({ loading: true });
			this.props
				.submit(this.state.data)
				.catch(err =>
					this.setState({ errors: err.response.data.errors, loading: false })
				);
		}
	};

	validate = data => {
		const errors = {};
		if (!data.title) errors.title = "Can't be blank";
		if (!data.authors) errors.authors = "Can't be blank";
		if (!data.pages) errors.pages = "Can't be blank";
		return errors;
	};

	changeCover = () => {
		const { index, covers } = this.state;
		const newIndex = index + 1 >= covers.length ? 0 : index + 1;
		this.setState({
			index: newIndex,
			data: { ...this.state.data, cover: covers[newIndex] }
		});
	};

	render() {
		const { data, errors, loading } = this.state;

		return (
			<Segment>
				<Form onSubmit={this.onSubmit} loading={loading}>
					<Grid columns={2} fluid stackable>
						<Grid.Row>
							<Grid.Column>
								<Form.Field error={!!errors.title}>
									<label htmlFor='email'>Book title</label>
									<input
										type='text'
										name='title'
										id='title'
										placeholder='Title'
										value={data.title}
										onChange={this.onChange}
									/>
									{errors.title && <InlineError text={errors.title} />}
								</Form.Field>
								<Form.Field error={!!errors.authors}>
									<label htmlFor='email'>Book author</label>
									<input
										type='text'
										name='authors'
										id='authors'
										placeholder='Authors'
										value={data.authors}
										onChange={this.onChange}
									/>
									{errors.authors && <InlineError text={errors.authors} />}
								</Form.Field>
								<Form.Field error={!!errors.pages}>
									<label htmlFor='email'>Book pages</label>
									<input
										type='number'
										name='pages'
										id='pages'
										value={data.pages}
										onChange={this.onChangeNumber}
									/>
									{errors.pages && <InlineError text={errors.pages} />}
								</Form.Field>
							</Grid.Column>
							<Grid.Column>
								<Image size='small' src={data.cover} />
								{this.state.covers.length > 1 && (
									<a role='button' tabIndex={0} onClick={this.onClick}>
										Another cover
									</a>
								)}
							</Grid.Column>
						</Grid.Row>
						<Grid.Row>
							<Button primary>Save</Button>
						</Grid.Row>
					</Grid>
				</Form>
			</Segment>
		);
	}
}

SearchBookForm.propTypes = {
	submit: PropTypes.func.isRequired,
	book: PropTypes.shape({
		goodreadsId: PropTypes.string.isRequired,
		title: PropTypes.string.isRequired,
		authors: PropTypes.string.isRequired,
		covers: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
		pages: PropTypes.number.isRequired
	}).isRequired
};

export default SearchBookForm;
