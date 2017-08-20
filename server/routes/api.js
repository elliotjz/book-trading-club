const express = require('express')
const UserModel = require('../models/user')
const User = require('mongoose').model('User')
const Book = require('mongoose').model('Book')
const router = new express.Router()

router.get('/allbooks', (req, res) => {
  let allBooks = []
  Book.find({}, (err, data) => {
    if (err) throw err;
    if (data) {
      data.forEach((book) => {
        allBooks.push({
          title: book.title,
          author: book.author,
          id: book.id,
          thumbnail: book.thumbnail
        })
      })
    }
    res.status(200).json({
      allBooks
    })
  })
})


router.get('/mybooks', (req, res) => {

  let userBooks = []
  Book.find({ ownerEmail: req.headers.email }, (err, data) => {
    if (err) throw err
    if (data) {
      data.forEach((book) => {
        userBooks.push({
          id: book.id,
          author: book.author,
          title: book.title,
          thumbnail: book.thumbnail
        })
      })
    }
    res.status(200).json({
      userBooks
    })
  })
})


router.post('/addbook', (req, res) => {

  let bookData = JSON.parse(req.headers.book)
  bookData['ownerEmail'] = req.headers.email
  bookData['id'] = makeBookId()

  const newBook = new Book(bookData)
  newBook.save((err) => {
    if (err) throw err
    res.status(200).end()
  })
})


router.post('/removebook', (req, res) => {
  const id = JSON.parse(req.headers.book).id
  Book.remove({ id: id }, (err, data) => {
    if (err) throw err
    if (data) {
      res.status(200).end()
    } else {
      res.status(406).end()
    }
  })
})


function makeBookId() {
  return Math.floor(Math.random() * 999999999999999)
}

module.exports = router



