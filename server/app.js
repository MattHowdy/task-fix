
const express = require('express');
const app = express();
const cors = require('cors')
const dotenv = require('dotenv')
const bodyParser = require('body-parser')


dotenv.config()
const PORT = process.env.PORT || 3001

app.get('/', (req, res) => { 
    res.send({'status': 'ok'})
});

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


app.get('/tasks', (req, res) => { 
    const tasks = [ 
        { 
            id : 1,
            status: 1,
            value : 'new task from backend',
            isEditing : false
        },{
            id : 2,
            status: 2,
            value :  'again from backend',
            isEditing : false
        }
    ]

    res.send({'tasks': tasks})
});


app.post('/tasks/add-task', async(req,res)=>{
    const newTask = req.body.tasks

    console.log('newTask', newTask);

    res.sendStatus(200)
})



app.listen(PORT, () => {
 console.log(`server started on port ${PORT}`);
});