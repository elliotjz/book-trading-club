import React from 'react'
import SettingsNameForm from '../components/SettingsNameForm'
import SettingsLocationForm from '../components/SettingsLocationForm'
import SettingsPasswordForm from '../components/SettingsPasswordForm'
import Settings from '../components/Settings'

class SettingsPage extends React.Component {

  constructor(props, context) {
    super(props, context)

    // set the initial component state
    this.state = {
      errors: {},
      user: {
        email: '',
        name: '',
        location: ''
      },
      userOnForm: {},
      showNameForm: false,
      showLocationForm: false,
      showPasswordForm: false
    }

    this.processPasswordChange = this.processPasswordChange.bind(this)
    this.processNameChange = this.processNameChange.bind(this)
    this.processLocationChange = this.processLocationChange.bind(this)
    this.toggleNameForm = this.toggleNameForm.bind(this)
    this.toggleLocationForm = this.toggleLocationForm.bind(this)
    this.togglePasswordForm = this.togglePasswordForm.bind(this)
    this.changeUser = this.changeUser.bind(this)
  }

  toggleNameForm() {
  	this.setState({
  		showNameForm: !this.state.showNameForm
  	})
  }

  toggleLocationForm() {
  	this.setState({
  		showLocationForm: !this.state.showLocationForm
  	})
  }

  togglePasswordForm() {
  	this.setState({
  		showPasswordForm: !this.state.showPasswordForm
  	})
  }

  processPasswordChange(event) {
    console.log('changing password')
  }

  processNameChange(event) {
    event.preventDefault()
    console.log('processing name change')
    const name = encodeURIComponent(this.state.userOnForm.name)
    const email = encodeURIComponent(this.state.user.email)
    const formData = `name=${name}&email=${email}`
    this.makeXmlRequest(formData)
  }

  processLocationChange(event) {
    event.preventDefault()
    console.log('processing location change')
    const email = encodeURIComponent(this.state.user.email)
    const location = encodeURIComponent(this.state.userOnForm.location)
    const formData = `location=${location}&email=${email}`
    this.makeXmlRequest(formData)
  }

  makeXmlRequest(formData) {
    const xhr = new XMLHttpRequest()
    xhr.open('post', '/auth/changeuserdata')
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
    xhr.responseType = 'json'
    xhr.addEventListener('load', () => {
      console.log('loaded')
      if (xhr.status === 200) {
        // change the component-container state
        this.setState({
          errors: {},
          showNameForm: false,
          showLocationForm: false,
          user: {
            email: this.state.userOnForm.email,
            name: this.state.userOnForm.name,
            location: this.state.userOnForm.location
          },
        })

        // set a message
        localStorage.setItem('successMessage', xhr.response.message)

      } else {
        console.log('status is not 200')
        const error = xhr.response.error ? xhr.response.error : ''
        console.log('error: ' + error)
        this.setState({
          error
        })
      }
    })
    xhr.send(formData)
  }

  changeUser(event) {
    const field = event.target.name
    const userOnForm = this.state.userOnForm
    userOnForm[field] = event.target.value
    this.setState({
      userOnForm
    })
  }

  getUserData() {
  	this.setState({
  		user: JSON.parse(localStorage.getItem('user')),
      userOnForm: JSON.parse(localStorage.getItem('user'))
  	})
  }

  componentWillMount() {
  	this.getUserData()
  }

  render() {
    return (
    	<div>
    		<Settings
    			user={this.state.user}
    			showNameForm={this.toggleNameForm}
    			showLocationForm={this.toggleLocationForm}
    			showPasswordForm={this.togglePasswordForm}
    		/>
    		{this.state.showNameForm ?
    			<SettingsNameForm
		        onSubmit={this.processNameChange}
		        onChange={this.changeUser}
		        error={this.state.error}
		        user={this.state.userOnForm}
		        closeForm={this.toggleNameForm}
		      /> :
		      null
    		}
    		{this.state.showLocationForm ?
    			<SettingsLocationForm
		        onSubmit={this.processLocationChange}
		        onChange={this.changeUser}
		        error={this.state.error}
		        user={this.state.userOnForm}
		        closeForm={this.toggleLocationForm}
		      /> :
		      null
    		}
    		{this.state.showPasswordForm ?
    			<SettingsPasswordForm
		        onSubmit={this.processPasswordChange}
		        onChange={this.changeUser}
		        errors={this.state.errors}
		        user={this.state.userOnForm}
		        closeForm={this.togglePasswordForm}
		      /> :
		      null
    		}
    	</div>
    )
  }

}

export default SettingsPage



