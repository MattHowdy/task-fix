import React, { Component } from 'react';
import statuses from '../helpers/Statuses'
import constants from '../helpers/constants'
import TaskTable from '../components/TaskTable';
import TaskInput from '../components/TaskInput';
import validation from '../helpers/validation'
import axios from 'axios'


class TaskPage extends Component {
    state={
        tasks:[],
        currentTask : ''
    }
    
    componentDidMount = async()=>{
        const res = await axios.get('http://localhost:3001/tasks')
        this.setState({ tasks: res.data.tasks})
    }


    addTask = (e)=>{
        let validatedValue = validation.input(e.target.value)

        if(e.key === constants.ENTER && validatedValue){

            let newTasks = [...this.state.tasks, {
                
                id : this.state.tasks.length + 1,
                status: statuses.ACTIVE, 
                value : validatedValue,
                isEditing: false
            }]
            this.setState({tasks : newTasks, newTask : null})
            e.target.value = null
        }

        axios.post('http://localhost:3001/tasks/add-task', {tasks : this.state.tasks})
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
                stateTask.isEditing = false
            }
            return stateTask
        })
        this.setState({ tasks : allTasks })
    }


    startEditingTask =(taskID)=>{

        const isAnyTaskInEditing = [...this.state.tasks].filter(stateTask => stateTask.isEditing === true).length === 0

        if(isAnyTaskInEditing){
            const allTasks = [...this.state.tasks].map( stateTask => {
                if(stateTask.id === taskID && stateTask.status === statuses.ACTIVE){
                    stateTask.isEditing = true
                }
                return stateTask
            })
            this.setState({ tasks : allTasks })
        }
    }


    editTask =(e, taskID)=>{
        const validatedInput = validation.input(e.target.value)

        if(e.key === constants.ENTER){

            const newTasks = [...this.state.tasks].map(stateTask =>{
                if(stateTask.id === taskID && stateTask.status === statuses.ACTIVE){

                    if(validatedInput){
                        stateTask.isEditing = false
                        stateTask.value = validatedInput
                    }else{
                        stateTask.status = statuses.DELETED
                    }
                }
                return stateTask
            })
        
            this.setState({tasks : newTasks})
        }
    }

    taskEditChange =(e)=>{
        this.setState({ currentTask : e.target.value})
    }

    closeEditView = (taskID)=>{
        const validatedInput = validation.input(this.state.currentTask)

        const allTasks = [...this.state.tasks].map(stateTask =>{
            if(stateTask.id === taskID && stateTask.status === statuses.ACTIVE ){
                stateTask.isEditing = false

                if(validatedInput){
                    stateTask.value = validatedInput
                }else{
                    stateTask.status = statuses.DELETED
                }
            }
            return stateTask
        })
    
        this.setState({tasks : allTasks, currentTask : ''})
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
                    onCloseEditView={this.closeEditView}
                    onTaskEditChange={this.taskEditChange}
                />
            </div>
        );
    }
}

export default TaskPage;