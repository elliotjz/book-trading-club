const express = require('express')
const UserModel = require('../models/user')
const mongoose = require('mongoose')
const router = new express.Router()

router.get('/dashboard', (req, res) => {
  UserModel.findOne({ email: 'elliot.zoerner@gmail.com' }, (err, data) => {
    console.log('name:')
    console.log(data.name)
    res.status(200).json({
      user: {
        name: data.name,
        email: 'elliot.zoerner@gmail.com',
        password: 'qwqwqwqw'
      }
    })
  })
  
})

router.get('/allbooks', (req, res) => {
	res.status(200).json({
		message: "Secret Message"
	})
})

module.exports = router