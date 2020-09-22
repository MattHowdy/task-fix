const express = require('express')
const router = express.Router()


router.get('/', (req, res) => { 
    res.send({'status': 'ok'})
});

router.get('/tasks', (req, res) => { 
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


router.post('/tasks/add-task', async(req,res)=>{
    const newTask = req.body.task

    console.log('newTask', newTask);

    // res.send({ task : newTask})
    res.sendStatus(200)
})


module.exports = router ;
