const Task = require('../03-mongoSchema/TasksS')
const asyncWrapper = require('../04-middleware/asyncWrapper')

// const getAllTasks = async (req, res) => {
//   try {
//     const tasks = await Task.find({}) //`mongoose queries https://mongoosejs.com/docs/queries.html`

//     res.status(200).json({ tasks })
//     // res
//     //   .status(200)
//     //   .json({ success: true, count: tasks.length, data: { tasks } }) //`can add more code to show more info`
//   } catch (err) {
//     res.status(500).json({ msg: err })
//   }
// }
const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find({})
  res.status(200).json({ tasks })
}) //`use middleware to short code`

// // const createTask = (req, res) => {
// //   res.json(req.body)
// // }
// const createTask = async (req, res) => {
//   try {
//     const task = await Task.create(req.body)
//     res.status(201).json({ task })
//   } catch (err) {
//     res.status(500).json({ msg: err })
//   }
// }
const createTask = asyncWrapper(async (req, res) => {
  const task = await Task.create(req.body)
  res.status(201).json({ task })
}) //`use middleware to short code`

// const getTask = async (req, res) => {
//   try {
//     const { id: taskID } = req.params //`rename 'id' with a new name 'taskID'`
//     const task = await Task.findOne({ _id: taskID })

//     if (!task) {
//       return res.status(404).json({ msg: `No task with id: ${taskID}` })
//     }

//     res.status(200).json({ task })
//   } catch (err) {
//     res.status(500).json({ msg: err })
//   }
// }
const getTask = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params //`rename 'id' with a new name 'taskID'`
  const task = await Task.findOne({ _id: taskID })

  if (!task) {
    return res.status(404).json({ msg: `No task with id: ${taskID}` })
  }

  res.status(200).json({ task })
}) //`use middleware to short code`

// const updateTask = async (req, res) => {
//   try {
//     const { id: taskID } = req.params
//     const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
//       new: true,
//       runValidators: true,
//     }) //`the 3rd parameter set conditions to 'task'. 'new: true' means show the new task; 'runValidators:true' means apply mongoSchema`
//     if (!task) {
//       return res.status(404).json({ msg: `No task with id: ${taskID}` })
//     }
//     res.status(200).json({ task })
//   } catch (err) {
//     res.status(500).json({ msg: err })
//   }
// }
const updateTask = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params
  const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
    new: true,
    runValidators: true,
  })
  if (!task) {
    return res.status(404).json({ msg: `No task with id: ${taskID}` })
  }
  res.status(200).json({ task })
}) //`use middleware to short code`

// const deleteTask = async (req, res) => {
//   try {
//     const { id: taskID } = req.params
//     const task = await Task.findOneAndDelete({ _id: taskID })
//     if (!task) {
//       return res.status(404).json({ msg: `No task with id: ${taskID}` })
//     }
//     res.status(200).json({ task })
//   } catch (err) {
//     res.status(500).json({ msg: err })
//   }
// }
const deleteTask = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params
  const task = await Task.findOneAndDelete({ _id: taskID })
  if (!task) {
    return res.status(404).json({ msg: `No task with id: ${taskID}` })
  }
  res.status(200).json({ task })
}) //`use middleware to short code`

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
}
