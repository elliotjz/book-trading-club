import React from 'react'
import FlatButton from 'material-ui/FlatButton';
import {Table, TableBody, TableRow, TableRowColumn} from 'material-ui/Table'

class Settings extends React.Component {

	constructor(props) {
		super(props);
		this.changeName = this.changeName.bind(this)
		this.changeLocation = this.changeLocation.bind(this)
		this.changePassword = this.changePassword.bind(this)
	}
	
	changeName() {
		this.props.showNameForm()
	}

	changeLocation() {
		this.props.showLocationForm()
	}

	changePassword() {
		this.props.showPasswordForm()
	}

	render() {

		const locationText = this.props.user.state === '' && this.props.user.city === '' ?
		'Not Set' :
		this.props.user.city + ', ' + this.props.user.state

		return (
			<div id='settings'>
				<Table>
					<TableBody displayRowCheckbox={false}>
						<TableRow>
							<TableRowColumn>Name</TableRowColumn>
							<TableRowColumn>{this.props.user.name}</TableRowColumn>
							<TableRowColumn>
								<FlatButton label='Change Name' onClick={this.changeName} primary/>
							</TableRowColumn>
						</TableRow>
						<TableRow>
							<TableRowColumn>Location</TableRowColumn>
							<TableRowColumn>{locationText}</TableRowColumn>
							<TableRowColumn>
								<FlatButton label='Change Location' onClick={this.changeLocation} primary/>
							</TableRowColumn>
						</TableRow>
						<TableRow>
							<TableRowColumn>Password</TableRowColumn>
							<TableRowColumn></TableRowColumn>
							<TableRowColumn>
								<FlatButton label='Change Password' onClick={this.changePassword} primary/>
							</TableRowColumn>
						</TableRow>
					</TableBody>
				</Table>
			</div>
		)
	}
}

export default Settings