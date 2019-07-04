'use strict'


const Chat= use('App/Models/Chat')
class ChatController {
  /**
   * Show a list of all chats.
   * GET chats
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
  }

  /**
   * Render a form to be used for creating a new chat.
   * GET chats/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, params }) {
    
  }


  async store ({ request, response }) {
    const {message,ownerId}=request.post()
    const data=await Chat.create({
      message,
      ownerId
    })

    if(data){
      response.status(200).json({
        msg:'sukses',
        data
      })
    }else {
      response.status(404).json({
        msg:'gagal',
      })
    }
  }


  async test ({ params, request, response}) {
    const id=params.id
    Chat.query().where({id}).with('message')
  }

  
  async show ({ params, request, response, view }) {
    const {id}=params
    const data=await Chat.query().where('inGroupId',id).fetch()
    if(data){
      response.status(200).json(data)
    }else {
      response.status(404).json({
        msg:'gagal mengambil data'
      })
    }
  }

  async update ({ params, request, response }) {

  }


  async destroy ({ params, request, response }) {
    const id=params.id
    const data=await Chat.query().where({id}).delete()
    if(data){
      response.status(200).json({
        msg:'sukses',
        data
      })
    }else{
      response.status(200).json({
        msg:'gagal'
      })
    }
  }
}

module.exports = ChatController
