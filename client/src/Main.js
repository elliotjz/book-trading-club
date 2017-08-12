import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './components/Home'
import DashboardPage from './containers/DashboardPage'
import LoginPage from './containers/LoginPage'
import RegisterPage from './containers/RegisterPage'
import AllBooksPage from './containers/AllBooksPage'
import MyBooksPage from './containers/MyBooksPage'
import SettingsPage from './containers/SettingsPage'
import Logout from './components/Logout'
import Auth from './modules/Auth';


const Main = () => (
	<div>
		<Switch>
			<Route exact path='/' render={() => {
				return Auth.isUserAuthenticated() ?
				(
					<DashboardPage />
				) :
				(
					<Home />
				)
			}} />
			<Route path='/allbooks' component={AllBooksPage}/>
			<Route path='/mybooks' component={MyBooksPage}/>
			<Route path='/login' component={LoginPage}/>
			<Route path='/register' component={RegisterPage}/>
			<Route path='/settings' component={SettingsPage}/>
			<Route path='/logout' component={Logout}/>
		</Switch>
	</div>
)

export default Main