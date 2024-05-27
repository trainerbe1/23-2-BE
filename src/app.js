import {web} from "./library/web.js";
const port=5000
web.get('/', (req, res) => {
  res.send('Hello World!')
})

web.listen(port, () => {
  console.log(`mealmastery app listening on port ${port}`)
})


