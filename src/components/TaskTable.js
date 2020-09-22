import React from 'react';
import statuses from '../helpers/Statuses'


const TaskTable = (props) => {


        return  (
            <div>
                <h2> My tasks </h2>

                    { props.tasks.map((task, index) => {
                        if(task.status !== statuses.DELETED){
                            return (
                                <div key={ 'taskid-' + index} className="sideBySide">
                                    <input 
                                        type="checkbox" 
                                        value={task.id} 
                                        onClick={()=>props.onCompleteTask(task.id)} 
                                        defaultChecked={task.status === statuses.COMPLETED ? 'checked' : ''}
                                    />

                                    { task.isEditing ? 
                                    (
                                        <input 
                                            defaultValue={task.value}
                                            onKeyPress={(e, taskID)=>props.onEditTask(e, task.id)}
                                        />
                                    )
                                    :
                                    (
                                        <div 
                                            className={ task.status === statuses.COMPLETED ? 'completedTask' : null}
                                            onDoubleClick={()=>props.onStartEditingTask(task.id)}
                                            >
                                            {task.value}
                                        </div>
                                    ) 
                                    
                                    }

                                    <button 
                                        onClick={ ()=>props.onRemoveTask(task.id) }
                                    >
                                        x
                                    </button>
                                </div>
                            )
                        }
                    })}
            </div>)
    
};

export default TaskTable;