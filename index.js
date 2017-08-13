'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const passport = require('passport')
const path = require('path')

const app = express()

//Connect to DB
require('./server/models').connect(process.env.MLAB_URL);

// Priority serve any static files.
app.use(express.static(path.resolve(__dirname, 'client/build')))

app.use(bodyParser.urlencoded({ extended: false }));

// passport middleware
app.use(passport.initialize());

// load passport strategies
const localRegisterStrategy = require('./server/passport/local-register');
const localLoginStrategy = require('./server/passport/local-login');
passport.use('local-register', localRegisterStrategy);
passport.use('local-login', localLoginStrategy);

// pass the authenticaion checker middleware
const authCheckMiddleware = require('./server/middleware/auth-check');
app.use('/api', authCheckMiddleware);

// routes
const authRoutes = require('./server/routes/auth');
const apiRoutes = require('./server/routes/api');
app.use('/auth', authRoutes);
app.use('/api', apiRoutes);

app.get('*', function(request, response) {
  response.sendFile(path.resolve(__dirname, './client/build', 'index.html'));
});

//Listen to port
const PORT = process.env.PORT || 5000
app.listen(PORT, function () {
  console.log(`Listening on port ${PORT}`)
})
