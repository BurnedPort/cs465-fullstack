
const mongoose = require('mongoose');
const Trip = mongoose.model('trips');

// GET /api/trips - Retrieve all trips
const tripsList = async (req, res) => {
    try {
        const trips = await Trip.find({}).exec();

        if (!trips || trips.length === 0) {
            return res.status(404).json({
                message: 'No trips found'
            });
        }

        return res.status(200).json(trips);
    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
};

// GET /api/trips/:tripCode - Retrieve a single trip
const tripsFindCode = async (req, res) => {
    try {
        const trips = await Trip.find({
            code: req.params.tripCode
        }).exec();

        if (!trips || trips.length === 0) {
            return res.status(404).json({
                message: 'Trip not found'
            });
        }

        return res.status(200).json(trips);
    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
};

// POST /api/trips - Add a new trip
const tripsAddTrip = async (req, res) => {
    try {
        const newTrip = await Trip.create({
            code: req.body.code,
            name: req.body.name,
            length: req.body.length,
            start: req.body.start,
            resort: req.body.resort,
            perPerson: req.body.perPerson,
            image: req.body.image,
            description: req.body.description
        });

        return res.status(201).json(newTrip);
    } catch (err) {
        return res.status(400).json({
            message: 'Error creating trip',
            error: err.message
        });
    }
};

// PUT /api/trips/:tripCode - Update an existing trip
const tripsUpdateTrip = async (req, res) => {
    try {
        const updatedTrip = await Trip.findOneAndUpdate(
            { code: req.params.tripCode },
            {
                code: req.body.code,
                name: req.body.name,
                length: req.body.length,
                start: req.body.start,
                resort: req.body.resort,
                perPerson: req.body.perPerson,
                image: req.body.image,
                description: req.body.description
            },
            {
                new: true,
                runValidators: true
            }
        ).exec();

        if (!updatedTrip) {
            return res.status(404).json({
                message: 'Trip not found'
            });
        }

        return res.status(200).json(updatedTrip);
    } catch (err) {
        return res.status(400).json({
            message: 'Error updating trip',
            error: err.message
        });
    }
};

// DELETE /api/trips/:tripCode - Delete a trip
const tripsDeleteTrip = async (req, res) => {
    try {
        const deletedTrip = await Trip.findOneAndDelete({
            code: req.params.tripCode
        }).exec();

        if (!deletedTrip) {
            return res.status(404).json({
                message: 'Trip not found'
            });
        }

        return res.status(200).json({
            message: 'Trip deleted successfully',
            trip: deletedTrip
        });
    } catch (err) {
        return res.status(500).json({
            message: 'Error deleting trip',
            error: err.message
        });
    }
};

// Export all controller methods
module.exports = {
    tripsList,
    tripsFindCode,
    tripsAddTrip,
    tripsUpdateTrip,
    tripsDeleteTrip
};
