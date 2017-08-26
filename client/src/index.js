
import React from 'react'
import ReactDOM from 'react-dom'
import injectTapEventPlugin from 'react-tap-event-plugin'
import { teal300, darkBlack } from 'material-ui/styles/colors'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { BrowserRouter } from 'react-router-dom'

import App from './App'

import './main.css'

injectTapEventPlugin()

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: teal300,
    textColor: darkBlack,
    alternateTextColor: darkBlack,
  },
})

ReactDOM.render((
  <MuiThemeProvider muiTheme={muiTheme}>
    <BrowserRouter>
    	<App />
    </BrowserRouter>
  </MuiThemeProvider>),
document.getElementById('root'))


