let errorHandler = (err, req, res, next) => {
	console.log(err.message, err.stack);
	if (res.headersSent) {
		return next(err);
	}
	res.status(500);
	res.send('Something is not right. Can you please contact my God.');
}

module.exports = errorHandler;
