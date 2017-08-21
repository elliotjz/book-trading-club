import React from 'react';
import SettingsNameForm from '../components/SettingsNameForm'
import SettingsLocationForm from '../components/SettingsLocationForm'
import SettingsPasswordForm from '../components/SettingsPasswordForm'
import Settings from '../components/Settings'

class SettingsPage extends React.Component {

  constructor(props, context) {
    super(props, context);

    // set the initial component state
    this.state = {
      errors: {},
      user: {
        email: '',
        name: '',
        location: ''
      },
      showNameForm: false,
      showLocationForm: false,
      showPasswordForm: false
    };

    this.processForm = this.processForm.bind(this);
    this.toggleNameForm = this.toggleNameForm.bind(this);
    this.toggleLocationForm = this.toggleLocationForm.bind(this);
    this.togglePasswordForm = this.togglePasswordForm.bind(this);
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

  processForm(event) {
    // prevent default action. in this case, action is the form submission event
    event.preventDefault();

    // create a string for an HTTP body message
    const name = encodeURIComponent(this.state.user.name);
    const email = encodeURIComponent(this.state.user.email);
    const password = encodeURIComponent(this.state.user.password);
    const formData = `name=${name}&email=${email}&password=${password}`;

    // create an AJAX request
    const xhr = new XMLHttpRequest();
    xhr.open('post', '/auth/register');
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {

        // change the component-container state
        this.setState({
          errors: {}
        });

        // set a message
        localStorage.setItem('successMessage', xhr.response.message);

        // make a redirect
        this.setState({
          successfulRegistration: true
        })
      } else {

        const errors = xhr.response.errors ? xhr.response.errors : {};
        errors.summary = xhr.response.message;

        this.setState({
          errors
        });
      }
    });
    xhr.send(formData);
  }

  changeUser(event) {
    const field = event.target.name;
    const user = this.state.user;
    user[field] = event.target.value;

    this.setState({
      user
    });
  }

  getUserData() {
  	this.setState({
  		user: JSON.parse(localStorage.getItem('user'))
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
		        onSubmit={this.processForm}
		        onChange={this.changeUser}
		        errors={this.state.errors}
		        user={this.state.user}
		        closeForm={this.toggleNameForm}
		      /> :
		      null
    		}
    		{this.state.showLocationForm ?
    			<SettingsLocationForm
		        onSubmit={this.processForm}
		        onChange={this.changeUser}
		        errors={this.state.errors}
		        user={this.state.user}
		        closeForm={this.toggleLocationForm}
		      /> :
		      null
    		}
    		{this.state.showPasswordForm ?
    			<SettingsPasswordForm
		        onSubmit={this.processForm}
		        onChange={this.changeUser}
		        errors={this.state.errors}
		        user={this.state.user}
		        closeForm={this.togglePasswordForm}
		      /> :
		      null
    		}
    	</div>
    )
  }

}

export default SettingsPage;



