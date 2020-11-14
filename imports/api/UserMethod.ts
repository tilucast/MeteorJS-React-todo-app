import {check} from 'meteor/check'
import {Meteor} from 'meteor/meteor'
import {UserCollection} from './User'
import {Accounts} from 'meteor/accounts-base'

export default Meteor.methods({
    'users.insert'(user: {username: string, password: string}){
        check(user.username, String)
        check(user.password, String)

        if(Accounts.findUserByUsername(user.username)){
            throw new Meteor.Error('User already exists.')
        }

        if(!Accounts.findUserByUsername(user.username)){
            Accounts.createUser(user)
        }
    }
})