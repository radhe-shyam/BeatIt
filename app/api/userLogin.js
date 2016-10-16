'use strict';
const user = require('../models/users');
const util = require('../utilities');
const Promise = require('bluebird');
module.exports = (req, res) => {

	let validation = util.validateReq(req.body, [
		'username',
		'password'
	]);
	if( validation ){
		util.sendWrongInputError(res, validation);
	} else {
		let userData;
		user.login(req.body.username, req.body.password)
			.then( (result) => {
				if(!result){
					return Promise.reject('Wrong Username/Password');
				}
				let token = require('crypto').randomBytes(48).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/\=/g, '');
				userData = result;
				userData.token = token;
				return user.update(
					{$or:
						[
							{email: req.body.username},
							{username: req.body.username}
						]
					},{
						$push: {
							authenticationKey: {
								$each: [{code: token, timestamp: new Date().valueOf()}],
								$slice: -1
							}
						}
					});
			})
			.then( () => {
				util.sendData(res,userData);
			})
			.catch((err) => {
				util.catchTheCatch(res, err);
			});
	}

};