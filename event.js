/*3.event  3*/
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
