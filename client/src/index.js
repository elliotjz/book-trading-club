// src/index.js
import React from 'react'
import ReactDOM from 'react-dom'
import injectTapEventPlugin from 'react-tap-event-plugin'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { browserHistory, Router } from 'react-router'

import Routes from './routes'

import './main.css'

injectTapEventPlugin()

ReactDOM.render((
  <MuiThemeProvider muiTheme={getMuiTheme()}>
    <Router history={browserHistory} routes={Routes} />
  </MuiThemeProvider>),
document.getElementById('root'))