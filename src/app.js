const express = require('express')
const app = express()
const helmet = require('helmet')
const port = 3000


app.use(helmet())
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`mealmastery app listening on port ${port}`)
})