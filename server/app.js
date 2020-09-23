
const express = require('express');
const app = express();
const cors = require('cors')
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const path = require('path')
const routes = require('./routes/routes')
// const mongoose = require('mongoose')


dotenv.config()
const PORT = process.env.BACKEND_PORT || 4001

// mongoose.set('useFindAndModify', false)
// mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })

// client refers to react app
//Static file declaration
app.use(express.static(path.join(__dirname, 'src/build')));

//production mode
if(process.env.NODE_ENV === 'production') {  
    app.use(express.static(path.join(__dirname, '/build')));  
    
    app.get('*', (req, res) => {    
        // eslint-disable-next-line no-native-reassign
        res.sendfile(path.join('/build/index.html'));  })
}

//build mode
//  app.get('*', (req, res) => 
//     {  res.sendFile(path.join('/public/index.html'));
// })



app.use(bodyParser.json({}))
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)
// const whitelist = [
//     'http://localhost:4001'
// ]

// const corsOptions = {
//     origin: function (origin, callback) {
//       try {
//         if (whitelist.indexOf(origin) !== -1) {
//           callback(null, true)
//         } else {
//           console.log('Bad cors')
//           callback(null, true)
//         }
//       } catch (error) {
//         console.log('error in cors')
//       }
//     },
//     credentials: true,
//   }
  
// app.use(cors(corsOptions))

  
app.use('/', routes)


app.listen(PORT, () => {
 console.log(`server started on port ${PORT}`);
});