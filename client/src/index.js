
import React from 'react'
import ReactDOM from 'react-dom'
import injectTapEventPlugin from 'react-tap-event-plugin'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { BrowserRouter } from 'react-router-dom'

import App from './App'

import './main.css'

injectTapEventPlugin()

ReactDOM.render((
  <MuiThemeProvider muiTheme={getMuiTheme()}>
    <BrowserRouter>
    	<App />
    </BrowserRouter>
  </MuiThemeProvider>),
document.getElementById('root'))