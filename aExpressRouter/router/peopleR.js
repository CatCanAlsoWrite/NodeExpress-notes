const express = require('express')
const router = express.Router()

const {
  getP,
  createP,
  postmanP,
  updateP,
  deleteP,
} = require('../controller/peopleC')
// let { people } = require('../../data') `move to file 'peopleC.js'`

/*vs use function to destructure code
router.get('/', getP) //`path is '/' instead of '/api/people'`
router.post('/', postP) //`path is '/' instead of '/api/people'`
router.post('/postman', postmanP) //`path is '/postman' instead of '/api/people/postman'`
router.put('/:id', updateP) //`path is '/:id' instead of '/api/people/:id'`
router.delete('/:id', deleteP) //`path is '/:id' instead of '/api/people/:id'`
*/

/*use 'route()' to short code*/
router.route('/').get(getP).post(createP)
router.route('/postman').post(postmanP)
router.route('/:id').put(updateP).delete(deleteP)

module.exports = router
