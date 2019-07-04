'use strict'

const Group=use('App/Models/ChatGroup')
const Database=use('Database')
class ChatGroupController {

  async index ({ request, response, view }) {
    // const data=await Group.all()
    // response.status(200).json({
    //   msg:"sukses",
    //   data
    // })
    const data=await Group.all()
      
    if(data){
      response.status(200).json({
        data,
        msg:'sukses'
      })
    }else {
      response.status(404).json({
        msg:'grup tidak ada'
      })
    }
  }

 
  async create ({ request, response, view }) {
    
  }

 
  async store ({ request, response }) {
  }

  
  async show({params, request, response}){
    const data=await Group.query().with('member',(builder)=> {
      builder.select('*').with('user')
    }).fetch()
    response.status(200).json(data)
  }

 
  async edit ({ params, request, response, view }) {
  }

  
  async update ({ params, request, response }) {
  }

  async destroy ({ params, request, response }) {
  }
}

module.exports = ChatGroupController
