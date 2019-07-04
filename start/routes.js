'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.group(() => {        
	Route.get('users','UserController.index')
	Route.get('deleteMsg/:id','ChatController.destroy')
	Route.post('addUser','UserController.store')
	Route.get('user/:id','UserController.show')
	Route.get('usersByGroup','GroupMemberController.getUsersByGroupId')
	Route.get('groups','ChatGroupController.show')
	Route.get('chatsByGroup/:id','ChatController.show')
	Route.get('testgan/:id','UserController.testgan')
	Route.post('sendMsg','ChatController.store')		
}).prefix('token/v1')
// .middleware('auth')

Route.group(()=> {
    Route.post('user','UserController.login')
    Route.post('userCreate','UserController.store')
}).prefix('v1')


