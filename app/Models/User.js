// 'use strict'

// const Hash = use('Hash')

// class User extends Model {
//   static boot () {
//     super.boot()

//     this.addHook('beforeSave', async (userInstance) => {
//       if (userInstance.dirty.password) {
//         userInstance.password = await Hash.make(userInstance.password)
//       }
//     })
//   }

//   tokens () {
//     return this.hasMany('App/Models/Token')
//   }
// }

// module.exports = User
'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class User extends Model {
	message(){
		return this.hasMany('App/Models/Chat','id','ownerId')
	}
}


module.exports = User

