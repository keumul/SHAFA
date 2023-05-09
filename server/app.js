require('dotenv').config()
const express = require('express')
const sequelize = require('./models/database')
const models = require('./models/models')
const cors = require('cors')
const router = require('./routes/routes')
const errorHandler = require('./middleware/errorHandlingMiddleware')
const PORT = process.env.PORT || 3000

const app = express()
app.use(cors())
app.use(express.json())
app.use('/api', router)


//final middleware
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
                console.log(`Server listening on port ${PORT}! Go to http://localhost:${PORT}/api/auth to get start!`);
            })
    } catch (err) {
        console.log(err);
    }
}

start();