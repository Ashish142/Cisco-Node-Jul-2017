var url = require('url'),
	querystring = require('querystring');

module.exports = function(req, res, next){
	req.urlObj = url.parse(req.url);
	req.query = querystring.parse(req.urlObj.query);
	if (req.method === 'POST'){
		var reqBody = '';
		req.on('data', function(chunk){
			reqBody += chunk;
		});
		req.on('end', function(){
			req.body = querystring.parse(reqBody);
			next();
		});
	} else {
		next();
	}
}