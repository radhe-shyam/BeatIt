'use strict';
let routes = () => {

	const user = require('./models/users');
	const util = require('./utilities');
	const mongodb = require('mongodb')

	let authentication = (req, res, next) => {
		var token = req.header('Authorization');
		if (util.isVoid(token)) {
			res.status(401).send("Not Authorized");
		} else {
			token = token.split(' ');
			if (util.isVoid(token[0]) || !mongodb.ObjectID.isValid(token[1])) {
				res.status(401).send("Not Authorized");
			} else {
				user.findOne({
					_id: mongodb.ObjectID(token[1]),
					authenticationKey: {$elemMatch: {code: token[0]}}
				})
					.then((result) => {
						if (!util.isVoid(result)) {
							req.user_id = token[1];
							next();
						} else {
							res.status(401).send("Not Authorized");
						}
					})
					.catch((err) => {
						util.catchTheCatch(res, err);
					});
			}
		}
	}

	app.get('/', require('./api/check'));
	app.post('/user/register', require('./api/users/userRegister'))
	app.post('/user/login', require('./api/users/userLogin'))
	app.get('/user/info', require('./api/users/userInfo'));
	app.get('/user/all', require('./api/users/userAll'));

	app.post('/stories/create', authentication, require('./api/stories/storiesCreate'));
	app.get('/stories/details', authentication, require('./api/stories/storiesDetails'));
	app.get('/stories/all', authentication, require('./api/stories/storiesAll'));

};

module.exports = routes();