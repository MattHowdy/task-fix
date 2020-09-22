import React, { Component } from 'react';
import statuses from '../helpers/Statuses'
import constants from '../helpers/constants'
import TaskTable from '../components/TaskTable';
import TaskInput from '../components/TaskInput';


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


    render() {
        return (
            <div >
                <TaskInput onAddTask={this.addTask} />

                <TaskTable 
                    tasks={this.state.tasks}
                    onCompleteTask={this.completeTask}
                    onEditTask={this.editTask}
                    onStartEditingTask={this.startEditingTask}
                    onRemoveTask={this.removeTask}
                />
            </div>
        );
    }
}

export default TaskPage;