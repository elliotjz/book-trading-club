import React from 'react'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import IconButton from 'material-ui/IconButton'
import MenuIcon from 'material-ui/svg-icons/navigation/menu'
import FlatButton from 'material-ui/FlatButton'
import { Link } from 'react-router-dom'

class Menu extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			wideScreen: false,
			open: false
		}

		this.handleClose = this.handleClose.bind(this)
	}

	isWideScreen() {
    return document.documentElement.clientWidth > 830
  }

  getMenuItems() {
		return this.props.auth ?
			[
				{url: '/', text: 'Dashboard'},
				{url: '/allbooks', text: 'All Books'},
				{url: '/mybooks', text: 'My Books'},
				{url: '/settings', text: 'Settings'},
				{url: '/logout', text: 'Logout'}
			] :
			[
				{url: '/', text: 'Home'},
				{url: '/login', text: 'Login'},
				{url: '/register', text: 'Register'},
			]
	}

	handleClose() {
		this.setState({
			open: false
		})
	}

  componentDidMount() {
  	this.setState({
			wideScreen: this.isWideScreen()
		});
    window.addEventListener("resize", () => {
    	this.setState({ wideScreen: this.isWideScreen() })
    })
  }

	render() {
		let menuItems = this.getMenuItems()
		return this.state.wideScreen ?
		(
			<div id='flat-menu-container'>
				{menuItems.map( (item, index) => {
					return (
						<Link to={item.url} key={index}>
							<FlatButton label={item.text} />
						</Link>
					)
				})}
			</div>
		) :
		(
			<IconMenu
				iconButtonElement={<IconButton><MenuIcon/></IconButton>}
				anchorOrigin={{horizontal: 'right', vertical: 'top'}}
				targetOrigin={{horizontal: 'right', vertical: 'top'}}
				onRequestChange={open => this.setState({ open })}
				open={this.state.open}
			>
				{menuItems.map( (item, index) => {
					return (
						<Link to={item.url} key={index} >
							<MenuItem
								primaryText={item.text}
								onTouchTap={this.handleClose}
							/>
						</Link>
					)
				})}
			</IconMenu>
		)
	}
}

export default Menu
