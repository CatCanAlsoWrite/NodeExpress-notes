const asyncWrapper = (func) => {
  return async (req, res, next) => {
    try {
      await func(req, res, next)
    } catch (err) {
      next(err) //`next function calls middleware 'errorHandler' in 'app.js', for the subsequence 'app.use('/api/tasks', tasksR)' former than 'app.use(errorHandler)'`
    }
  }
}
module.exports = asyncWrapper
