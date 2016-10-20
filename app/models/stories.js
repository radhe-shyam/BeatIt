const Promise = require('bluebird');
const mongodb = require('mongodb');

module.exports = class {
	constructor(storyObject) {
		this.location = storyObject.location;
		this.description = storyObject.description;
		this.titlePicture = storyObject.titlePicture;
		this.pictures = storyObject.pictures || [];
		this.owner = mongodb.ObjectID(storyObject.userId);
		this.timestamp = new Date().valueOf();
	}

	static findOne(query, projection) {
		return new Promise((resolve, reject) => {
			app.db.collection('stories').findOne(query, projection, (err, res) => {
				if (err) {
					reject(err);
				} else {
					resolve(res);
				}
			});
		});
	}

	static findMultiple(query, projection) {
		return new Promise((resolve, reject) => {
			app.db.collection('stories').find(query, projection).toArray((err, res) => {
				if (err) {
					reject(err);
				} else {
					resolve(res);
				}
			});
		});
	}


	static update(query, update) {
		return new Promise((resolve, reject) => {
			app.db.collection('stories').update(query, update, (err, res) => {
				if (err) {
					reject(err);
				} else {
					resolve(res);
				}
			});
		});
	}

	saveToDB() {
		return new Promise((resolve, reject) => {
			app.db.collection('stories').insert(this, (err, res) => {
				if (err) {
					reject(err);
				} else {
					resolve();
				}
			});
		});
	}

	static findWithUserDetails(query) {
		return new Promise((resolve, reject) => {
			app.db.collection('stories').aggregate(query, (err, res) => {
				if (err) {
					reject(err);
				} else {
					resolve(res);
				}
			});
		});
	}

};


var sample = {
	location: "Leh",
	description: "Lets get it on",
	titlePicture: "thisIsTitlePicUrl",
	pictures: ["Array", "Of", "Pictures"],
	owner: "userId",
	timestamp:""
}