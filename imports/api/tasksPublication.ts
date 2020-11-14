import {Meteor} from 'meteor/meteor'
import {TasksCollection} from './Collection'

Meteor.publish('tasks', function publishTasks(){
    return TasksCollection.find({userId: this.userId})
})