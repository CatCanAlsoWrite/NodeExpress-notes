/*4.stream 4*/
/*(1-1)vs use 'require('fs').promises' to short code in '2.event loop (2-3)'
const { readFile, writeFile } = require('fs').promises

const getResult = async () => {
  try {
    const first = await readFile('./aNodeBasic/test/first.txt', 'utf8') //`if file size grows bigger and bigger, using variables is not a good choice`
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
(1-1)*/

/*(1-2)add 'for' loop to write content, and use 'stream' to read content (1-2)*/
const { writeFileSync } = require('fs')
for (let i = 0; i < 10000; i++) {
  writeFileSync('./aNodeBasic/test/big.txt', `hi ${i}\n`, { flag: 'a' })
}

const { createReadStream } = require('fs')
const stream = createReadStream('./aNodeBasic/test/big.txt', {
  highWaterMark: 90000,
  encoding: 'utf8',
}) //`use 'highWaterMark' to control size`
stream.on('data', (result) => {
  //console.log(result) //hi 0 hi 1 ... `print content in 'big.txt'`
  console.log(`recieved ${result.length} bytes of code`)
}) //recieved 78890 bytes of code `with '{highWaterMark: 90000}'`
//①recieved 65536 bytes of code ②recieved 13354 bytes of code `without '{highWaterMark: 90000}'`
stream.on('error', (err) => {
  console.log(err)
})

/*(2-1)vs use 'res.end()' to upload data
var http = require('http')
var fs = require('fs')

http
  .createServer(function (req, res) {
    const text = fs.readFileSync('./aNodeBasic/test/big.txt', 'utf8')
    res.end(text)
  })
  .listen(3000) //`no 'Transfer-Encoding' value`
(2-1)*/

/*(2-2)use '.pipe(res)' to upload data (2-2)*/
var http = require('http')
var fs = require('fs')

http
  .createServer(function (req, res) {
    const text = fs.createReadStream('./aNodeBasic/test/big.txt', 'utf8')
    text.on('open', () => {
      text.pipe(res)
    })
    text.on('error', (err) => {
      res.end(err)
    })
  })
  .listen(3000) //Transfer-Encoding: chunked `in 'Response Headers' in 'Headers' of 'localhost' file in 'Network' after 'inspect'`
