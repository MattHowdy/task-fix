
const express = require('express');
const app = express();
const cors = require('cors')
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const routes = require('./routes/routes')

dotenv.config()
const PORT = process.env.BACKEND_PORT || 3001


app.use(bodyParser.json({}))
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)
const whitelist = [
    'http://localhost:3001'
]

const corsOptions = {
    origin: function (origin, callback) {
      try {
        if (whitelist.indexOf(origin) !== -1) {
          callback(null, true)
        } else {
          console.log('Bad cors')
          callback(null, true)
        }
      } catch (error) {
        console.log('error in cors')
      }
    },
    credentials: true,
  }
  
app.use(cors(corsOptions))

  
app.use('/', routes)


app.listen(PORT, () => {
 console.log(`server started on port ${PORT}`);
});