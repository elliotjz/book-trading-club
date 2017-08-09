import React from 'react'
import AppBar from 'material-ui/AppBar'
import { DropdownMenu } from './Menu/Menu'
import { FlatMenu } from './Menu/Menu'

class Layout extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      menuLeft: <DropdownMenu />
    }
  }

  updateDimensions() {
    if (document.documentElement.clientWidth >= 700) {
      this.setState({ 
        menuLeft: <FlatMenu />
      })
    } else {
      this.setState({
        menuLeft: <DropdownMenu />
      })
    }
  }

  componentWillMount() {
    this.updateDimensions()
  }

  componentDidMount() {
    window.addEventListener("resize", this.updateDimensions.bind(this))
  }

  render() {
    
    return (
      <div id='app'>
        <AppBar 
          title='Bookaholics Anonymous'
          iconElementRight={this.state.menuLeft}
          showMenuIconButton={false}
          id='app-bar'
        />
        {this.props.children}
      </div>
    );
  }
}

export default Layout
