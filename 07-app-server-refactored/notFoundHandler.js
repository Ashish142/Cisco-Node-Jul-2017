module.exports = function(req, res, next){
	console.log('serving 404 to the client');
	res.statusCode = 404;
	res.end();
	next();
}