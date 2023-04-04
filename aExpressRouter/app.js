/*1.connect in 'connectDB.js' + import 'require('./connectDB')' in 'app.js' 
require('./connectDB')

const express = require('express') //`also add to file 'loginR.js'&'peopleR.js'`
const app = express()

const loginR = require('./router/loginR') //`add import`
const peopleR = require('./router/peopleR') //`add import`

// let { people } = require('./data') `move to file 'peopleR.js'`

app.use(express.static('./methods-public'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// app.post('/login',...) //`move to file 'loginR.js'`
app.use('/login', loginR) //`add path to file 'loginR.js'`

//app.get('/api/people',...)
//app.post('/api/people',...)
//app.post('/api/people/postman',...)
//app.put('/api/people/:id',...)
//app.delete('/api/people/:id',...) //`move to file 'peopleR.js'`
app.use('/api/people', peopleR) //`add path to file 'peopleR.js'`

// app.listen(3000, () => {
//   console.log('server is listening on port 3000...')
// }) //`add variable 'port'`
const port = 3000
app.listen(port, console.log(`server is listening on port ${port}...`))
1*/

/*2.connect in 'connectDB.js' + import 'const connectDb = require('./connectDB')' and catch error in 'app.js' 
const connectDb = require('./connectDB') 

const express = require('express') 
const app = express()

const loginR = require('./router/loginR') 
const peopleR = require('./router/peopleR') 

app.use(express.static('./methods-public'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use('/login', loginR)

app.use('/api/people', peopleR) 

const port = 3000

const db = async () => {
  try {
    await connectDb(),
      app.listen(port, console.log(`server is listening on port ${port}...`))
  } catch (err) {
    console.log(err)
  }
}
db()
2*/

/*3.connect in 'connectDB.js' + import 'const connectDb = require('./connectDB')' and catch error in 'app.js' 3*/
const connectDb = require('./connectDB')
require('dotenv').config()

const express = require('express')
const app = express()

const loginR = require('./router/loginR')
const peopleR = require('./router/peopleR')

app.use(express.static('./methods-public'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use('/login', loginR)

app.use('/api/people', peopleR)

const port = 3000

const db = async () => {
  try {
    await connectDb(process.env.MONGO_URI),
      app.listen(port, console.log(`server is listening on port ${port}...`))
  } catch (err) {
    console.log(err)
  }
}
db()
