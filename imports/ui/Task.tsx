import React from 'react'
import Checkbox from '@material-ui/core/Checkbox'
import CloseIcon from '@material-ui/icons/Close';
import {OptionalId} from 'mongodb';

import './styles/Task.css'

interface TaskProps{
    _id: number | string,
    text: string | OptionalId<unknown | any>,
    isChecked: boolean
}

interface TaskComponentProps{
    task: TaskProps
    onCheckBoxClick: (task: TaskProps) => void
    onDeleteClick: (task: TaskProps) => void
}

const Task: React.FC<TaskComponentProps> = ({task, onCheckBoxClick, onDeleteClick}) => {

    return(
        <li id="taskList">
            <Checkbox 
                color="primary"
                readOnly
                checked={!task.isChecked}
                onClick={() => onCheckBoxClick(task)}
            />

            <span>{task.text}</span>
            <button onClick={() => onDeleteClick(task)}>
                <CloseIcon color="secondary"/>
            </button>
        </li>
    )
}

export {Task, TaskProps}