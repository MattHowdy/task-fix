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
        newTask : '',
        loading : false
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

            // this.setState({ loading : true})
            await post('/tasks/create', {task : validatedValue})
            e.target.value = null           
            this.setState({ loading : false}) 
        }
    }


    completeTask = (taskID)=>{
        const tasks = [...this.state.tasks].map( stateTask => {
            if(stateTask._id === taskID){
                if(stateTask.status === statuses.COMPLETED){
                    stateTask.status = statuses.ACTIVE
                }else if( stateTask.status === statuses.ACTIVE){
                    stateTask.status = statuses.COMPLETED
                }
            }
            return stateTask
        }) 
        this.setState({ tasks })
    }
    
    removeTask = async(taskID)=>{
        // TODO
        await deleteReq(`/tasks/delete/${taskID}`)
            // .then( res => this.refreshTaskList())



        // const allTasks = [...this.state.tasks].map( stateTask => {
        //     if(stateTask._id === taskID){
        //         stateTask.status = statuses.DELETED
        //         stateTask.isEditing = false
        //     }
        //     return stateTask
        // })
        // this.setState({ tasks : allTasks })
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

            if(validatedInput){
                await patch(`tasks/update/${taskID}`, { value: validatedInput})
            }else{
                await deleteReq(`/tasks/delete/${taskID}`)  
            }

            // const tasks = [...this.state.tasks].map(stateTask =>{
            //     if(stateTask._id === taskID && stateTask.status === statuses.ACTIVE){

            //         if(validatedInput){
            //             stateTask.isEditing = false
            //             stateTask.value = validatedInput
            //         }else{
            //             stateTask.status = statuses.DELETED
            //         }
            //     }
            //     return stateTask
            // })
        
            // this.setState({tasks })
        }
    }

    taskEditChange =(e)=>{
        this.setState({ currentTask : e.target.value})
    }

    closeEditView = async(taskID)=>{
        const validatedInput = inputValidation(this.state.currentTask)
    
        if(validatedInput){
            await patch(`tasks/update/${taskID}`, { value: validatedInput})
        }else{
            await deleteReq(`/tasks/delete/${taskID}`)  
        }

        // const allTasks = [...this.state.tasks].map( (stateTask) =>{
        //     if(stateTask._id === taskID && stateTask.status === statuses.ACTIVE ){
        //         stateTask.isEditing = false

        //         if(validatedInput){
        //             stateTask.value = validatedInput
        //         }else{
                    
        //             stateTask.status = statuses.DELETED
        //         }
        //     }
        //     return stateTask
        // })

        // this.setState({tasks : allTasks, currentTask : ''})
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