//1.can rename the import module
const newSayHi = require('./2-function')
newSayHi('Kate') //hi Kate

const newData = require('./3-data') //`import as 'module.exports = { name2, name3 } ' in './3-data'`
console.log(newData) //{  name2: 'Lee',  name3: 'Du',  items: [ 'item1', 'item2' ],  newPerson: { name: 'Susan' }}
newSayHi(newData.name2) //hi Lee
newSayHi(newData.items) //hi item1,item2

//2.can destructure the import module
const { name2, name3 } = require('./3-data')
console.log(name2) //Lee
newSayHi(name2) //hi Lee
//newSayHi(items) //Error: items is not defined

//3.can import without name, can import with invoking
require('./4-invoke') //the sum is 3

//4.built-in module
