import { Meteor } from 'meteor/meteor';
import {Accounts} from 'meteor/accounts-base'
import { TasksCollection } from '/imports/api/Collection';
import { TaskProps } from '/imports/ui/Task';

import '../imports/api/tasksMethod'
import '../imports/api/tasksPublication'
import '../imports/api/UserMethod'

const SEED_USERNAME = 'meteorite'
const SEED_PASSWORD = 'password'

const insertTask = (task: TaskProps, user: any) => TasksCollection.insert({
  text: task.text,
  isChecked: true,
  userId: user._id,
  createdAt: new Date()
})

Meteor.startup(() => {

  /* if(!Accounts.findUserByUsername(SEED_USERNAME)){
    Accounts.createUser({
      username: SEED_USERNAME,
      password: SEED_PASSWORD
    })
  } */

  /* const user = Accounts.findUserByEmail(SEED_USERNAME) 

  if(TasksCollection.find().count() === 0){
    [
      {_id: '' , text: 'First Task', isChecked: false},
      {_id: '' , text: 'Second Task', isChecked: false},
      {_id: '' , text: 'Third Task', isChecked: false},
      {_id: '' , text: 'Fourth Task', isChecked: false},
      {_id: '' , text: 'Fifth Task', isChecked: false},
      {_id: '' , text: 'Sixth Task', isChecked: false},
      {_id: '' , text: 'Seventh Task', isChecked: false},
    ].forEach(taskText => insertTask(taskText, user))
  } */
});
