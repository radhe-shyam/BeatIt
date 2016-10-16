let mongodb = require("mongodb");

module.exports = (cb) => {

	let dbURI = 'mongodb://localhost:27017/emiley';

	mongodb.MongoClient.connect(dbURI, {
      promiseLibrary: Promise 
    }, (err, database) => {
		if (err) {
			console.log(err);
			console.log('My Mongo is screwed, why don\'t you check your config.');
			process.exit(1);
		}
		console.log("Congo you\'re connected to Mongo.");
		cb(database);
	});
};
