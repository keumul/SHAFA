require('dotenv').config()
const express = require('express')
const sequelize = require('./models/database')
const models = require('./models/models')
const cors = require('cors')
const img = require('express-fileupload')
const router = require('./routes/routes')
const errorHandler = require('./middleware/errorHandlingMiddleware')
const PORT = process.env.PORT || 3000
const https = require('http');
const socketIO = require('socket.io');
const fs = require('fs')

const app = express()
app.use(cors())
app.use(express.json())
app.use(img)
app.use('/api', router)

const server = https.createServer(app);
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

server.listen(3001, () => {
  });

app.use(errorHandler)

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
        app.listen(PORT, 
            () =>{
                console.log(`Server is ready!`);
            })
    } catch (err) {
        console.log(err);
    }
}

start();