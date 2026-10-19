const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  name: { type: String, required: true },
  hash: String,
  salt: String
});

userSchema.methods.setPassword = function(password) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 600000, 64, 'sha512').toString('hex');
};

userSchema.methods.validPassword = function(password) {
  if (!this.hash || !this.salt) return false;
  const hash = crypto.pbkdf2Sync(password, this.salt, 600000, 64, 'sha512');
  return crypto.timingSafeEqual(Buffer.from(this.hash, 'hex'), hash);
};

userSchema.methods.generateJWT = function() {
  return jwt.sign({ _id: this._id, email: this.email, name: this.name },
    process.env.JWT_SECRET, { expiresIn: '1h', algorithm: 'HS256' });
};

module.exports = mongoose.model('users', userSchema);
