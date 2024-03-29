const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const WebpackConfig = require('./webpack.config')

require('./server2')

const app = express()
const compiler = webpack(WebpackConfig)

app.use(webpackDevMiddleware(compiler, {
  publicPath: '/__build__/',
  stats: {
    colors: true,
    chunks: false
  }
}))

app.use(webpackHotMiddleware(compiler))

app.use(express.static(__dirname))

app.use(bodyParser.json())
// app.use(bodyParser.text())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())

const router = express.Router()

router.get('/simple/get', function (req, res) {
  res.json({
    msg: 'hello world'
  })
})

router.get('/base/get', function (req, res) {
  res.json(req.query)
})

router.post('/base/post', function (req, res) {
  res.json(req.body)
})

router.post('/base/buffer', function (req, res) {
  let msg = []
  req.on('data', (chunk) => {
    if (chunk) {
      msg / pushd(chunk)
    }
  })
  req.on('end', () => {
    let buf = Buffer.concat(msg)
    res.json(buf.toJSON())
  })
})


router.get('/error/get', function (req, res) {
  if (Math.random() > 0.5) {
    res.json({
      msg: 'hello world'
    })
  } else {
    res.status(500)
    res.end()
  }
})

router.get('/error/timeout', function (req, res) {
  setTimeout(() => {
    res.json({
      msg: 'hello world'
    })
  }, 3000)
})

router.get('/extend/get', (req, res) => {
  res.json({
    msg: 'hello world'
  })
})

router.options('/extend/options', (req, res) => {
  res.end()
})

router.delete('/extend/delete', (req, res) => {
  res.end()
})

router.head('/extend/head', (req, res) => {
  res.end()
})

router.post('/extend/post', (req, res) => {
  res.json(req.body)
})

router.put('/extend/put', (req, res) => {
  res.json(req.body)
})

router.patch('/extend/patch', (req, res) => {
  res.json(req.body)
})

router.get('/extend/user', (req, res) => {
  res.json({
    code: 0,
    message: 'ok',
    result: {
      name: 'jack',
      age: 18
    }
  })
})

router.get('/interceptor/get', (req, res) => {
  res.end('hello')
})

router.post('/config/post', (req, res) => {
  res.json(req.body)
})

router.get('/cancel/get', function (req, res) {
  setTimeout(() => {
    res.json('hello')
  }, 1000);
})

router.post('/cancel/post', function (req, res) {
  setTimeout(() => {
    res.json(req.body)
  }, 1000);
})

router.get('/more/get', function(req, res) {
  res.json(req.cookies)
})

app.use(router)

const port = process.env.PORT || 8080
module.exports = app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}, Ctrl+C to stop`)
})
