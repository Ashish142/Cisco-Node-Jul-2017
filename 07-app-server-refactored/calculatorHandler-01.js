var querystring = require('querystring'),
	calculator = require('./calculator');
	
module.exports = function(req, res, next){
	if (req.urlObj.pathname === '/calculator' && req.method === 'GET'){
		var query = querystring.parse(req.urlObj.query),
			n1 = parseInt(query.n1,10),
			n2 = parseInt(query.n2,10),
			op = query.op;
		var result = calculator[op](n1, n2);
		res.write(result.toString());
		res.end();
	} else if (req.urlObj.pathname === '/calculator' && req.method === 'POST'){
		var reqBody = '';
		req.on('data', function(chunk){
			reqBody += chunk;
		});
		req.on('end', function(){
			var query = querystring.parse(reqBody),
				n1 = parseInt(query.n1,10),
				n2 = parseInt(query.n2,10),
				op = query.op;
			var result = calculator[op](n1, n2);
			res.write(result.toString());
			res.end();
		});
	} else {
		next();
	}
}