import React, { PropTypes } from 'react';
import AppBar from 'material-ui/AppBar'
import { DropdownMenu, FlatMenu } from './Menu'


const Layout = ({ children }) => (
  <div>
    <AppBar
      title='Bookaholics Anonymous'
      iconElementRight={
        document.documentElement.clientWidth > 700 ?
        <FlatMenu /> :
        <DropdownMenu />
      }
      showMenuIconButton={false}
      id='app-bar'
    />

    {children}

  </div>
);

Layout.propTypes = {
  children: PropTypes.object.isRequired
};

export default Layout;