const express = require('express')

const app = express()
app.disable('x-powered-by')
const port = process.env.PORT ?? 3000
const charizardJSON = require('./pokemon/charizard.json')

app.use((req, res, next) => {
  const { method } = req
  switch (method) {
    case 'POST':{
      let body = ''
      req.on('data', (chunk) => {
        body += chunk.toString()
      })
      req.on('end', () => {
        const data = JSON.parse(body)
        data.timestamp = Date.now()
        req.body = data
        next()
      })
    }
      break

    default:
      next()
      break
  }
})

app.get('/', (req, res) => {
  res.send('Hello World, from Express')
})

app.get('/pokemon', (req, res) => {
  res.json(charizardJSON)
})

app.post('/create', (req, res) => {
  res.status(201).json(req.body)
})

app.use((req, res) => {
  res.status(404).send('Not found')
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
