const express = require('express')
const UserModel = require('../models/user')
const User = require('mongoose').model('User');
const router = new express.Router()

router.get('/allbooks', (req, res) => {
  let allBooks = []
  User.find({}, (err, data) => {
    data.forEach((user) => {
      let books = user.books
      books.forEach((book) => {
        allBooks.push(book)
      })
    })
    res.status(200).json({
      allBooks
    })
  })
	
})

router.post('/addbook', (req, res) => {
  User.findOne({ email: req.headers.email }, (err, data) => {
  	if (err) throw err
  	if (data) {
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

router.post('/removebook', (req, res) => {
  User.findOne({ email: req.headers.email }, (err, data) => {
    if (err) throw err
    if (data) {
      const indexOfBook = findIndexOfBook(JSON.parse(req.headers.book), data.books)
      if (indexOfBook >= 0) {
        data.books.splice(indexOfBook, 1)

        // add book to user's database
        User.update({ email: req.headers.email }, {
          $set: { books: data.books }
        }, (err, data) => {
          if (err) throw err
        })
      } else {
        console.log('error: Book wasn\'t found')
      }
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

// Finds the index of a book in an array
function findIndexOfBook(book, array) {
  book = JSON.stringify(book)
  for (let i = 0; i < array.length; i++) {
    if (book === JSON.stringify(array[i])) {
      return i
    }
  }
  return -1
}

module.exports = router



