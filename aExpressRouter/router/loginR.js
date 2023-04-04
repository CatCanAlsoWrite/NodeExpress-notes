const express = require('express')
const router = express.Router()

router.post('/', (req, res) => {
  console.log(req.body)
  const { username } = req.body
  if (username) {
    return res.status(200).send(`welcome ${username}`)
  }
  res.status(401).send('input sth')
}) //`path is '/' instead of '/login'`

module.exports = router
