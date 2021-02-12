/* eslint-disable array-callback-return */
import React from "react";
import STATUS from '../model/Statuses'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWindowClose } from '@fortawesome/free-solid-svg-icons'



interface Props {
    tasks: Task[];
    onRemoveTask(_id: any): void;
    onCompleteTask(_id: any): void;
    onStartEditingTask(_id: any): void;
    onCloseEditView(_id: any): void;
    onTaskEditChange(e: React.ChangeEvent<HTMLInputElement>): void;
    onEditTask(e: React.KeyboardEvent<HTMLInputElement>, _id: any): void;
}

interface Task {
    isEditing: any;
    status: number;
    _id: any;
    value: string | number | readonly string[] | undefined;
}


export function TaskTable(props: Props) {

    const renderEditView = (task: Task) => {
        return <div className='flex'>
            <input
                autoFocus
                defaultValue={task.value}
                onKeyPress={(e) => props.onEditTask(e, task._id)}
                onChange={(e) => props.onTaskEditChange(e)}
            />
            <div onClick={() => props.onCloseEditView(task._id)} className="CompleteBtn">
                OK
                </div>
        </div>
    }

    const renderDefaultView = (task: Task) => {
        return <div
            className={task.status === STATUS.COMPLETED ? 'CompletedTask Text' : 'Text'}
            onDoubleClick={() => props.onStartEditingTask(task._id)}
        >
            {task.value}
        </div>
    }

    const renderCheckbox = (task: Task) => {
        return <input
            type="checkbox"
            value={task._id}
            onClick={() => props.onCompleteTask(task._id)}
            defaultChecked={task.status === STATUS.COMPLETED}
        />
    }

    const renderRemoveButton = (task: Task) => {
        return <div onClick={() => props.onRemoveTask(task._id)} >
            <FontAwesomeIcon icon={faWindowClose} className="RemoveBtn" size="lg" />
        </div>
    }
    return (
        <div className='TaskTable'>
            <h2> My tasks </h2>
            <div className='Tasks'>
                {props.tasks ?
                    props.tasks.map((task, index) => {
                        if (task.status !== STATUS.DELETED) {
                            return (
                                <div key={'taskid-' + index} className="Task sideBySide">
                                    { renderCheckbox(task)}

                                    { task.isEditing ?
                                        renderEditView(task)
                                        : renderDefaultView(task)
                                    }
                                    { task.status !== STATUS.ACTIVE ?
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