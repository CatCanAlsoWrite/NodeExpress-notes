const express = require('express')
const router = express.Router()

const {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
} = require('../01-controller/tasksC')

router.route('/').get(getAllTasks).post(createTask)
router
  .route('/:id')
  .get(getTask)
  .patch(updateTask)
  // .put(updateTask) //`'PATCH' only update the data inputed, 'PUT' refresh inputed data and other default data`???
  .delete(deleteTask)

module.exports = router
