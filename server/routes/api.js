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


router.post('/requesttrade', (req, res) => {
  
  let requester = req.body.email
  let bookId = req.body.bookid
  Book.findOne({ id: bookId }, (err, book) => {

    if (err) throw err

    if (book.ownerEmail === requester) {
      return res.status(400).json({
        message: 'You are the owner of this book.'
      })
    }

    User.findOne({ email: requester }, (err, user) => {
      let tradeExists = false
      user.outgoingTrades.forEach((trade) => {
        if (trade.book.id === bookId) {
          tradeExists = true
        }
      })
      if (tradeExists) {
        return res.status(400).json({
          message: 'Trade request already exists.'
        })
      } else {
        let outgoingTrades = user.outgoingTrades
        outgoingTrades.push({
          book: {
            id: bookId,
            author: book.author,
            title: book.title,
            thumbnail: book.thumbnail
          },
          accepted: false,
          ownerEmail: book.ownerEmail
        })

        // Update the requester's db document
        User.update({ email: requester }, {
          $set: {
            outgoingTrades
          }
        }, (err) => {
          if (err) throw err
        })

        // Update the receiving user's db document
        User.findOne({ email: book.ownerEmail }, (err, user) => {
          if (err) throw err
          let incomingTrades = user.incomingTrades
          incomingTrades.push({
            book: {
              id: bookId,
              author: book.author,
              title: book.title,
              thumbnail: book.thumbnail
            },
            accepted: false,
            requesterEmail: requester
          })

          User.update({ email: book.ownerEmail }, {
            $set: {
              incomingTrades
            }
          }, (err) => {
            if (err) throw err
            return res.json({
              success: true,
              outgoingTrades
            })
          })
        })
      }
    })
  })
}) // end request trade path

router.post('/canceltrade', (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) throw err

    if (req.body.isIncomingTrade == 'true') {
      // canceling incoming trade

      // Find trade in user doc
      let incomingTrades = user.incomingTrades
      let indexOfTrade = -1
      let i = 0
      while (indexOfTrade === -1 && i < incomingTrades.length) {
        if (incomingTrades[i]['book']['id'] === req.body.bookid) {
          indexOfTrade = i
        }
        i += 1
      }
      let requesterEmail = incomingTrades[indexOfTrade]['requesterEmail']

      console.log('index of trade:')
      console.log(indexOfTrade)

      console.log('before change:')
      incomingTrades.forEach((trade) => {
        console.log(trade['accepted'])
      })
      console.log('')
      incomingTrades[indexOfTrade]['accepted'] = false
      console.log('after change:')
      incomingTrades.forEach((trade) => {
        console.log(trade['accepted'])
      })
      console.log('')


      // Update user doc
      User.update({ email: req.body.email }, {
        $set: {
          incomingTrades
        }
      }, (err) => {
        if (err) throw err
      })

      // Find trade in requester doc
      User.findOne({ email: requesterEmail }, (err, requester) => {
        let outgoingTrades = requester.outgoingTrades
        let indexOfTrade = -1
        let i = 0
        while (indexOfTrade === -1 && i < outgoingTrades.length) {
          if (outgoingTrades[i]['book']['id'] === req.body.bookid) {
            indexOfTrade = i
          }
          i += 1
        }

        outgoingTrades[indexOfTrade]['accepted'] = false

        // Update requester doc
        User.update({ email: requesterEmail }, {
          $set: {
            outgoingTrades
          }
        }, (err) => {
          if (err) throw err
        })

        res.json({ incomingTrades })
      })

    } else {
      // trade to be canceled is an outgoing trade

      // finding trade
      let outgoingTrades = user.outgoingTrades
      let indexOfTrade = -1
      let i = 0

      while (indexOfTrade === -1 && i < outgoingTrades.length) {
        if (outgoingTrades[i]['book']['id'] === req.body.bookid) {
          indexOfTrade = i
        }
        i += 1
      }

      let ownerEmail = outgoingTrades[indexOfTrade]['ownerEmail']

      outgoingTrades.splice(indexOfTrade, 1)

      //deleting trade from user document
      User.update({ email: req.body.email }, {
        $set: {
          outgoingTrades
        }
      }, (err) => {
        if (err) throw err
      })

      // deleting trade from owner's document
      User.findOne({ email: ownerEmail }, (err, owner) => {
        if(err) throw err

        let incomingTrades = owner.incomingTrades
        let indexOfTrade = -1
        let i = 0

        while (indexOfTrade === -1 && i < incomingTrades.length) {
          if (incomingTrades[i]['book']['id'] === req.body.bookid) {
            indexOfTrade = i
          }
          i += 1
        }

        incomingTrades.splice(indexOfTrade, 1)

        User.update({ email: ownerEmail }, {
          $set: {
            incomingTrades
          }
        }, (err) => {
          if (err) throw err
        })

      })
      res.json({ outgoingTrades })
    }
  }) // End Find user doc
}) // End cancel Trade

router.post('/accepttrade', (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) throw err
    let incomingTrades = user.incomingTrades
    let indexOfTrade = -1
    let i = 0

    // Find trade
    while(indexOfTrade === -1 && i < incomingTrades.length) {
      if (incomingTrades[i]['book']['id'] === req.body.bookid) {
        indexOfTrade = i
      }
      i += 1
    }

    let requesterEmail = incomingTrades[indexOfTrade]['requesterEmail']

    incomingTrades[indexOfTrade]['accepted'] = true

    // Update user doc
    User.update({ email: req.body.email }, {
      $set: {
        incomingTrades
      }
    }, (err) => {
      if (err) throw err
    })

    // Find requester doc
    User.findOne({ email: requesterEmail }, (err, requester) => {
      let outgoingTrades = requester.outgoingTrades
      let indexOfTrade = -1
      let i = 0
      while(indexOfTrade === -1 && i < outgoingTrades.length) {
        if (outgoingTrades[i]['book']['id'] === req.body.bookid) {
          indexOfTrade = i
        }
        i += 1
      }

      outgoingTrades[indexOfTrade]['accepted'] = true

      // Update requester doc
      User.update({ email: requesterEmail }, {
        $set: {
          outgoingTrades
        }
      }, (err) => {
        if (err) throw err
      })

      res.json({ incomingTrades })

    })
  })
})

function makeBookId() {
  return Math.floor(Math.random() * 999999999999999)
}

module.exports = router



