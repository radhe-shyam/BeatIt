'use strict';
const stories = require('../../models/stories');
const util = require('../../utilities');
const mongodb = require('mongodb');
module.exports = (req, res) => {

	let validation = util.validateReq(req.query, [
		'id'
	]);
	let id = req.query.id;
	if (validation) {
		util.sendWrongInputError(res, validation);
	} else if (mongodb.ObjectID.isValid(id)) {
		stories.findWithUserDetails(
			[
				{
					$match:{
						"_id" : mongodb.ObjectID("58090fcfe08c6d1311e338cc")
					}
				},
				{
					$lookup:{
						from:"users",
						localField:"owner",
						foreignField:"_id",
						as:"owner"
					}
				},
				{
					$project:{
						location:1,
						description:1,
						titlePicture:1,
						pictures:1,
						"owner._id":1,
						"owner.name":1,
						"owner.age":1,
						"owner.gender":1,
						"owner.username":1,
						"owner.email":1,
						"owner.profilePictureUrl":1,
					}
				}
			])
			.then((result) => {
				if (result) {
					util.sendData(res, result);
				} else {
					util.sendWrongInputError(res, 'Story not found.');
				}
			})
			.catch((err) => {
				util.catchTheCatch(res, err);
			});
	} else {
		util.sendWrongInputError(res, "Invalid StoryId.");
	}

};