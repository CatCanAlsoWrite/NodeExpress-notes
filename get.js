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

/*4.use API/Application Program Interface to read data and send data of json code to build a website/httpInterface ('content-type: application/json' in 'Headers' in 'Network' in inspect tool) 
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

/*6.use third-party middleware 'morgan' to pass data  */
const morgan = require('morgan')

app.use(morgan('tiny'))
app.get('/', (req, res) => {
  res.send('hi')
})
//GET / 200 2 - 13.930 ms `after I refreshed website 'xx/'`
app.listen(3000, () => {
  console.log('server is listening on port 3000...')
})
