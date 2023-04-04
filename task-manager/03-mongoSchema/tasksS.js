const mongoose = require('mongoose')

// const taskSchema = new mongoose.Schema({
//   name: String,
//   completed: Boolean,
// })

const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'must provide name'],
    trim: true,
    maxlength: [20, 'name cannot be more than 20 characters'],
  },
  completed: {
    type: Boolean,
    default: false,
  },
}) //`use 'trim: true' to delete spaces in the beginning and end of it`

module.exports = mongoose.model('Task', taskSchema) //`'model'! not 'module'!`
