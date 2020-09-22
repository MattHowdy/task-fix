
import React from 'react';


const TaskInput = (props) => {

    return ( 
        <div>
            <h1>Task Manager</h1>
            <input 
                placeholder="Add a task.."
                onKeyPress={(e)=>props.onAddTask(e)}
            />
        </div>
    )
}


export default TaskInput