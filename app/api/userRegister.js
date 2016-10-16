'use strict';
const user = require('../models/users');
const util = require('../utilities');
module.exports = (req, res) => {

	let validation = util.validateReq(req.body, [
		'name',
		'age',
		'gender',
		'username',
		'email',
		'password'
	]);
	if( validation ){
		util.sendWrongInputError(res, validation);
	} else {
		let newUser = new user(req.body);

		newUser.saveToDB()
			.then( () => {
				util.sendData(res, null);
			})
			.catch((err) => {
				util.catchTheCatch(res, err);
			});
	}

};