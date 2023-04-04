const express = require('express')
const app = express()
const tasksR = require('./01-router/tasksR')
const ConnectDB = require('./02-mongoDB/connectDB')
require('dotenv').config()

const notFound = require('./04-middleware/notFound')
const errorHandler = require('./04-middleware/errorHandler')

app.use(express.static('./public'))
// app.use(express.urlencoded({ extended: false }))
app.use(express.json())

//router
app.use('/api/tasks', tasksR)

//middleware
app.use(notFound) //`easily set to every false website`
app.use(errorHandler) //`use self wrote 'errorHandler' instead of built-in errorHandler`

// const port = 3000 //`'nodemon app.js' in terminal`
const port = process.env.PORT || 3000 //`'$env:PORT=6000;npm start' in terminal`

const DB = async () => {
  try {
    await ConnectDB(process.env.MONGO_URI),
      app.listen(port, console.log(`server is listening on port ${port}...`))
  } catch (err) {
    console.log(err)
  }
}
DB()
