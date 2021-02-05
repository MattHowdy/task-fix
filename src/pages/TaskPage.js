/* eslint-disable no-unused-expressions */
import React, { useEffect, useState } from 'react';
import statuses from '../model/Statuses'
import constants from '../helpers/constants'
import { TaskTable } from '../components/TaskTable';
import { TaskInput } from '../components/TaskInput';
import { inputValidation } from '../helpers/validation'
import { get, post, deleteReq, patch } from '../helpers/requests'
import { ObjectID } from 'bson';


export function TaskPage() {
    const [tasks, setTasks] = useState([])
    const [currentTask, setCurrentTask] = useState('')

    useEffect(() => {
        async () => {
            const allTasks = await get('/tasks/')
            setTasks(allTasks)
        }
    }, [])


    const addTask = (e)=>{
        e.persist()
        const validatedValue = inputValidation(e.target.value)

        if(e.key === constants.ENTER && validatedValue){
             let newTasks = [{	
                _id : new ObjectID(),
                status: statuses.ACTIVE,
                value : validatedValue,	
                isEditing: false
            }, ...tasks]	
            
            setTasks(newTasks)
            e.target.value = null

            post('/tasks', {task : validatedValue})
        }
    }

    const completeTask = async(taskID)=>{
        let sendRequest = ''

        const newTasks = [...tasks].map( task => {
            if(task._id === taskID){
                if(task.status === statuses.COMPLETED){
                    task.status = statuses.ACTIVE
                }else if( task.status === statuses.ACTIVE){
                    task.status = statuses.COMPLETED
                }
                sendRequest = task.status
            }
            return task
        }) 
        setTasks(newTasks)
        sendRequest ? await patch(`tasks/${taskID}`, { status : sendRequest}) : null
    }


    const editTask = async(e, taskID)=>{
        const validatedInput = inputValidation(e.target.value)

        if(e.key === constants.ENTER){   
            const newTasks = updateOrDelete(validatedInput, taskID)
            setTasks(newTasks)
            validatedInput ? await patch(`tasks/${taskID}`, { value: validatedInput}) : await deleteReq(`/tasks/${taskID}`)  
        }
    }


    const updateOrDelete = (validatedInput, taskID)=>{
        return [...tasks].map(task =>{
            if(task._id === taskID && task.status === statuses.ACTIVE){
                if(validatedInput){
                    task.isEditing = false
                    task.value = validatedInput
                }else{
                    task.status = statuses.DELETED
                }
            }
            return task
        })
    }

    const startEditingTask =(taskID)=>{
        const isAnyTaskInEditing = [...tasks].filter(task => task.isEditing === true).length === 0

        if(isAnyTaskInEditing){
            const newTasks = [...tasks].map( task => {
                if(task._id === taskID && task.status === statuses.ACTIVE){
                    task.isEditing = true
                }
                return task
            })
            setTasks(newTasks)
        }
    }

    const removeTask = async(taskID)=>{
        let sendRequest = false 

        const newTasks = [...tasks].map( task => {
            if(task._id === taskID){
                sendRequest = true
                task.status = statuses.DELETED
                task.isEditing = false
            }
            return task
        })
        setTasks(newTasks)

        sendRequest ? await deleteReq(`/tasks/${taskID}`) : null
    }

    const closeEditView = async(taskID)=>{
        const validatedInput = inputValidation(currentTask)
        const newTasks = this.updateOrDelete(validatedInput, taskID)
        setTasks(newTasks)
        setCurrentTask('')

        validatedInput ? await patch(`tasks/${taskID}`, { value: validatedInput}) : await deleteReq(`/tasks/${taskID}`)  
    }

    const taskEditChange =(e)=>{
        setCurrentTask(e.target.value)
    }

    return (
        <div className='TaskPageContainer'>
            <TaskInput onAddTask={addTask} />

            <TaskTable
                tasks={tasks}
                onCompleteTask={completeTask}
                onEditTask={editTask}
                onStartEditingTask={startEditingTask}
                onRemoveTask={removeTask}
                onCloseEditView={closeEditView}
                onTaskEditChange={taskEditChange}
            />
        </div>
    )
}