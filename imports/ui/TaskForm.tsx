import React, { FormEvent, useState } from 'react'
import {Meteor} from 'meteor/meteor'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'

import './styles/TaskForm.css'

export default () => {
    const [text, setText] = useState('')

    function handleSubmit(event: FormEvent){
        event.preventDefault()

        Meteor.call('tasks.insert', text)
 
        setText('')
    }

    return (
        <form id="taskForm" onSubmit={handleSubmit}>
            <TextField 
                label="Name a task" 
                type="text"
                value={text}
                onChange={event => setText(event.target.value)}
                placeholder="Name a task..."
                required 
            />

            <Button type="submit" variant="contained" color="primary" >Add task</Button>
        </form>
    )
}