'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class Auth {

  async handle ({ request,response,auth}, next) {
    try{
      await auth.check()
    }catch{
      response.status(404).json({
        msg:'token dibutuhkan'
      })
      
    }
    await next()
  }
}

module.exports = Auth
