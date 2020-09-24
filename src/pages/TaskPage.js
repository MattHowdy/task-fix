/* eslint-disable no-unused-expressions */
import React, { Component } from 'react';
import statuses from '../model/Statuses'
import constants from '../helpers/constants'
import TaskTable from '../components/TaskTable';
import TaskInput from '../components/TaskInput';
import { inputValidation } from '../helpers/validation'
import { get, post, deleteReq, patch } from '../helpers/requests'

class TaskPage extends Component {
    state={
        tasks:[],
        currentTask : '',
        newTask : ''
    }
    
    componentDidMount = async()=>{
        await get('/tasks')
            .then(this.refreshTasks)
    }

    refreshTasks = tasks => this.setState({ tasks })

    refreshTaskList = () => this.setState({tasks: !this.state.tasks})


    addTask = async (e)=>{
        e.persist()
        const validatedValue = inputValidation(e.target.value)

        if(e.key === constants.ENTER && validatedValue){
             let tasks = [...this.state.tasks, {	
                status: statuses.ACTIVE,
                value : validatedValue,	
                isEditing: false
            }]	
            this.setState({tasks})
            e.target.value = null

            await post('/tasks/create', {task : validatedValue})
        }
    }

    
    removeTask = async(taskID)=>{
        let sendRequest = false 

        const tasks = [...this.state.tasks].map( stateTask => {
            if(stateTask._id === taskID){
                sendRequest = true
                stateTask.status = statuses.DELETED
                stateTask.isEditing = false
            }
            return stateTask
        })
        this.setState({ tasks })

        sendRequest ? await deleteReq(`/tasks/delete/${taskID}`) : null
    }


    completeTask = async(taskID)=>{
        let sendRequest = ''

        const tasks = [...this.state.tasks].map( stateTask => {
            if(stateTask._id === taskID){
                if(stateTask.status === statuses.COMPLETED){
                    stateTask.status = statuses.ACTIVE
                }else if( stateTask.status === statuses.ACTIVE){
                    stateTask.status = statuses.COMPLETED
                }
                sendRequest = stateTask.status
            }
            return stateTask
        }) 
        this.setState({ tasks })

        sendRequest ? await patch(`tasks/update/${taskID}`, { status : sendRequest}) : null
    }


    startEditingTask =(taskID)=>{
        const isAnyTaskInEditing = [...this.state.tasks].filter(stateTask => stateTask.isEditing === true).length === 0

        if(isAnyTaskInEditing){
            const tasks = [...this.state.tasks].map( stateTask => {
                if(stateTask._id === taskID && stateTask.status === statuses.ACTIVE){
                    stateTask.isEditing = true
                }
                return stateTask
            })
            this.setState({ tasks })
        }
    }


    editTask = async(e, taskID)=>{
        const validatedInput = inputValidation(e.target.value)

        if(e.key === constants.ENTER){
            const tasks = [...this.state.tasks].map(stateTask =>{
                if(stateTask._id === taskID && stateTask.status === statuses.ACTIVE){
                    if(validatedInput){
                        stateTask.isEditing = false
                        stateTask.value = validatedInput
                    }else{
                        stateTask.status = statuses.DELETED
                    }
                }
                return stateTask
            })
        
            this.setState({tasks })

            validatedInput ? await patch(`tasks/update/${taskID}`, { value: validatedInput}) : await deleteReq(`/tasks/delete/${taskID}`)  
        }
    }

    taskEditChange =(e)=>{
        this.setState({ currentTask : e.target.value})
    }

    closeEditView = async(taskID)=>{
        const validatedInput = inputValidation(this.state.currentTask)

        const tasks = [...this.state.tasks].map( (stateTask) =>{
            if(stateTask._id === taskID && stateTask.status === statuses.ACTIVE ){
                stateTask.isEditing = false
                if(validatedInput){
                    stateTask.value = validatedInput
                }else{
                    stateTask.status = statuses.DELETED
                }
            }
            return stateTask
        })
        this.setState({ tasks, currentTask : ''})

        validatedInput ? await patch(`tasks/update/${taskID}`, { value: validatedInput}) : await deleteReq(`/tasks/delete/${taskID}`)  
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