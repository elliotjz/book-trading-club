'use strict'

const express = require('express')
const validator = require('validator')
const passport = require('passport')
const User = require('mongoose').model('User')
const router = new express.Router()

function validateRegisterForm(payload) {
  const errors = {}
  let isFormValid = true
  let message = ''

  if (!payload || typeof payload.email !== 'string' || !validator.isEmail(payload.email)) {
    isFormValid = false
    errors.email = 'Please provide a correct email address.'
  }

  if (!payload || typeof payload.password !== 'string' || payload.password.trim().length < 8) {
    isFormValid = false
    errors.password = 'Password must have at least 8 characters.'
  }

  if (!payload || typeof payload.name !== 'string' || payload.name.trim().length === 0) {
    isFormValid = false
    errors.name = 'Please provide your name.'
  }

  if (!isFormValid) {
    message = 'Check the form for errors.'
  }

  return {
    success: isFormValid,
    message,
    errors
  }
}

function validateLoginForm(payload) {
  const errors = {}
  let isFormValid = true
  let message = ''

  if (!payload || typeof payload.email !== 'string' || payload.email.trim().length === 0) {
    isFormValid = false
    errors.email = 'Please provide your email address.'
  }

  if (!payload || typeof payload.password !== 'string' || payload.password.trim().length === 0) {
    isFormValid = false
    errors.password = 'Please provide your password.'
  }

  if (!isFormValid) {
    message = 'Check the form for errors.'
  }

  return {
    success: isFormValid,
    message,
    errors
  }
}

function validateChangeUserName(name) {
  let errors = {}
  let isFormValid = true
  let message = ''

  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    isFormValid = false
    errors['name'] = 'Please enter something'
  }

  return {
    success: isFormValid,
    errors
  }
}

function validatePasswordChange(payload) {
  const errors = {}
  let isFormValid = true
  let message = ''

  if (!payload || typeof payload.oldPassword !== 'string' || payload.oldPassword.trim().length === 0) {
    isFormValid = false
    errors.oldPassword = 'Please provide your old password.'
  }

  if (!payload || typeof payload.newPassword !== 'string' || payload.newPassword.trim().length === 0) {
    isFormValid = false
    errors.newPassword = 'Please provide a new password.'
  }

  return {
    success: isFormValid,
    errors
  }
}

router.post('/register', (req, res, next) => {

  const validationResult = validateRegisterForm(req.body)
  if (!validationResult.success) {
    return res.status(400).json({
      success: false,
      message: validationResult.message,
      errors: validationResult.errors
    })
  }


  return passport.authenticate('local-register', (err) => {
    if (err) {
      if (err.name === 'MongoError' && err.code === 11000) {
        // the 11000 Mongo code is for a duplication email error
        // the 409 HTTP status code is for conflict error
        return res.status(409).json({
          success: false,
          message: 'Check the form for errors.',
          errors: {
            email: 'This email is already taken.'
          }
        })
      }

      return res.status(400).json({
        success: false,
        message: 'Could not process the form.'
      })
    }

    return res.status(200).json({
      success: true,
      message: 'You have successfully registered! Now you should be able to log in.'
    })
  })(req, res, next)
})

router.post('/login', (req, res, next) => {
  const validationResult = validateLoginForm(req.body)
  if (!validationResult.success) {
    return res.status(400).json({
      success: false,
      message: validationResult.message,
      errors: validationResult.errors
    })
  }


  return passport.authenticate('local-login', (err, token, userData) => {
    if (err) {
      if (err.name === 'IncorrectCredentialsError') {
        return res.status(400).json({
          success: false,
          message: err.message
        })
      }

      return res.status(400).json({
        success: false,
        message: 'Could not process the form.'
      })
    }

    return res.json({
      success: true,
      message: 'You have successfully logged in!',
      token,
      user: userData
    })
  })(req, res, next)
})

router.post('/changeuserdata', (req, res, next) => {
  const nameChange = req.body.name || req.body.name === ''
  if (nameChange) {

    const validationResult = validateChangeUserName(req.body.name)

    if (!validationResult.success) {
      return res.status(400).json({
        success: false,
        errors: validationResult.error
      })
    }

    User.update({ email: req.body.email }, {
      $set: {
        name: req.body.name
      }
    }, (err) => {
      if (err) throw err
    })
  } else {
    User.update({ email: req.body.email }, {
      $set: {
        state: req.body.state,
        city: req.body.city
      }
    }, (err) => {
      if (err) throw err
    })
  }

  res.status(200).json({
    success: true,
  })
})

router.post('/changepassword', (req, res, next) => {
  const validationResult = validatePasswordChange(req.body)

  if (!validationResult.success) {
    return res.status(400).json({
      success: false,
      errors: validationResult.errors
    })
  }

  User.findOne({ email: req.body.email }, (err, user) => {
    return user.comparePassword(req.body.oldPassword, (passwordErr, isMatch) => {
      if (!isMatch) {
        return res.status(400).json({
          success: false,
          errors: {
            oldPassword: 'Wrong password.'
          }
        })
      }
      User.update({ email: req.body.email }, {
        $set: {
          password: req.body.newPassword
        }
      }, (err) => {
        if (err) {
          return res.status(400).json({
            success: false,
            errors: {
              newPassword: 'Unable to change password. Try again later.'
            }
          })
        }
      })
      return res.json({
        success: true
      })
    })
  })
})

module.exports = router


