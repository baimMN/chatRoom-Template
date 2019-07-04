'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ChatGroupSchema extends Schema {
  up () {
    this.create('chat_groups', (table) => {
      table.increments()
      table.string('group_name')
      table.string('picture')
      table.string('admin_id').unsigned().references('id').inTable('users').onDelete('cascade')
      table.timestamps()
    })
  }

  down () {
    this.drop('chat_groups')
  }
}

module.exports = ChatGroupSchema
