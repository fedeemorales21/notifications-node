require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const { join } = require('path')


// init
const app = express()

// setting
app.set('port', process.env.PORT || 3000)


// middlewares
app.use(morgan('dev'))
app.use(express.urlencoded({extended:false}))
app.use(express.json())

// routes
app.use( require('./routes/index') )

// static files
app.use(express.static(join(__dirname,'public')))

// run server
app.listen(app.get('port'), () => console.log(`Server on port ${app.get('port')}`))