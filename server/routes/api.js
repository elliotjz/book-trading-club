const express = require('express')

const router = new express.Router()

router.get('/dashboard', (req, res) => {
  res.status(200).json({
    user: {
    	name: 'Elliot',
    	email: 'elliot.zoerner@gmail.com',
    	password: 'qwqwqwqw'
    }
  })
})

router.get('/allbooks', (req, res) => {
	res.status(200).json({
		message: "Secret Message"
	})
})

module.exports = router