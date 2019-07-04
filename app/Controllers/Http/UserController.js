'use strict'

const UserDb=use('App/Models/User')
const db=use('Database')

class UserController {

  async index ({ request, response, auth}) {
    const data=await UserDb.all()
    response.status(200).json(data)
  }

 
  async create ({ request, response, view }) {
    
  }

 
  async store ({ request, response }) {
    const reqBody=request.only(['username','email','password'])
    // const userData= new userDb({
    //     email,
    //     password,
    //     username
    // })
    const data=await UserDb.create(reqBody)
    response.status(200).json({
        msg:'berhasil add user',
        data
    })
  }

  
    

    async singleUser ({ params, request, response,auth}) {
        const test= await auth.user.username
        const data=await UserDb.find(params.id)
        if(data) {
            response.status(200).json({
                msg:'sukses',
                data,
                test
            })
        }else{
            response.status(404).json({
                msg:'gagal',
            })
        }
    }

    async testgan({params, request, response,auth}){
        // const id=params.id
        return UserDb.query().with('message').fetch()
    }

    async login ({ params, request, response ,auth}) {
        const {email,password}=request.post()
        const post=await UserDb.findBy({email,password})
        if(post){
            const token=await auth.generate(post)
            response.status(200).json({
                msg:"sukses",
                data: post,
                token,
            })
        }else {
            response.status(404).json({
                msg:"password salah",
            })
        }
    }
}

module.exports = UserController

