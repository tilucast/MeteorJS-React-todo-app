import { Meteor } from 'meteor/meteor'
import React, { FormEvent, useState } from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert'

import './styles/LoginForm.css'

export const LoginForm = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [severity, setSeverity] = useState<"error" | "success" | "info" | "warning" | undefined>()
    const [open, setOpen] = useState(Boolean)
    const [message, setMessage] = useState('')

    function handleClose(event: React.SyntheticEvent, reason?: string){
        if(reason === 'clickaway'){
            return
        }

        setOpen(false)
    }

    const handleFormSubmit = (event: FormEvent) => {
        event.preventDefault()

        Meteor.loginWithPassword(username, password, 
            (error: Error | Meteor.Error | Meteor.TypedError | undefined) => {
                if(error){
                    setMessage(error.reason)
                    setOpen(true)
                    return setSeverity("error")
                }
            })
    }

    return (
        <form id="loginForm" onSubmit={handleFormSubmit} noValidate={false}>
            <TextField
                variant="standard"
                label="Your username"
                placeholder="Username"
                value={username}
                onChange={event => setUsername(event.target.value)}
                required
            />

            <TextField
                variant="standard"
                label="Your password"
                placeholder="Password"
                value={password}
                onChange={event => setPassword(event.target.value)}
                required
            />

            <Button  variant="outlined" color="secondary" type="submit">Log In</Button>

            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
                <MuiAlert onClose={handleClose} severity={severity} variant="filled">
                    {severity && message}
                </MuiAlert>
            </Snackbar>
        </form>
    )
}