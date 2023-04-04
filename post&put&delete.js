const express = require('express')
const app = express()

/*7.use '.post()' to pass client-side data  */
/*(1)vs '.get()' can only pass server-side data
let { people } = require('./data')

app.use(express.static('./methods-public'))

app.get('/', (req, res) => {
  res.status(200).json({ success: true, data: people })
})

app.listen(3000, () => {
  console.log('server is listening on port 3000...')
})

//`'<form action="/login" method="POST">' in html, jump to webpage '/login' after submit. can use 'target="_blank"' to open '/login' in a newtab`
//`'cannot post /login' after 'submit' value`
//`in 'inspect' tool in 'Network' in 'Header': req.url='xx/login', req.method='POST', req.status='404 NOT FOUND'; in 'Payload': form data='username(<input name='username'...>): john'. if submit 'john'`
(1)*/

/*(2)add '.post()' to pass client-side data
let { people } = require('./data')

app.use(express.static('./methods-public'))

app.get('/', (req, res) => {
  res.status(200).json({ success: true, data: people })
})

app.post('/login', (req, res) => {
  console.log(req.body) //undefined `can't parse 'req.body'/content submitted`
  res.send('hi')
})//`'hi' after 'submit' value`

app.listen(3000, () => {
  console.log('server is listening on port 3000...')
})

//`'<form action="/login" method="POST">' in html`

//`in 'inspect' tool in 'Network' in 'Header': req.url='xx/login', req.method='POST', req.status='200 OK'; in 'Payload': form data='username(<input name='username'...>): john'. if submit 'john'`
(2)*/

/*(3)add built-in middleware 'express.urlencoded({extended: false})' in node and '<form action="/login" method="POST">' in html to parse client-side data
let { people } = require('./data')

app.use(express.static('./methods-public'))
app.use(express.urlencoded({ extended: false })) //`use this middleware to parse 'req.body' URL-encoded data with the querystring library http://expressjs.com/en/4x/api.html#express.urlencoded`

app.get('/api/people', (req, res) => {
  res.status(200).json({ success: true, data: people })
})

app.post('/login', (req, res) => {
  console.log(req.body) //[Object: null prototype] { username: 'john' }; error `if submit nothing`
  const { username } = req.body //`destructure 'req.body'`
  if (username) {
    return res.status(200).send(`welcome ${username}`)
  }
  res.status(401).send('input sth')
}) //welcome john `if submit 'john'`; input sth `if submit nothing`
//`req.Content-Type='application/x-www-form-urlencoded'`

app.listen(3000, () => {
  console.log('server is listening on port 3000...')
})

//`'<form action="/login" method="POST">' in html`
//`'welcome xx' after 'submit' value`
//`in 'inspect' tool in 'Network' in 'Header': req.url='xx/login', req.method='POST', req.status='200 OK'; in 'payload': form data='username(<input name='username'...>): john'. if submit 'john'`;
//`in 'inspect' tool in 'Network' in 'Header': req.url='xx/login', req.method='POST', req.status='401 Unauthorized'; in 'Payload': form data='username(<input name='username'...>): '. if submit nothing`
(3)*/

/*(4)&add js code to html
let { people } = require('./data')

app.use(express.static('./methods-public'))
app.use(express.urlencoded({ extended: false }))

app.get('/api/people', (req, res) => {
  res.status(200).json({ success: true, data: people })
}) //`showing names under the form`

// app.post('/api/people', (req, res) => {
//   res.status(201).json({})
// }) //`nothing added under the form if submit 'john'`
// //`req.Content-Type='application/json'`

app.use(express.json()) //`use this middleware to parse client-side json code data`
app.post('/api/people', (req, res) => {
  console.log(req.body) //[Object: null prototype] { addname: 'john' }; { addname: '' } `if submit nothing`
  const { addname } = req.body //`destructure 'req.body'`
  if (addname) {
    return res.status(201).json({ success: true, person: addname })
    // return res.status(201).json({ success: true, data: [...people, addname] }) `?? how to change html code??`
  }
  res.status(401).json({ success: false, msg: 'input sth' })
}) //john `added under the form if submit 'john'`
//`req.Content-Type='application/json'`

app.listen(3000, () => {
  console.log('server is listening on port 3000...')
})

//`in 'inspect' tool in 'Network' in 'Header': req.url='xx/api/people', req.method='POST', req.status='201 Created'; in 'payload': form data='addname(<script ...const { data } = await axios.post('/api/people', {addname: nameValue,})...>): john'. if submit 'john'`;
//`in 'inspect' tool in 'Network' in 'Header': req.url='xx/api/people', req.method='POST', req.status='401 Unauthorized'; in 'Payload': form data='addname(<script ...const { data } = await axios.post('/api/people', {addname: nameValue,})...>): ''. if submit nothing`

//`'<form>' without 'action="/login" method="POST"' in html`
//`'<input class="form-input">','<small class="form-alert"></small>', '<button class="submit-btn"></button>' to show client-side data '.post()'`
//`'<div class="result"></div>' to show server-side data '.get()'`
//`'<script src="https://cdnjs.cloudflare.com/.../axios/..." integrity="sha512-bZS47S7sPOxkjU/4Bt0zrhEtWx0y0CRkhEp8IckzK+ltifIIE9EMIMTuT/mEzoIMewUINruDBIR/jJnbguonqQ==" crossorigin="anonymous"></script>' use online libraries on 'cdnjs.cloudflare.com' to omit 'npm i xx' every time in a new platform`
//`add axios API...(more complicated when using fetch API when using methods other than 'GET': 'axios.post(url)' vs 'fetch(url,{method:'POST'})')`
(4)*/

/*8.use '.put()' to change data, 'delete()' to delete data (with app 'postman' to help doing that) 8*/
let { people } = require('./data')

app.use(express.static('./methods-public'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.get('/api/people', (req, res) => {
  res.status(200).json({ success: true, data: people })
})
//`in 'postman' app, choose 'GET' method and 'xx/api/people' path, 'send', then will get data in the body`

app.post('/api/people', (req, res) => {
  const { addname } = req.body
  if (addname) {
    return res.status(201).json({ success: true, person: addname })
  }
  res.status(401).json({ success: false, msg: 'input sth' })
})
//`in 'postman' app, choose 'POST' method and 'xx/api/people' path, 'body'-'raw'&'JSON', type in json code(eg:'{"addname":"john"}'), 'send', then will get '{"addname":"john"}' in the body`

app.post('/api/people/postman', (req, res) => {
  const { addname } = req.body //`destructure 'addname' from payload/input`
  if (addname) {
    return res.status(201).json({ success: true, data: [...people, addname] })
  }
  res.status(401).json({ success: false, msg: 'input sth' })
})
//`in 'postman' app, choose 'POST' method and 'xx/api/people/postman' path, 'body'-'raw'&'JSON', type in json code(eg:'{"addname":"john"}'), 'send', then will get '{ success: true, data: [{...},{...},..., "john"] }' in the body`

app.put('/api/people/:id', (req, res) => {
  const { id } = req.params //`destructure 'id' from parameter of request(in '/api/people/:id')`
  const { changename } = req.body //`destructure 'changename' from payload/input`

  const person = people.find((f) => f.id === Number(id)) //`to check if 'id' is in the data ('find()' can only find context,can't change context)`

  // const person = people.filter((f) => {
  //   f.id === Number(id)
  //   //f.name = changename //`this will lead to all names change`
  // })
  //`a nothor way to check if 'id' is in the data`

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
}) //`in 'postman' app, choose 'PUT' method and 'xx/api/people/1' path, 'body'-'raw'&'JSON', type in json code(eg:'{"changename":"john"}'), 'send', then will get '{ success: true, data: [{"id":"1","name":"john"},{...},...] }' in the body`

app.delete('/api/people/:id', (req, res) => {
  const { id } = req.params

  const person = people.find((f) => f.id === Number(id))

  if (person) {
    const newPeople = people.filter((m) => m.id !== Number(id))
    return res.status(200).json({ success: true, data: newPeople })
  }
  res.status(404).json({ success: false, msg: `cannot find id: ${id}` })
}) //`in 'postman' app, choose 'DELETE' method and 'xx/api/people/1' path, 'send', then will get '{ success: true, data: [{"id":"2",...},...] }' in the body`

app.listen(3000, () => {
  console.log('server is listening on port 3000...')
})

/*9.use 'router' to destructure code (see folder 'aExpressRouter' file 'app.js') 9*/
