
import React from 'react';


interface Props{
    // onAddTask(e: React.ChangeEvent<HTMLInputElement>) : void
    onAddTask(e: React.KeyboardEvent<HTMLInputElement>): void;
}
export function TaskInput(props: Props) {

    return ( 
        <div className='TaskInput'>
            <h1>Tasks to Fix</h1>
            <input 
                placeholder="Add a task.."
                onKeyPress={(e)=>props.onAddTask(e)}
            />
        </div>
    )
}
