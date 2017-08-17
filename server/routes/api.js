const express = require('express')
const UserModel = require('../models/user')
const User = require('mongoose').model('User');
const router = new express.Router()

router.get('/allbooks', (req, res) => {
	res.status(200).json({
		message: "Secret Message"
	})
})

router.post('/addbook', (req, res) => {
  console.log('server is adding book')
  console.log('searching for email:')
  console.log(req.headers.email)
  User.findOne({ email: req.headers.email }, (err, data) => {
  	if (err) throw err
  	if (data) {
      console.log('adding book:')
      console.log(req.headers.book)
  		data.books.push(JSON.parse(req.headers.book))
  		// add book to user's database
  		User.update({ email: req.headers.email }, {
  			$set: { books: data.books }
  		}, (err, data) => {
  			if (err) throw err
  		})

  		res.status(200).json({
		    userData: {
		    	name: data.name,
		    	email: data.email,
		    	books: data.books
		    }
		  })
  	} else {
  		res.status(200).json({
  			error: 'User not found'
  		})
  	}
  	
  })
  
})

module.exports = router