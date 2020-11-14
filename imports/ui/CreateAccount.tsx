import React, { FormEvent, useState } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert'
import {Meteor} from 'meteor/meteor'

import './styles/CreateAccount.css'
import './styles/LoginForm.css'

interface errorClass{
    details: string,
    error: string,
    errorType: string,
    reason: string,
    message: string,
    isClientSafe: boolean,
    stack: string,
}

export default function CreateAccount(){

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [severity, setSeverity] = useState<"error" | "success" | "info" | "warning" | undefined>()
    const [open, setOpen] = useState(Boolean)

    function handleClose(event: React.SyntheticEvent, reason?: string){
        if(reason === 'clickaway'){
            return
        }

        setOpen(false)
    }

    const createAccount = (event: FormEvent) => {
        event.preventDefault()

        Meteor.call('users.insert', {username, password}, (err: errorClass, result) => {
            if(err){
                setOpen(true)
                return setSeverity("error")
            }

            setOpen(true)
            setSeverity("success")
            setPassword('')
            setUsername('')

        })


    }

    return (
        <section id="createAccount">
            <h3>Create an account</h3>
            <form id="loginForm" onSubmit={createAccount} noValidate={false}>
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

                <Button  variant="outlined" color="secondary" type="submit">Create</Button>
            </form>

            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
                <MuiAlert onClose={handleClose} severity={severity} variant="filled">
                    {severity === "success" ? 'Account created successfully.' : 'User already exists.'}
                </MuiAlert>
            </Snackbar>

        </section>
    )
}