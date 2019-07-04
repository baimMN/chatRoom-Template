'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class ChatGroup extends Model {
	member(){
		return this.hasMany('App/Models/GroupMember','id','group_id')
	}
}

module.exports = ChatGroup


