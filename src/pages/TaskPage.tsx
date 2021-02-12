/* eslint-disable no-unused-expressions */
import React, { useEffect, useState } from 'react'
import statuses from '../model/Statuses'
import constants from '../helpers/constants'
import { TaskTable } from '../components/TaskTable'
import { TaskInput } from '../components/TaskInput'
import { inputValidation } from '../helpers/validation'
import { get, post, deleteReq, patch } from '../helpers/requests'

interface Task{
    _id : string,
    status : number,
    isEditing : boolean,
    value : string
}

const getTasks = ()=>{
    return get('/tasks/')
}

export function TaskPage() {
    const [tasks, setTasks] = useState<Task[]>([])
    const [currentTask, setCurrentTask] = useState<string>('')


    useEffect( () => {
        getTasks().then( response =>{
            console.log('useEffect', response)
            
            // TODO:
            // setTasks(allTasks)
        })
    }, [])


    const addTask = async (e: React.KeyboardEvent<HTMLInputElement>)=>{
        e.persist()
        
        const value = (e.target as unknown as HTMLInputElement).value
        const validatedValue = inputValidation(value)

        if(e.key === constants.ENTER && validatedValue){
             let newTasks = [{
                value : validatedValue
            }]	
            
            console.log('newTasks', newTasks);
            
            const postedValue = await post('/tasks', newTasks)

            console.log('postedValue', postedValue.data);
            
            // [ postedValue ,...tasks]
            // setTasks(newTasks)

            // e.target.value = null
        }
    }

    const completeTask = async(taskID : string)=>{
        let sendRequest

        const newTasks = [...tasks].map( (task: Task) => {
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
        if(sendRequest){
            await patch(`tasks/${taskID}`,{ status : sendRequest}) 
        }
    }


    const editTask = async(e: React.KeyboardEvent<HTMLInputElement>, taskID: string)=>{
        const value = (e.target as unknown as HTMLInputElement).value

        const validatedInput = inputValidation(value)

        if(e.key === constants.ENTER){   
            const newTasks = updateOrDelete(validatedInput, taskID)
            setTasks(newTasks)
            validatedInput ? await patch(`tasks/${taskID}`, { value: validatedInput}) : await deleteReq(`/tasks/${taskID}`)  
        }
    }


    const updateOrDelete = (validatedInput: string, taskID: string)=>{
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

    const startEditingTask =(taskID : string)=>{
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

    const removeTask = async(taskID : string)=>{
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

        if(sendRequest){
            await deleteReq(`/tasks/${taskID}`)
        }
    }

    const closeEditView = async(taskID : string)=>{
        const validatedInput = inputValidation(currentTask)
        const newTasks = updateOrDelete(validatedInput, taskID)
        setTasks(newTasks)
        setCurrentTask('')

        validatedInput ? await patch(`tasks/${taskID}`, { value: validatedInput}) : await deleteReq(`/tasks/${taskID}`)  
    }

    const taskEditChange =(e: { target: { value: React.SetStateAction<string> } })=>{
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