import React, { PropTypes } from 'react';
import AppBar from 'material-ui/AppBar'
import Menu from './Menu'
import Auth from '../modules/Auth';


class Layout extends React.Component {

  render() {
    return (
      <div>
        <AppBar
          title='Bookaholics Anonymous'
          iconElementRight={<Menu auth={Auth.isUserAuthenticated()}/>}
          showMenuIconButton={false}
          id='app-bar'
        />

        {this.props.children}

      </div>
    )
  }
  
}

Layout.propTypes = {
  children: PropTypes.object.isRequired
};

export default Layout;