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
        <Card className="settings-form-card"  onClick={this.formClick}>
          <form action="/" onSubmit={this.props.onSubmit}>
            <h2 className="card-heading">Change Passwrod</h2>

            {this.props.errors.summary && <p className="error-message">{this.props.errors.summary}</p>}

            <div className="field-line">
              <TextField
                floatingLabelText="Old Password"
                name="old-password"
                errorText={this.props.errors.name}
                onChange={this.props.onChange}
                value={this.props.user.name}
              />
              <TextField
                floatingLabelText="New Password"
                name="new-password"
                errorText={this.props.errors.name}
                onChange={this.props.onChange}
                value={this.props.user.name}
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
  user: PropTypes.object.isRequired
}

export default SettingsPasswordForm



