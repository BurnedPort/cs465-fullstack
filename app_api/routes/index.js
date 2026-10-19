const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

const ctrlTrips = require('../controllers/trips');
const authController = require('../controllers/authentication');

function authenticateJWT(req, res, next) {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) return res.sendStatus(401);
  try {
    req.auth = jwt.verify(header.slice(7), process.env.JWT_SECRET, { algorithms: ['HS256'] });
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
}

router.post('/register', authController.register);
router.post('/login', authController.login);

router.route('/trips')
  .get(ctrlTrips.tripsList)
  .post(authenticateJWT, ctrlTrips.tripsAddTrip);

router.route('/trips/:tripCode')
  .get(ctrlTrips.tripsFindCode)
  .put(authenticateJWT, ctrlTrips.tripsUpdateTrip)
  .delete(authenticateJWT, ctrlTrips.tripsDeleteTrip);

module.exports = router;
