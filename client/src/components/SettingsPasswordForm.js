import React from 'react'
import PropTypes from 'prop-types'
import { Card } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'


class SettingsPasswordForm extends React.Component {

  formClick(e) {
    e.stopPropagation()
  }

  render() {
    return (
      <div className='settings-form' onClick={this.props.closeForm}>
        <Card className="settings-form-card" id='password-change-form' onClick={this.formClick}>
          <form action="/" onSubmit={this.props.onSubmit}>
            <h2 className="card-heading">Change Passwrod</h2>

            <div className="field-line">
              <TextField
                floatingLabelText="Old Password"
                name="oldPassword"
                errorText={this.props.errors.oldPassword}
                onChange={this.props.onChange}
                type='password'
              />
              <TextField
                floatingLabelText="New Password"
                name="newPassword"
                errorText={this.props.errors.newPassword}
                onChange={this.props.onChange}
                type='password'
              />
            </div>

            <div className="button-line">
              <RaisedButton type="submit" label="Change" primary />
            </div>
          </form>
        </Card>
      </div>
    )
  }
}

SettingsPasswordForm.PropTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
}

export default SettingsPasswordForm



