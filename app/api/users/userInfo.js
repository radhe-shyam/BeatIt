'use strict';
const user = require('../../models/users');
const util = require('../../utilities');
module.exports = (req, res) => {

	let validation = util.validateReq(req.query, [
		'username'
	]);
	if (validation) {
		util.sendWrongInputError(res, validation);
	} else {

		user.findOne(
			{
				$or: [
					{email: req.query.username},
					{username: req.query.username}
				]
			}, {
				_id: 1,
				name: 1,
				age: 1,
				gender: 1,
				username: 1,
				email: 1,
				profilePictureUrl:1
			})
			.then((result) => {
				if(result){
					util.sendData(res, result);
				}else{
					util.sendWrongInputError(res, 'User not found.');
				}
			})
			.catch((err) => {
				util.catchTheCatch(res, err);
			});
	}

};