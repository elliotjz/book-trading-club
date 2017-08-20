const mongoose = require('mongoose');

// define the User model schema
const BookSchema = new mongoose.Schema({
  title: String,
  author: String,
  thumbnail: String,
  ownerEmail: String,
  id: String
});

module.exports = mongoose.model('Book', BookSchema);


