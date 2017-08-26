const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

// define the User model schema
const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    index: { unique: true }
  },
  password: String,
  name: String,
  city: String,
  state: String,
  incomingTrades: Array,
  outgoingTrades: Array
})

UserSchema.methods.comparePassword = function comparePassword(password, callback) {
  bcrypt.compare(password, this.password, callback)
}


UserSchema.pre('update', function saveHook(next) {

  var update = this._update;

  if (update.$set && update.$set.password) {

    return bcrypt.genSalt((saltError, salt) => {

      if (saltError) { return next(saltError) }

      return bcrypt.hash(update.$set.password, salt, (hashError, hash) => {
        if (hashError) { return next(hashError) }

        // replace a password string with hash value
        this.update({}, { password: hash })

        return next()
      })
    })
  }

  next();
});

UserSchema.pre('save', function saveHook(next) {
  const user = this
  hashPassword(user, next)
})

function hashPassword(user, next) {
  // proceed further only if the password is modified or the user is new
  if (!user.isModified('password')) return next()


  return bcrypt.genSalt((saltError, salt) => {
    if (saltError) { return next(saltError) }

    return bcrypt.hash(user.password, salt, (hashError, hash) => {
      if (hashError) { return next(hashError) }

      // replace a password string with hash value
      user.password = hash

      return next()
    })
  })
}


module.exports = mongoose.model('User', UserSchema)


