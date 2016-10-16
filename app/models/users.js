const Promise = require('bluebird');

module.exports = class {
	constructor(userObject){
		this.name = userObject.name;
		this.age = userObject.age;
		this.gender = userObject.gender;
		this.username = userObject.username;
		this.email = userObject.email;
		this.password = userObject.password;
		this.authenticationKey = [];
		this.timestamp = new Date().valueOf();
	}
	
	static findOne(query, projection){
		return new Promise( (resolve, reject) => {
			app.db.collection('users').findOne(query, projection, (err, res) => {
				if(err){
					reject(err);
				} else {
					resolve(res);
				}
			});
		});
	}

	static findMultiple(query, projection){
		return new Promise( (resolve, reject) => {
			app.db.collection('users').find(query, projection).toArray( (err, res) => {
				if(err){
					reject(err);
				} else {
					resolve(res);
				}
			});
		});
	}


	static login(usernameOrEmail, password){
		return this.findOne(
			{$and:
				[
					{$or:
						[
							{email: usernameOrEmail},
							{username: usernameOrEmail}
						]
					},
					{password: password}
				]},
			{
				_id: 0,
				authenticationKey: 0,
				password: 0,
				timestamp: 0
			});
	}

	static update(query, update){
		return new Promise( (resolve, reject) => {
			app.db.collection('users').update(query, update, (err, res) => {
				if(err){
					reject(err);
				} else {
					resolve(res);
				}
			});
		});
	}

	saveToDB(){
		return this.constructor.findOne({username:this.username}, {_id:1})
			.then( (res) => {
				if(res)
					return Promise.reject('Username Already Exists.');
				return this.constructor.findOne({email:this.email}, {_id:1});
			})
			.then( (res) => {
				if(res)
					return Promise.reject('Email-id Already Exists.');
				return new Promise( (resolve, reject) => {
					app.db.collection('users').insert(this, (err, res) => {
						if(err){
							reject(err);
						} else {
							resolve();
						}
					});
				})
			});
	}

};


var sample = {
	name:"radhe",
	age:20,
	gender:"Male",
	username:"radheShyam",
	email:"radhe@gmail.com",
	password:"radaf",
	authenticationKey:[]
}