import React from "react";
import statuses from '../model/Statuses'


const TaskTable = (props) => {

    const renderEditView = (task)=>{
        return <div className='sideBySide'>
                <input
                    autoFocus
                    defaultValue={task.value}
                    onKeyPress={(e)=>props.onEditTask(e, task._id)}
                    onChange={(e)=>props.onTaskEditChange(e)}
                />
                <div onClick={()=>props.onCloseEditView(task._id)}>OK</div>
            </div>
    }

    const renderDefaultView =(task)=>{
        return <div 
                className={ task.status === statuses.COMPLETED ? 'completedTask' : null}
                onDoubleClick={()=>props.onStartEditingTask(task._id)}
                >
                {task.value}
            </div>
    }

    const renderCheckbox =(task)=>{
        return <input 
                type="checkbox" 
                value={task._id} 
                onClick={()=>props.onCompleteTask(task._id)} 
                defaultChecked={task.status === statuses.COMPLETED ? 'checked' : ''}
            />
    }

    const renderRemoveButton =(task)=>{
        return <button  onClick={ ()=>props.onRemoveTask(task._id) }>
                    x
                </button>
    }
        return  (
            <div>
                <h2> My tasks </h2>
                    { props.tasks ? 
                     props.tasks.map((task, index) => {
                        if(task.status !== statuses.DELETED){
                            return (
                                <div key={ 'taskid-' + index} className="sideBySide">
                                    { renderCheckbox(task)}
                              
                                    { task.isEditing ?
                                        renderEditView(task)
                                        : renderDefaultView(task)                                    
                                    }

                                  {renderRemoveButton(task)}
                                </div>
                            )
                        }
                    }) 
                    : null}
            </div>)
    
};

export default TaskTable;