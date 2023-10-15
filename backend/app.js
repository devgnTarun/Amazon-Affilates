require('dotenv').config({ path: 'backend/config/config.env'})
const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require("body-parser");
const fileUpload = require('express-fileupload')




app.use(fileUpload())
app.use(express.json())
app.use(cors())

const user = require('./routes/userRoutes.js')
const post = require('./routes/postRoutes.js')
const pay = require('./routes/payementRoute.js')
const shop = require('./routes/shopRoute.js')

app.use('/api/a1', user )
app.use('/api/a1', post )
app.use('/api/a1' , pay )
app.use('/api/a1' , shop)

module.exports = app;