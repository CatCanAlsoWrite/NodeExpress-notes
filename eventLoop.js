/*2.event loop 2*/
//request→ register callback→ complete→ execute callback. execute only after complete
//asynchorous loops (eg: 'readFile()', 'writeFile()', 'setTimeout()', 'setInterval()', '.listen()') execute callback after all immediate code

/*(1)vs asynchorous loops
const { readFile, writeFile } = require('fs')
readFile('./aNodeBasic/test/first.txt', 'utf8', (err, result) => {
  if (err) {
    console.log(err)
    return
  }
  const first = result
  readFile('./aNodeBasic/test/second.txt', 'utf8', (err, result) => {
    if (err) {
      console.log(err)
      return
    }
    const second = result
    writeFile(
      './aNodeBasic/test/join.txt',
      `(1)the content is: ${first}; ${second}.`,
      { flag: 'a' },
      (err, result) => {
        if (err) {
          console.log(err)
          return
        }
      }
    )
  })
})
(1)*/

/*(2-1)vs use function, 'Promise()', 'async await' to short code
const { readFile, writeFile } = require('fs')
const readResult = (path) => {
  return new Promise((resolve, reject) => {
    readFile(path, 'utf8', (err, result) => {
      if (err) {
        reject(err)
      } else {
        resolve(result)
      }
    })
  })
}
// readResult('./aNodeBasic/test/first.txt')
//   .then((result) => console.log(result))
//   .catch((err) => console.log(err))

const getResult = async () => {
  try {
    const first = await readResult('./aNodeBasic/test/first.txt')
    const second = await readResult('./aNodeBasic/test/second.txt')
    await writeFile(
      './aNodeBasic/test/join.txt',
      `(2)the content is: ${first}; ${second}.`,
      { flag: 'a' }
    )
  } catch (err) {
    console.log(err)
  }
}
getResult()
(2)*/

/*(2-2)vs use 'util', '.promisify()' to short code 
const { readFile, writeFile } = require('fs')
const util = require('util')
const readResult = util.promisify(readFile)
const writeResult = util.promisify(writeFile)

const getResult = async () => {
  try {
    const first = await readResult('./aNodeBasic/test/first.txt', 'utf8')
    const second = await readResult('./aNodeBasic/test/second.txt', 'utf8')
    await writeResult(
      './aNodeBasic/test/join.txt',
      `(3)the content is: ${first}; ${second}.`,
      { flag: 'a' }
    )
  } catch (err) {
    console.log(err)
  }
}
getResult()
(2-2)*/

/*(2-3)use 'require('fs').promises' to short code (2-3)*/
const { readFile, writeFile } = require('fs').promises

const getResult = async () => {
  try {
    const first = await readFile('./aNodeBasic/test/first.txt', 'utf8')
    const second = await readFile('./aNodeBasic/test/second.txt', 'utf8')
    await writeFile(
      './aNodeBasic/test/join.txt',
      `(4)the content is: ${first}; ${second}.`,
      { flag: 'a' }
    )
  } catch (err) {
    console.log(err)
  }
}
getResult()
