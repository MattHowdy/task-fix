
import React from 'react';


const TaskInput = (props) => {

    return ( 
        <div className='TaskInput'>
            <h1>Tasks to Fix</h1>
            <input 
                placeholder="Add a task.."
                onKeyPress={(e)=>props.onAddTask(e)}
            />
        </div>
    )
}


export default TaskInput