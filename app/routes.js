'use strict';
let routes = () => {

	app.get('/', require('./api/check'));
	app.post('/user/register', require('./api/userRegister'))
	app.post('/user/login', require('./api/userLogin'))
	app.get('/user/info', require('./api/userInfo'));
	app.get('/user/all', require('./api/userAll'));

};

module.exports = routes();