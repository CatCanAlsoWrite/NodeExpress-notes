/*1.module 
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
//(1)os module
const os = require('os') //`operating system`
console.log(os.userInfo()) //{ uid: -1,  gid: -1,  username: 'hellowlee',  homedir: 'C:\\Users\\hellowlee',  shell: null }
console.log(os.uptime()) //271973.984
console.log(os.type()) //Windows_NT
console.log(os.release()) //10.0.19044
console.log(os.totalmem()) //4173115392
console.log(os.freemem()) //905682944

//(2)path module
const path = require('path')
console.log(path.sep) //\
const filepath = path.join('test', 'testFolder', 'test.txt')
console.log(filepath) //test\testFolder\test.txt
console.log(path.basename(filepath)) //test.txt
console.log(path.resolve(__dirname, 'test', 'testFolder', 'test.txt')) //c:\Users\hellowlee\Desktop\js\johnSmilga\node\test\testFolder\test.txt

//(3)fs module
//(3-1)synchronous/blocking approach
const fs = require('fs') //`file system`
console.log('start') //①start
const first = fs.readFileSync('./aNodeBasic/test/first.txt', 'utf8') //first method of read content
const { readFileSync } = require('fs')
const second = readFileSync('./aNodeBasic/test/second.txt', 'utf8') //second method of read content

const { writeFileSync } = require('fs')
writeFileSync('./aNodeBasic/test/join1.txt', `the content is: ${first}; ${second}`, {
  flag: 'a',
}) //`if no file './test/join1.txt', add it; if has, write into it`
//`use 'flag: 'a'' to add content, instead of re-write content`
console.log('done') //②done
console.log('start next') //③start next

//(3-2)asynchronous/non-blocking approach, better to use when facing complex/time-consuming codes (use '2.event loop (2-3)'require('fs').promises'' to simplify code)
const { readFile, writeFile } = require('fs')

console.log('start') //①start
readFile('./aNodeBasic/test/first.txt', 'utf8', (err, result) => {
  if (err) {
    console.log(err)
    return
  } 
  const first = result //`use a callback function '(err, result) => {...}'`
  readFile('./aNodeBasic/test/second.txt', 'utf8', (err, result) => {
    if (err) {
      console.log(err)
      return
    }
    const second = result
    writeFile(
      './aNodeBasic/test/join2.txt',
      `the content is: ${first}; ${second}`, 
      {  flag: 'a' },
      (err, result) => {
        if (err) {
          console.log(err)
          return
        }
        console.log('done') //③done
      }
    )
  })
})
console.log('start next') //②start next `run before 'console.log('done') ', don't need to wait the async code`

//(4)http module (see '4.stream' use '.pipe(res)' to upload data )
//(4-1)basics
const http = require('http')
const server = http.createServer((req, res) => {
  //console.log(req) //... `a giant object, print after refreshing the website 'http://localhost:3000/'`
  console.log(req.method) //GET
  if (req.url === '/') {
    res.writeHead(200, { 'content-type': 'text/html' })
    //http status code:https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
    //MIME types: https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types
    res.write('<h1>HomePage</h1>')
    res.end() //`without 'res.end()', website will repeatly refreshing??`
  } else if (req.url === '/about') {
    res.writeHead(200, { 'content-type': 'text/html' })
    res.write('<h1>AboutPage</h1>')
    res.end()
  } else {
    res.writeHead(404, { 'content-type': 'text/html' })
    res.write(`
      <h1>Error</h1>
      <a href='/'>back to HomePage</a>`)
    res.end()
  }
}) //`user sends http require, server sends http response`
server.listen(3000) //`print 'homepage' in website 'http://localhost:3000/'`
//port: https://en.wikipedia.org/wiki/Port_(computer_networking)


//4-2)add html code to http module
const http = require('http')

const { readFileSync } = require('fs')
const homePage = readFileSync('./index.html')

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    res.writeHead(200, { 'content-type': 'text/html' }) //`if 'content-type': 'text/plain', homepage website will show html codes`
    res.write(homePage)
    res.end()
  } else if (req.url === '/about') {
    res.writeHead(200, { 'content-type': 'text/html' })
    res.write('<h1>AboutPage</h1>')
    res.end()
  } else {
    res.writeHead(404, { 'content-type': 'text/html' })
    res.write(`
      <h1>Error</h1>
      <a href='/'>back to HomePage</a>`)
    res.end()
  }
})
server.listen(3000)


//(4-3)add multi code to http module 
const http = require('http')

const { readFileSync } = require('fs')
const homeHTML = readFileSync('./navbar-app/index.html')
const homeJS = readFileSync('./navbar-app/browser-app.js')
const homeIMG = readFileSync('./navbar-app/logo.svg')
const homeCSS = readFileSync('./navbar-app/styles.css')

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    res.writeHead(200, { 'content-type': 'text/html' }) //`if 'content-type': 'text/plain', homepage website will show html codes`
    res.write(homeHTML)
    res.end()
  } else if (req.url === '/browser-app.js') {
    res.writeHead(200, { 'content-type': 'text/javascript' })
    res.write(homeJS)
    res.end()
  } else if (req.url === '/logo.svg') {
    res.writeHead(200, { 'content-type': 'image/svg+xml' })
    res.write(homeIMG)
    res.end()
  } else if (req.url === '/styles.css') {
    res.writeHead(200, { 'content-type': 'text/css' })
    res.write(homeCSS)
    res.end()
  } else if (req.url === '/about') {
    res.writeHead(200, { 'content-type': 'text/html' })
    res.write('<h1>AboutPage</h1>')
    res.end()
  } else {
    res.writeHead(404, { 'content-type': 'text/html' })
    res.write(`
      <h1>Error</h1>
      <a href='/'>back to HomePage</a>`)
    res.end()
  }
})
server.listen(3000)
1*/

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

/*(2-3)use 'require('fs').promises' to short code (see '4.stream' to apply in big file )
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
(2-3)*/

/*3.event  
const EventEmitter = require('events')
const customEmitter = new EventEmitter()
customEmitter.on('response', () => {
  console.log(`data recieved`)
}) //`name a 'response' event and add function to the 'response' event`
customEmitter.on('response', () => {
  console.log(`data recieved again`)
}) //`can add as many function as want to the 'response' event, and adding order matters`
customEmitter.emit('response') //①data recieved ②data recieved again `callback 'response' event`
customEmitter.on('response', () => {
  console.log(`data can't recieved`)
})

customEmitter.on('response2', (name, id) => {
  console.log(`data recieved from user ${name} with id: ${id}`)
}) //`can add parameters`
customEmitter.emit('response2', 'Lee', 12) //data recieved from user Lee with id: 12

//vs basic http module
const http = require('http')
const server1 = http.createServer((req, res) => {
  res.end('hi')
})
server1.listen(3000)
//use Event Emitter API in http module
const server2 = http.createServer()
server2.on('request', (req, res) => {
  res.end('hi')
}) 
server2.listen(4000)
3*/

/*4.streams 4*/
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

/*(1-2)add 'for' loop to write content, and use 'stream' to read content 
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
(1-2)*/

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

/*
1.difference between 'browser js' and 'node.js': '5:00' in 'https://www.youtube.com/watch?v=TNV0_7QRDwY' , such as benifits using 'browser js': can use 'querySelector()', built-in 'fetch()'`
2.GLOBALS: '__dirname', '__filename', 'module', 'require','process'

//run node.js code: 'node xx.js'(better) or 'node xx'
//use '↑' to use last code in terminal

console.log(__dirname) //C:\Users\hellowlee\Desktop\js\johnSmilga\node
console.log(__filename) //C:\Users\hellowlee\Desktop\js\johnSmilga\node\node.js
setInterval(() => {
  console.log('hi')
}, 1000) //hi hi hi... `print 'hi' every second, until 'ctrl+c' stops it`

3.npm install
'npm --version' (or 'npm --v') `npm installed while node installed`

'npm i <pachageName>' (or 'npm install <pachageName>') `install locally, more often to use`
'npm i -g <pachageName>' `install globally`
`often use folderName as pachageName; but if going to publish the npm, create a unique pachageName which can't find in the npm website`

'npm init' `step by step, press 'Enter' to skip`
'npm init -y' `everything default`
`then 'dependencies' object shows in 'package.json' and 'node_module', and can be imported as 'require('dependenciesName')'`

'npm i nodemon -D' (or 'npm i nodemon --save-dev') `install when developing app??`
`then 'devDependencies' object in 'package.json' contains 'nodemon'`

4.git add or clone
`write '/node_module' into '.gitignore', to ignore adding the dependencies in the folder up to git repository` 
'git init'
'git add'
'git commit -m 'xxx''

'git remote add origin 'xxx.git'(repository url)
'git branch -M main'
'git push -u origin main'

but how to run code in get repo without '/node_module'?
'git clone 'xxx.git'(repository url)
'npm install' `it then automatically set up '/node_module' after checking 'package.json'`

how to remove dependencies?
'npm uninstall <pachageName>' 
(or nuclear approache:
delete pachageName in 'package.json' 
delete '/node_module', delete 'package-lock.json'
'npm install')

5.package.json
https://nodesource.com/blog/the-basics-of-package-json
'"start":"node app.js"'(in '"scripts":{}') 
`then, 'npm start' means 'node app.js'`

'"dev":"nodemon app.js"'(in '"scripts":{}') 
`then, 'npm run dev' means 'nodemon app.js'`
'ctrl+c' `to stop 'nodemon app.js'`

6.npm update
change version to the latest in 'package.js', then run 'npm update' in root folder

7.npm copy
copy and paste dependencies into 'package.json', then run 'npm run install-dependencies'
*/
