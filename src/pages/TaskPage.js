import React, { Component } from 'react';
import statuses from '../helpers/Statuses'
import constants from '../helpers/constants'


class TaskPage extends Component {
    state={
        tasks:[ 
            { 
                id : 1,
                status: statuses.ACTIVE,
                value : 'new task',
                isEditing : false
            },{
                id : 2,
                status: statuses.COMPLETED,
                value :  'again a task',
                isEditing : false
            }
        ]
    }

    
    addTask = (e)=>{
        if(e.key === constants.ENTER && e.target.value){

            let newTasks = [...this.state.tasks, {
                
                id : this.state.tasks.length + 1,
                status: statuses.ACTIVE, 
                value : e.target.value,
                isEditing: false
            }]
            this.setState({tasks : newTasks, newTask : null})
            e.target.value = null
        }
    }


    completeTask = (taskID)=>{
        const allTasks = [...this.state.tasks].map( stateTask => {
            if(stateTask.id === taskID){
                if(stateTask.status === statuses.COMPLETED){
                    stateTask.status = statuses.ACTIVE
                }else if( stateTask.status === statuses.ACTIVE){
                    stateTask.status = statuses.COMPLETED
                }
            }
            return stateTask
        }) 
        this.setState({ tasks : allTasks })
    }
    
    removeTask =(taskID)=>{
        const allTasks = [...this.state.tasks].map( stateTask => {
            if(stateTask.id === taskID){
                stateTask.status = statuses.DELETED
            }
            return stateTask
        })
        this.setState({ tasks : allTasks })
    }


    startEditingTask =(taskID)=>{
        const allTasks = [...this.state.tasks].map( stateTask => {
            if(stateTask.id === taskID){
                stateTask.isEditing = true
            }
            return stateTask
        })
        this.setState({ tasks : allTasks })
    }


    editTask =(e, taskID)=>{
        if(e.key === constants.ENTER){

            const newTasks = [...this.state.tasks].map(stateTask =>{
                if(stateTask.id === taskID && stateTask.status === statuses.ACTIVE){
                    stateTask.isEditing = false
                    stateTask.value = e.target.value
                }
                return stateTask
            })
        
            this.setState({tasks : newTasks})
        }

    }

    renderTasks = ()=>{
        if(this.state.tasks){
            return this.state.tasks.map((task, index) => {
                if(task.status !== statuses.DELETED){
                    return (
                        <div key={ 'taskid-' + index} className="sideBySide">
                            <input 
                                type="checkbox" 
                                value={task.id} 
                                onClick={()=>this.completeTask(task.id)} 
                                defaultChecked={task.status === statuses.COMPLETED ? 'checked' : ''}
                            />

                            { task.isEditing ? 
                            (
                                <input 
                                    defaultValue={task.value}
                                    onKeyPress={(e, taskID)=>this.editTask(e, task.id)}
                                />
                            )
                            :
                            (
                                <div 
                                    className={ task.status === statuses.COMPLETED ? 'completedTask' : null}
                                    onDoubleClick={()=>this.startEditingTask(task.id)}
                                    >
                                    {task.value}
                                </div>
                            ) 
                            
                            }

                            <button 
                                onClick={ ()=>this.removeTask(task.id) }
                            >
                                x
                            </button>
                        </div>
                    )
                }
            })
        }
    }

    render() {

        return (
            <div>
                <h1>Task Manager</h1>
                <input 
                    placeholder="Add a task.."
                    onKeyPress={(e)=>this.addTask(e)}
                />


                <h2> My tasks </h2>
                { this.renderTasks()}
                
            </div>
        );
    }
}

export default TaskPage;