'use strict'
const GruopMember=use('App/Models/GroupMember')
const Database=use('Database')

class GroupMemberController {

  async index ({ request, response, view }) {
  }
  
  async getUsersByGroupId({params, request, response}){
    const groupId=request.params.id
    const data=await GruopMember.query().select('*').where('group_id',groupId).fetch()

    if(data){
        response.status(200).json({
            msg:'sukses',
            data
        })
    }else{
        response.status(404).json({
            msg:'gagal',
        })
    }
  }

  

}
module.exports = GroupMemberController
