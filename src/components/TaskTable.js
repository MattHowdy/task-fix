import React from "react";
import statuses from '../helpers/Statuses'


const TaskTable = (props) => {

    const renderEditView = (task)=>{
        return <div className='sideBySide'>
                <input
                    autoFocus
                    defaultValue={task.value}
                    onKeyPress={(e)=>props.onEditTask(e, task.id)}
                    onChange={(e)=>props.onTaskEditChange(e)}
                />
                <div onClick={()=>props.onCloseEditView(task.id)}>OK</div>
            </div>
    }

    const renderDefaultView =(task)=>{
        return <div 
                className={ task.status === statuses.COMPLETED ? 'completedTask' : null}
                onDoubleClick={()=>props.onStartEditingTask(task.id)}
                >
                {task.value}
            </div>
    }

    const renderCheckbox =(task)=>{
        return <input 
                type="checkbox" 
                value={task.id} 
                onClick={()=>props.onCompleteTask(task.id)} 
                defaultChecked={task.status === statuses.COMPLETED ? 'checked' : ''}
            />
    }

    const renderCloseButton =(task)=>{
        return <button  onClick={ ()=>props.onRemoveTask(task.id) }>
                    x
                </button>
    }
        return  (
            <div>
                <h2> My tasks </h2>

                    { props.tasks.map((task, index) => {
                        if(task.status !== statuses.DELETED){
                            return (
                                <div key={ 'taskid-' + index} className="sideBySide">
                                    { renderCheckbox(task)}
                              
                                    { task.isEditing ?
                                        renderEditView(task)
                                        : renderDefaultView(task)                                    
                                    }

                                  {renderCloseButton(task)}
                                </div>
                            )
                        }
                    })}
            </div>)
    
};

export default TaskTable;