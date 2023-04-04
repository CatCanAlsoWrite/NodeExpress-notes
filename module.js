/*
//1.can rename the import module
const newSayHi = require('./aNodeBasic/2-function')
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
*/

/*(3)fs module
//(3-1)synchronous/blocking approach
const fs = require('fs')
console.log('start') //①start
const first = fs.readFileSync('./aNodeBasic/test/first.txt', 'utf8') //first method of read content
const { readFileSync } = require('fs')
const second = readFileSync('./aNodeBasic/test/second.txt', 'utf8') //second method of read content

const { writeFileSync } = require('fs')
writeFileSync(
  './aNodeBasic/test/join1.txt',
  `the content is: ${first}; ${second}`,
  {
    flag: 'a',
  }
) //`if no file './test/join1.txt', add it; if has, write into it`
//`use 'flag: 'a'' to add content, instead of re-write content`
console.log('done') //②done
console.log('start next') //③start next

//(3-2)asynchronous/non-blocking approach, better to use when facing complex/time-consuming codes(use '2.event loop (2-3)'require('fs').promises'' to simplify code)
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
      { flag: 'a' },
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
(3)*/

//(4)http module (see '4.stream' use '.pipe(res)' to upload data )
/*(4-1)basics
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
(4-1)*/

/*(4-2)add html code to http module
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
(4-2)*/

/*(4-3)add multi code to http module (4-3)*/
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
