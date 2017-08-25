import React from 'react'
import PropTypes from 'prop-types'
import { Card } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'


class SettingsNameForm extends React.Component {

  formClick(e) {
    e.stopPropagation()
  }

  render() {
    return (
      <div className='settings-form' onClick={this.props.closeForm}>
        <Card className="settings-form-card"  onClick={this.formClick}>
          <form action="/" onSubmit={this.props.onSubmit}>
            <h2 className="card-heading">Change Name</h2>

            <div className="field-line">
              <TextField
                floatingLabelText="Name"
                name="name"
                errorText={this.props.error}
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

SettingsNameForm.PropTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
}

export default SettingsNameForm



