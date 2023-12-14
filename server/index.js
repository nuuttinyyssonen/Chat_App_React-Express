const app = require('./app');
const { PORT } = require('./utils/config');
const io = require('./sockets/sockets');

// server setup
const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`app is listening on port ${PORT}`);
});

io.attach(server);

module.exports = server;