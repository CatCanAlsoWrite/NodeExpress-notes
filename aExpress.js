/*1.vs use 'res.status().send()' to read data 
const express = require('express')
const app = express()

app.get('/', (req, res) => {
  res.status(200).send('<h1>HomePage</h1>')
})
app.get('/about', (req, res) => {
  res.status(200).send('<h1>AboutPage</h1>')
})
app.all('*', (req, res) => {
  res.status(404).send('<h1>Error</h1>')
})

app.listen(3000, () => {
  console.log('server is listening on port 3000...')
})
1*/

/*2.vs use 'res.sendFile(path.resolve())' to read data (not frequently use)
const express = require('express')
const path = require('path')
const app = express()

app.use(express.static('./public1'))
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, './navbar-app/index.html'))
})
app.get('/about', (req, res) => {
  res.status(200).send('<h1>AboutPage</h1>')
})
app.all('*', (req, res) => {
  res.status(404).send('<h1>Error</h1>')
})

app.listen(3000, () => {
  console.log('server is listening on port 3000...')
})
2*/

/*3.use '.use(express.static())' to read data in folder at a time (more often to use)
//??use SSR/server side rendering to read template data(folder of all kinds of data) and build a html website (more often to use)
const express = require('express')
const path = require('path')
const app = express()

app.use(express.static('./public2')) //`use bult-in express middleware(see '5.middleware') 'express.static()' to pass data`
//`static assets is files which server doesn't have to change, eg: images. put all these assets into one folder, then use '.static()' to read`

app.get('/about', (req, res) => {
  res.status(200).send('<h1>AboutPage</h1>')
})
app.all('*', (req, res) => {
  res.status(404).send('<h1>Error</h1>')
})

app.listen(3000, () => {
  console.log('server is listening on port 3000...')
})
3*/

/*4.use API/Application Program Interface to read data and send data of json code to build a website/httpInterface ('content-type: application/json' in'Response Headers' in 'Headers' in 'Network' in inspect tool) 
const express = require('express')
const app = express()
const { products } = require('./data')

// app.get('/', (req, res) => {
//   res.json(products)
// }) //`sometimes a 304 error, refresh the nodemon, it will success with 200`

app.listen(3000, () => {
  console.log('server is listening on port 3000...')
})

app.get('/', (req, res) => {
  res.send('<h1>HomePage</h1><a href="/api/products">products</a>')
})

app.get('/api/products', (req, res) => {
  const newProducts = products.map((m) => {
    const { id, name, image } = m
    return { id, name, image }
  })
  res.json(newProducts)
}) //`send only part of data`

// app.get('/api/products/1', (req, res) => {
//   const singleProduct = products.find((f) => f.id === 1)
//   res.json(singleProduct)
// }) //`send demanded data. repeatly code, so don't use too often`

app.get('/api/products/:productId', (req, res) => {
  console.log(req.params) //{productId: '1'} `after I refreshed website 'xx/api/products/1'`
  const { productId } = req.params
  const singleProduct = products.find((f) => f.id === Number(productId)) //`'Number()' or 'parseInt()'`
  if (!singleProduct) {
    res.status(404).send('Error')
  }
  res.json(singleProduct)
}) //`use place holder/parameter to send demanded data`

app.get('/api/products/:productId/others/:otherID', (req, res) => {
  console.log(req.params) //{ productId: '1', otherID: 'a' } `after I refreshed website 'xx/api/products/1/others/a'`
  res.send('hi')
}) //`add multi place holders/parameters`

app.get('/api/query', (req, res) => {
  console.log(req.query) //{ search: 'a', limit: '2' } `after I refreshed website 'xx/api/query?search=a&limit=2'`

  const { search, limit } = req.query
  let queryProducts = [...products]

  if (search) {
    queryProducts = queryProducts.filter((f) => {
      return f.name.startsWith(search)
    })
  }
  if (limit) {
    queryProducts = queryProducts.slice(0, Number(limit))
  }
  if (queryProducts.length < 1) {
    // return res.status(200).send('no product matched')
    return res.status(200).json({ success: true, data: [] }) //`another way of showing 'no product matched'`
  } //`always 'return' a function in a condition, otherwise, error will come out for the conflict of neighbour functions inside and outside of the condition`
  res.status(200).json(queryProducts)
}) //`use query to send searched data`
//`other API search method: https://hn.algolia.com/api`
4*/

/*5.use middleware to pass data 5*/
//`contains our own middleware, bult-in express middleware 'express.static()'(see '3.static assets'), third-party middleware (see '6.morgan') `
//req => middleware => res
const express = require('express')
const app = express()

/*(1)before middleware
app.get('/', (req, res) => {
  const a = req.method
  const b = req.url
  const c = new Date().getFullYear()
  console.log(a, b, c) //GET / 2023
  res.send('<h1>HomePage</h1>')
}) //GET / 2023
//`print sth in '/' webpage`

app.get('/about', (req, res) => {
  const a = req.method
  const b = req.url
  const c = new Date().getFullYear()
  console.log(a, b, c)
  res.send('<h1>AboutPage</h1>')
}) //GET /about 2023
(1)*/

/*(2)use middleware to short code
const middle1 = (req, res, next) => {
  const a = req.method
  const b = req.url
  const c = new Date().getFullYear()
  console.log(a, b, c)
  // res.send('<h1>On top of res content</h1>') //`only if no subsequent 'res' content on the website. or will use 'next()'`
  next() //`always use 'next()' like what 'return' do in a condition, otherwise, error will come out for the conflict of neighbour functions inside and outside of the condition`
} //`can also be set as a module in another folder, and import in this folder`

app.get('/', middle1, (req, res) => {
  res.send('<h1>HomePage</h1>')
}) //GET / 2023
app.get('/about', middle1, (req, res) => {
  res.send('<h1>AboutPage</h1>')
}) //GET /about 2023
//`invoke 'middle1' as parameter to pass data into '/' or into any other webpage`
(2)*/

/*(3)use '.use()' to short code  
const middle1 = (req, res, next) => {
  const a = req.method
  const b = req.url
  const c = new Date().getFullYear()
  console.log(a, b, c)
  next()
}

const middle2 = (req, res, next) => {
  console.log('hi')
  next()
}

const middle3 = (req, res, next) => {
  const { user } = req.query
  console.log(user) //john `after I refreshed website 'xx?user=john'`; w `after I refreshed website 'xx?user=w'`
  console.log(req.query) //{ user: 'john' } `after I refreshed website 'xx?user=john'`; { user: 'w' } `after I refreshed website 'xx?user=w'`
  if (user === 'john') {
    req.user = { name: 'john', id: 3 }
    next() //`always remember 'next()' in middleware`
  } else {
    res.status(401).send('unauthorized') //`no need to use 'next()' for this line of code is not function, otherwise will lead to an error`
  }
} //`add content to query`

app.get('/', (req, res) => {
  res.send('<h1>HomePage</h1>')
})

// app.use(middle1) //`only apply to 'app.get()' functions below 'app.use()'`
// app.get('/about', (req, res) => {
//   res.send('<h1>AboutPage</h1>')
// }) //GET /about 2023
// app.get('/contact', (req, res) => {
//   res.send('<h1>ContactMe</h1>')
// }) //GET /contact 2023

app.use('/about', [middle1, middle2]) //`only apply to 'app.get()' functions below with path contains '/about'`
//`use '[]' to callback multi functions`

app.get('/about', (req, res) => {
  res.send('<h1>AboutPage</h1>')
}) //①GET / 2023 ②hi
app.get('/about/me', (req, res) => {
  res.send('<h1>AboutMe</h1>')
}) //①GET /me 2023 ②hi
app.get('/contact', middle3, (req, res) => {
  console.log(req.user) //{ name: 'john', id: 3 } `after I refreshed website 'xx?user=john'`;  `nothing print, after I refreshed website 'xx?user=w'`
  res.send('<h1>ContactMe</h1>')
})

app.listen(3000, () => {
  console.log('server is listening on port 3000...')
})
(3)*/

/*6.use third-party middleware 'morgan' to pass data 
const morgan = require('morgan')

app.use(morgan('tiny'))
app.get('/', (req, res) => {
  res.send('hi')
})
//GET / 200 2 - 13.930 ms `after I refreshed website 'xx/'`
app.listen(3000, () => {
  console.log('server is listening on port 3000...')
})
6*/

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

/*8.use '.put()' to change data, 'delete()' to delete data (with app 'postman' to help doing that) 
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
8*/

/*9.use 'router' to destructure code (see full codes in folder 'aExpressRouter' file 'app.js') 9*/
const loginR = require('./router/loginR') //`add import`
const peopleR = require('./router/peopleR') //`add import`

// let { people } = require('./data') `move to file 'peopleR.js'`

app.use(express.static('./methods-public'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// app.post('/login',...) //`move to file 'loginR.js'`
app.use('/login', loginR) //`add path to file 'loginR.js'`

//app.get('/api/people',...)
//app.post('/api/people',...)
//app.post('/api/people/postman',...)
//app.put('/api/people/:id',...)
//app.delete('/api/people/:id',...) //`move to file 'peopleR.js'`
app.use('/api/people', peopleR) //`add path to file 'peopleR.js'`

app.listen(3000, () => {
  console.log('server is listening on port 3000...')
})

/*
'npm i express --save'
`if want to import a special version of express: 'npm i express@4.17.1 --save'`

'npm i morgan'

`use 'postman' app(https://www.postman.com/downloads/) to help check and modify data in the back, using all kinds of method(such as 'GET', 'POST'...)`
`save postman 'collectionName', 'newRequestName'` 
`choose part of website as variable globally or locally, or click 'Environment quick look' to set variable globally, or click 'collectionName' to set variable locally(eg: name 'URL' to website'localhost:3000/api', then can use '{{URL}}/people' as full website)`

'npm i dotenv --save'
`to use '.env' file saving `

`use 'mongoDB'(taught in https://www.youtube.com/watch?v=rltfdjcXjmk) to help deal with data`
0:41:42 - MongoDb Explanation and Set Up
google 'create mongodb atlas' to official document https://www.mongodb.com/docs/atlas/getting-started/ ,1.click 'sign in' on top right of the page,
2.input info and 'sign up' a new account, name new 'organization' and 'project', 

3.choose 'DEPLOYMENT'-'database', '+create', choose 'shared', use default info, name new 'cluster' (if 'terminate', can't retrieve),
4.choose 'SECURITY'-'database access', '+add new database user', choose 'password', input 'name' and 'password', 'add built in role', select 'read and write to any database', 'add user'
5.choose 'SECURITY'-'network access', '+add IP address', choose 'allow access from anywhere', 

6.choose 'DEPLOYMENT'-'database', choose a cluster 'connect', choose 'connect your application', copy 'connection string' and paste in local app code in new file (such as add 'MONGO_URI= ...paste code...' in '.env'; or add 'const connectionString=...paste code...' in 'connectDB.js').

7.also in the cluster, choose 'browse collections', 'add my own data', name 'database' and 'collection', 'insert ducument', choose code type, input code (this step 7 can use 'mongoose' to upload from local app code).
7'.in 'connectDB.js', add 'const mongoose = require('mongoose')', change 'password' and 'database', add 'mongoose.connect(connectionString).then(...).catch(...)'; then import 'require('./connectDB')' in 'app.js'
*/
