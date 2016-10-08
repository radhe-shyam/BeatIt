let routes = () => {

	app.get('/', require('./api/check'));

};

module.exports = routes();