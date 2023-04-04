const mongoose = require('mongoose')

const PersonSchema = new mongoose.Schema({
  id: Number,
  name: String,
  completed: Boolean,
}) //`set content type for all the tasks. other types see: https://mongoosejs.com/docs/schematypes.html */

module.exports = mongoose.model('AddPerson', PersonSchema) //`use 'AddPeople' to name the 'PersonSchema'???`
//`The '.model()' function makes a copy of schema. Make sure that you've added everything you want to schema, including hooks, before calling '.model()'`
//`vs 'module.exports = getP'`
