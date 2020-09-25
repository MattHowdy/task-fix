/* eslint-disable array-callback-return */
import React from "react";
import statuses from '../model/Statuses'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWindowClose } from '@fortawesome/free-solid-svg-icons'


const TaskTable = (props) => {

    const renderEditView = (task)=>{
        return <div className='sideBySide'>
                <input
                    autoFocus
                    defaultValue={task.value}
                    onKeyPress={(e)=>props.onEditTask(e, task._id)}
                    onChange={(e)=>props.onTaskEditChange(e)}
                />
                <div onClick={()=>props.onCloseEditView(task._id)} className="CompleteBtn">
                    OK
                </div>
            </div>
    }

    const renderDefaultView =(task)=>{
        return <div 
                className={ task.status === statuses.COMPLETED ? 'completedTask Text' : 'Text'}
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
        return <div onClick={ ()=>props.onRemoveTask(task._id) } >
            <FontAwesomeIcon icon={faWindowClose} className="RemoveBtn" size="lg" />
        </div>
    }
        return  (
            <div className='TaskTable'>
                <h2> My tasks </h2>
                <div className='Tasks'>
                    { props.tasks ? 
                     props.tasks.map((task, index) => {
                        if(task.status !== statuses.DELETED){
                            return (
                                <div key={ 'taskid-' + index} className="Task sideBySide">
                                    { renderCheckbox(task)}
                              
                                    { task.isEditing ?
                                        renderEditView(task)
                                        : renderDefaultView(task)                                    
                                    }
                                 { task.status !== statuses.ACTIVE ?
                                  renderRemoveButton(task) :
                                  null
                                }
                                </div>
                            )
                        }
                    }) 
                    : null}
                </div>
            </div>)
    
};

export default TaskTable;