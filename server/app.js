require('dotenv').config()
const express = require('express')
const sequelize = require('./models/database')
const models = require('./models/models')
const cors = require('cors')
const img = require('express-fileupload')
const router = require('./routes/routes')
const errorHandler = require('./middleware/errorHandlingMiddleware')
const PORT = process.env.PORT || 443
const https = require('http');
const socketIO = require('socket.io');
const fs = require('fs')
const path = require('path')

const options = {
  key: fs.readFileSync('./private.key'),
  cert: fs.readFileSync('./certificate.crt')
};

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname,'static')))
app.use(img())
app.use('/api', router)

const server = https.createServer(options, app);
const io = socketIO(server);

io.on('connection', (socket) => {
  console.log('Socket.IO connected');
  socket.on('message', (message) => {
    console.log('Received message:', message);
    io.emit('message', message);
  });
  socket.on('disconnect', () => {
    console.log('Socket.IO disconnected');
  });
});

server.listen(PORT, () => {
  console.log(`Server is ready!`);
});

app.use(errorHandler);

const start = async () => {
  try {
    await sequelize.authenticate().then(() => {
        console.log('INFO: SUCCESS CONNECTING WITH DATABASE!');
      })
      .catch(err => {
        console.error('CONNECTING ERROR:', err);
      });
    await sequelize.sync().then(() => {
      console.log('INFO: SUCCESS DATABASE SYNC!');
    });
  } catch (err) {
    console.log(err);
  }
};

start();
