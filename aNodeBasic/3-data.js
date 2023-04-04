//local
const name1 = 'susan'
//sharing
const name2 = 'Lee'
const name3 = 'Du'

module.exports = { name2, name3 } //`export part of module`

module.exports.items = ['item1', 'item2'] //`export directly without 'const' (often needs 'const')`

const person = {
  name: 'Susan',
}
module.exports.newPerson = person //`change export name from 'person' to 'newPerson'`
