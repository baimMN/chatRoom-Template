'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ChatsSchema extends Schema {
  up () {
    this.create('chats', (table) => {
      table.increments()
      table.text('message')
      table.integer('ownerId').unsigned().references('id').inTable('users')
      table.integer('inGroupId').unsigned().references('id').inTable('chat_groups')
      table.timestamps()
    })
  }

  down () {
    this.drop('chats')
  }
}

module.exports = ChatsSchema
