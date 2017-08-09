import React from 'react'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import IconButton from 'material-ui/IconButton'
import MenuIcon from 'material-ui/svg-icons/navigation/menu'
import FlatButton from 'material-ui/FlatButton'
import { Link } from 'react-router'
import Auth from '../modules/Auth';

function getMenuItems() {
	return Auth.isUserAuthenticated() ?
			{
				menuItems: [
					{url: '/', text: 'Dashboard'},
					{url: '/logout', text: 'Logout'}
					
				]
			} :
			{
				menuItems: [
					{url: '/', text: 'Home'},
					{url: '/login', text: 'Login'},
					{url: '/register', text: 'Register'},
				]
			}
}

export class DropdownMenu extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			menuItems: []
		}
	}

	componentWillMount(nextProps, nextState) {
		this.setState(getMenuItems());
	}

	render() {
		return (
			<IconMenu
				iconButtonElement={<IconButton><MenuIcon /></IconButton>}
				anchorOrigin={{horizontal: 'right', vertical: 'top'}}
				targetOrigin={{horizontal: 'right', vertical: 'top'}}
			>
				{this.state.menuItems.map( (item, index) => {
					return (
						<Link to={item.url} key={index} >
							<MenuItem
								primaryText={item.text}
							/>
						</Link>
					)
				})}
			</IconMenu>
		)
	}
}

export class FlatMenu extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			menuItems: []
		}
	}

	componentWillMount(nextProps, nextState) {
		this.setState(getMenuItems());
	}

	render() {
		return (
			<div id='flat-menu-container'>
				{this.state.menuItems.map( (item, index) => {
					return (
						<Link to={item.url} key={index}>
							<FlatButton label={item.text} />
						</Link>
					)
				})}
			</div>
		)
	}
}


