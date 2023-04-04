let { people } = require('../../data')
const AddPerson = require('../Person')

const getP = (req, res) => {
  res.status(200).json({ success: true, data: people })
}

// const createP = (req, res) => {
//   const { addname } = req.body
//   if (addname) {
//     return res.status(201).json({ success: true, person: addname })
//   }
//   res.status(401).json({ success: false, msg: 'input sth' })
// }
const createP = async (req, res) => {
  const { addPerson } = req.body
  const P = await AddPerson.create({ addPerson }) //`add person with input('req.body')`
  //const task = await AddPerson.create({ id: 6, name: 'Lee', completed: false }) //`vs add person with code`

  if (addPerson) {
    return res.status(201).json({ P })
  }
  res.status(401).json({ success: false, msg: 'input sth' })
}

const postmanP = (req, res) => {
  const { addname } = req.body
  if (addname) {
    return res.status(201).json({ success: true, data: [...people, addname] })
  }
  res.status(401).json({ success: false, msg: 'input sth' })
}

const updateP = (req, res) => {
  const { id } = req.params
  const { changename } = req.body

  const person = people.find((f) => f.id === Number(id))

  if (person) {
    const newPeople = people.map((m) => {
      if (m.id === Number(id)) {
        m.name = changename
      }
      return m
    })
    return res.status(200).json({ success: true, data: newPeople })
  }
  res.status(404).json({ success: false, msg: `cannot find id: ${id}` })
}

// const deleteP = (req, res) => {
//   const { id } = req.params

//   const person = people.find((f) => f.id === Number(id))

//   if (person) {
//     const newPeople = people.filter((m) => m.id !== Number(id))
//     return res.status(200).json({ success: true, data: newPeople })
//   }
//   res.status(404).json({ success: false, msg: `cannot find id: ${id}` })
// } //`destructure {id} from 'req.params'`

const deleteP = (req, res) => {
  //const { id } = req.params
  const person = people.find((f) => f.id === Number(req.params.id))

  if (person) {
    const newPeople = people.filter((m) => m.id !== Number(req.params.id))
    return res.status(200).json({ success: true, data: newPeople })
  }
  res
    .status(404)
    .json({ success: false, msg: `cannot find id: ${req.params.id}` })
} //`not destructure {id} from 'req.params'`

module.exports = { getP, createP, postmanP, updateP, deleteP }
