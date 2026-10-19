const User = require('../models/user');
const passport = require('passport');

const register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'All fields required' });
  }
  if (password.length < 12) {
    return res.status(400).json({ message: 'Password must be at least 12 characters' });
  }
  try {
    const user = new User({ name, email });
    user.setPassword(password);
    await user.save();
    return res.status(201).json({ token: user.generateJWT() });
  } catch (err) {
    return res.status(err.code === 11000 ? 409 : 400).json({ message: 'Unable to register user' });
  }
};

const login = (req, res, next) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({ message: 'All fields required' });
  }
  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.status(401).json(info || { message: 'Invalid credentials' });
    return res.status(200).json({ token: user.generateJWT() });
  })(req, res, next);
};

module.exports = { register, login };
