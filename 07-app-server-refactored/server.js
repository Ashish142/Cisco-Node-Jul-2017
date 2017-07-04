var http = require('http'),
	fs = require('fs'),
	path = require('path'),
	url = require('url'),
	querystring = require('querystring'),
	calculator = require('./calculator');


//serveStatic.js
//dataParser.js
//calculatorHandler.js
//notFoundHandler.js

var staticExtns = ['.html', '.css', '.js', '.txt', '.xml', '.ico', '.json'];
function isStatic(resource){
	return staticExtns.indexOf(path.extname(resource)) !== -1;
}
var server = http.createServer(function(req , res ){
	var urlObj = url.parse(req.url);
	var resource = path.join(__dirname, urlObj.pathname);
	if (isStatic(resource)){
		if (!fs.existsSync(resource)){
			res.statusCode = 404;
			res.end();
		}
		fs.createReadStream(resource).pipe(res);
	} else if (urlObj.pathname === '/calculator' && req.method === 'GET'){
		var query = querystring.parse(urlObj.query),
			n1 = parseInt(query.n1,10),
			n2 = parseInt(query.n2,10),
			op = query.op;
		var result = calculator[op](n1, n2);
		res.write(result.toString());
		res.end();
	} else if (urlObj.pathname === '/calculator' && req.method === 'POST'){
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
		res.statusCode = 404;
		res.end();
	}
});
server.listen(8080);
console.log('server listening on port 8080');