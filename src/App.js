import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import DashboardPage from './components/DashboardPage';
import ConfirmationPage from './components/ConfirmationPage';
import UserRoute from './components/routes/UserRoute';
import GuestRoute from './components/routes/GuestRoute';

const App = ({ location }) => (
	<div className='ui container'>
		<Route location={location} path='/' exact component={HomePage} />
		<Route
			location={location}
			path='/confirmation/:token'
			exact
			component={ConfirmationPage}
		/>
		<GuestRoute location={location} path='/login' exact component={LoginPage} />
		<GuestRoute
			location={location}
			path='/signup'
			exact
			component={SignupPage}
		/>
		<UserRoute
			location={location}
			path='/dashboard'
			component={DashboardPage}
			exact
		/>
	</div>
);

App.propTypes = {
	location: PropTypes.shape({
		pathname: PropTypes.string.isRequired
	}).isRequired
};

export default App;
