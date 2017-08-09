import React from 'react'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import IconButton from 'material-ui/IconButton'
import MenuIcon from 'material-ui/svg-icons/navigation/menu'
import FlatButton from 'material-ui/FlatButton'
import { Link } from 'react-router'

class Menu extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			wideScreen: false
		}
	}

	isWideScreen() {
    return document.documentElement.clientWidth > 700
  }

  getMenuItems() {
		return this.props.auth ?
			[
				{url: '/', text: 'Dashboard'},
				{url: '/logout', text: 'Logout'}
			] :
			[
				{url: '/', text: 'Home'},
				{url: '/login', text: 'Login'},
				{url: '/register', text: 'Register'},
			]
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
				iconButtonElement={<IconButton><MenuIcon /></IconButton>}
				anchorOrigin={{horizontal: 'right', vertical: 'top'}}
				targetOrigin={{horizontal: 'right', vertical: 'top'}}
			>
				{menuItems.map( (item, index) => {
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

export default Menu