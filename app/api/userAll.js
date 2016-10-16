'use strict';
const user = require('../models/users');
const util = require('../utilities');
module.exports = (req, res) => {

	user.findMultiple(
		{}, {
			_id: 0,
			name: 1,
			age: 1,
			gender: 1,
			username: 1,
			email: 1
		})
		.then((result) => {
			if (result) {
				util.sendData(res, result);
			} else {
				util.sendWrongInputError(res, 'Users not found.');
			}
		})
		.catch((err) => {
			util.catchTheCatch(res, err);
		});

};