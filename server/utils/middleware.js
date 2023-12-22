const jwt = require('jsonwebtoken');
const { SECRET } = require('../utils/config');

// If request is being sent to endpoint that does not exist.
const unknownEndpoint = (res) => {
  return res.status(404).json({ error: 'Invalid endpoint' });
};

// Checks most of the errors including not authorized, duplicates in mongo and if data pushed into mongo is in wrong format.
const errorHandler = (error, res, next) => {
  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' });
  } else if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message });
  } else if (error.name === 'JsonWebTokenError') {
    return res.status(400).json({ error: 'token missing or invalid' });
  } else if (error.name === 'MongoServerError' && error.code === 11000) {
    return res.status(400).json({ error: 'This username already exists' });
  }
  next(error);
};

// Gets the token from headers. Mostly used for authenticating user to perform action or query data.
const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    try {
      // String that contains only token, bearer excluded
      req.decodedToken = jwt.verify(authorization.substring(7), SECRET);
    } catch {
      return res.status(401).json({ error: 'token invalid' });
    }
  } else {
    return res.status(401).json({ error: 'token missing' });
  }
  next();
};

module.exports = {
  unknownEndpoint,
  errorHandler,
  tokenExtractor
};
