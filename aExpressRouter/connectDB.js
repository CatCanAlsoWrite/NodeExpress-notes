const mongoose = require('mongoose')

/*1.connect and catch error in 'connectDB.js' + import 'require('./connectDB')' in 'app.js'
const connectString =
  'mongodb+srv://LEE:pw@myfirstcluster.rwb2whn.mongodb.net/MySecondDatabase?retryWrites=true&w=majority'

mongoose
  .connect(connectString)
  .then(() => console.log('CONNECTED TO DB...'))
  .catch((err) => console.log(err))
1*/

/*2.connect in 'connectDB.js' + import 'const connectDb = require('./connectDB')' and catch error in 'app.js' 
const connectString =
  'mongodb+srv://LEE:pw@myfirstcluster.rwb2whn.mongodb.net/MySecondDatabase?retryWrites=true&w=majority'

const connectDb = (url) => {
  return mongoose.connect(connectString)
}
module.exports = connectDb
2*/

/*3.connect in 'connectDB.js' +paste 'connectString' in '.env' to use gitignore + import 'const connectDb = require('./connectDB')' 'require('dotenv').config()' and catch error in 'app.js' 3*/
const connectDb = (url) => {
  return mongoose.connect(url)
} //`don't forget parameter 'url', or will lead to ERROR 'MongooseError: The `uri` parameter to `openUri()` must be a string, got "undefined". Make sure the first parameter to `mongoose.connect()` or `mongoose.createConnection()` is a string. '`
module.exports = connectDb
