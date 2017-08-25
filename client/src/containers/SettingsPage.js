import React from 'react'
import SettingsNameForm from '../components/SettingsNameForm'
import SettingsLocationForm from '../components/SettingsLocationForm'
import SettingsPasswordForm from '../components/SettingsPasswordForm'
import Settings from '../components/Settings'

class SettingsPage extends React.Component {

  constructor(props, context) {
    super(props, context)

    this.state = {
      errors: {},
      user: {
        email: '',
        name: '',
        state: '',
        city: ''
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
    // Deleting data from userOnForm if form is closed
    if (this.state.showNameForm) {
      this.setState({
        userOnForm: {
          name: this.state.user.name,
          email: this.state.user.email,
          city: this.state.user.city,
          state: this.state.user.state
        },
        showNameForm: false
      })
    } else {
    	this.setState({
    		showNameForm: true
    	})
    }
  }

  toggleLocationForm() {
    if (this.state.showLocationForm) {
      this.setState({
        userOnForm: {
          name: this.state.user.name,
          email: this.state.user.email,
          city: this.state.user.city,
          state: this.state.user.state,
        },
        showLocationForm: false
      })
    } else {
      this.setState({
        showLocationForm: true
      })
    }
  }

  togglePasswordForm() {
  	this.setState({
  		showPasswordForm: !this.state.showPasswordForm
  	})
  }

  processPasswordChange(event) {
    event.preventDefault()
    const email = encodeURIComponent(this.state.user.email)

    const oldPassword = this.state.userOnForm.oldPassword ?
      encodeURIComponent(this.state.userOnForm.oldPassword) :
      ''

    const newPassword = this.state.userOnForm.newPassword ?
      encodeURIComponent(this.state.userOnForm.newPassword) :
      ''

    const formData = `email=${email}&oldPassword=${oldPassword}&newPassword=${newPassword}`

    const xhr = new XMLHttpRequest();
    xhr.open('post', '/auth/changepassword');
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {

        this.setState({
          errors: {},
          showPasswordForm: false
        });
        
      } else {
        const errors = xhr.response.errors ? xhr.response.errors : {};

        this.setState({
          errors
        })
      }
    })
    xhr.send(formData);
  }

  processNameChange(event) {
    event.preventDefault()
    const name = encodeURIComponent(this.state.userOnForm.name)
    const email = encodeURIComponent(this.state.user.email)
    const formData = `name=${name}&email=${email}`
    this.makeXmlRequest(formData)
  }

  processLocationChange(event) {
    event.preventDefault()
    const email = encodeURIComponent(this.state.user.email)
    const state = encodeURIComponent(this.state.userOnForm.state)
    const city = encodeURIComponent(this.state.userOnForm.city)
    const formData = `state=${state}&city=${city}&email=${email}`
    this.makeXmlRequest(formData)
  }

  makeXmlRequest(formData) {
    const xhr = new XMLHttpRequest()
    xhr.open('post', '/auth/changeuserdata')
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
    xhr.responseType = 'json'
    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        this.setState({
          errors: {},
          showNameForm: false,
          showLocationForm: false,
          user: {
            email: this.state.userOnForm.email,
            name: this.state.userOnForm.name,
            city: this.state.userOnForm.city,
            state: this.state.userOnForm.state
          },
        })

        localStorage.setItem('user', JSON.stringify(this.state.userOnForm))

      } else {
        const errors = xhr.response.errors ? xhr.response.errors : {}
        console.log('error: ' + errors)
        this.setState({
          errors: {
            errors
          }
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
		        errors={this.state.errors}
		        user={this.state.userOnForm}
		        closeForm={this.toggleNameForm}
		      /> :
		      null
    		}
    		{this.state.showLocationForm ?
    			<SettingsLocationForm
		        onSubmit={this.processLocationChange}
		        onChange={this.changeUser}
		        errors={this.state.errors}
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
		        closeForm={this.togglePasswordForm}
		      /> :
		      null
    		}
    	</div>
    )
  }

}

export default SettingsPage



