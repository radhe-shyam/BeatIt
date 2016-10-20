'use strict';
const stories = require('../../models/stories');
const util = require('../../utilities');
module.exports = (req, res) => {

	let validation = util.validateReq(req.body, [
		'location',
		'description',
		'titlePicture',
		'pictures'
	]);
	if( validation ){
		util.sendWrongInputError(res, validation);
	} else {
		req.body.userId = req.user_id;
		let newStories = new stories(req.body);

		newStories.saveToDB()
			.then( () => {
				util.sendData(res, null);
			})
			.catch((err) => {
				util.catchTheCatch(res, err);
			});
	}

};