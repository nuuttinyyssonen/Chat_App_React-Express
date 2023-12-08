const app = require('./app');
const { PORT } = require('./utils/config');
const io = require('./utils/sockets');

// server setup
const server = app.listen(PORT, () => {
  console.log(`app is listening on port ${PORT}`);
});

io.attach(server);

module.exports = server;