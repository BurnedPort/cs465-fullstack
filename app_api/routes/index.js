const express = require('express');
const router = express.Router();

const ctrlTrips = require('../controllers/trips');

// GET all trips and POST new trips
router
    .route('/trips')
    .get(ctrlTrips.tripsList)
    .post(ctrlTrips.tripsAddTrip);

// GET, PUT, and DELETE individual trips
router
    .route('/trips/:tripCode')
    .get(ctrlTrips.tripsFindCode)
    .put(ctrlTrips.tripsUpdateTrip)
    .delete(ctrlTrips.tripsDeleteTrip);

module.exports = router;
