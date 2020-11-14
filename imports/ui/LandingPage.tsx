import React, { useState } from 'react';

import {Meteor} from 'meteor/meteor'
import { useTracker } from 'meteor/react-meteor-data';
import { TasksCollection } from '../api/Collection';
import {Task, TaskProps} from './Task'
import TaskForm from './TaskForm';
import Button from '@material-ui/core/Button'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { LoginForm } from './LoginForm';

interface UserProps{
  _id: string,
  username?: string
}

export const LandingPage = () => {

  const [hideCompletedTask, setHideCompletedTask] = useState(false)

  const user: UserProps | null  = useTracker(() => Meteor.user())

  const hideCompletedFilter = {isChecked: {$ne: false}}

  const userFilter = user ? {userId: user._id}: {}

  const pendingOnlyFilter = {...hideCompletedFilter, ...userFilter}

  const {tasks, pendingTasksCount} = useTracker(() => {
    const noDataAvailable = {tasks: [], pendingTasksCount: 0}

    if(!Meteor.user()){
      return noDataAvailable
    }

    const handler = Meteor.subscribe('tasks')

    if(!handler.ready()){
      return {...noDataAvailable, isLoading: true}
    }

    const tasks = TasksCollection.find(
      hideCompletedTask ? pendingOnlyFilter : userFilter,
      {sort: {createdAt: -1}}
    ).fetch()

    const pendingTasksCount = TasksCollection.find(pendingOnlyFilter).count()

    return {tasks, pendingTasksCount}
  })

  const pendingTasksTitle = `${pendingTasksCount ? `(${pendingTasksCount})` : ''}`

  const toggleChecked = (task: TaskProps) => {
      Meteor.call('tasks.setIsChecked', task._id, !task.isChecked)
  }

  const deleteTask = (task: TaskProps) => Meteor.call('tasks.remove', task._id)

  const logout = () => Meteor.logout()

  return (

      <main>

        {user && <section className="user" >
          {user.username}
          <ExitToAppIcon onClick={logout}/>
        </section>}

        <h1>To Do list {pendingTasksTitle}</h1>

        {user ? (
          <>

            <TaskForm/>

            <section className="filter">
              <Button 
                onClick={() => setHideCompletedTask(!hideCompletedTask)}
                color="secondary"
                variant="contained"
              >
                {hideCompletedTask ? 'Show all' : 'Hide completed'}
              </Button>
            </section>
      
            <ul>
              {tasks && tasks.map((task: TaskProps) => (
                  <Task 
                    key={task._id} 
                    task={task}
                    onCheckBoxClick={() => toggleChecked(task)}
                    onDeleteClick={() => deleteTask(task)}
                  />
              ))}
            </ul>

          </>

          ) : 
        
          <LoginForm />
        }
        
      </main>
  )
};
