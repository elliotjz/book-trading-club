import React from 'react'
import AppBar from 'material-ui/AppBar'
import Menu from './components/Menu'
import Auth from './modules/Auth'


const Header = () => (
  <div>
    <AppBar
      title='Bookaholics Anonymous'
      iconElementRight={<Menu auth={Auth.isUserAuthenticated()}/>}
      showMenuIconButton={false}
      id='app-bar'
    />
  </div>
)

export default Header