import React from 'react'
import PropTypes from 'prop-types'
import { Card } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'


class SettingsLocationForm extends React.Component {

  formClick(e) {
    e.stopPropagation()
  }

  render() {
    return (
      <div className='settings-form' onClick={this.props.closeForm}>
        <Card className="settings-form-card"  onClick={this.formClick}>
          <form action="/" onSubmit={this.props.onSubmit}>
            <h2 className="card-heading">Change Location</h2>

            {this.props.errors.summary && <p className="error-message">{this.props.errors.summary}</p>}

            <div className="field-line">
              <TextField
                floatingLabelText="Location"
                name="location"
                errorText={this.props.errors.location}
                onChange={this.props.onChange}
                value={this.props.user.location}
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

SettingsLocationForm.PropTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
}

export default SettingsLocationForm



