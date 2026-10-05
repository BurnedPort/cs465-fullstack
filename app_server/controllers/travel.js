const tripsEndpoint = 'http://localhost:3000/api/trips';

const options = {
  method: 'GET',
  headers: {
    'Accept': 'application/json'
  }
};

const travel = async (req, res, next) => {
  await fetch(tripsEndpoint, options)
    .then(response => response.json())
    .then(json => {
      if (!(json instanceof Array)) {
        return res.render('travel', {
          title: 'Travlr Getaways',
          trips: [],
          message: 'API lookup error'
        });
      }

      if (json.length === 0) {
        return res.render('travel', {
          title: 'Travlr Getaways',
          trips: [],
          message: 'No trips found'
        });
      }

      res.render('travel', {
        title: 'Travlr Getaways',
        trips: json
      });
    })
    .catch(err => res.status(500).send(err.message));
};

module.exports = {
  travel
};