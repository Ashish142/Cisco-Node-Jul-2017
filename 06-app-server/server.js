//http://localhost:8080/calculator?op=add&n1=100&n2=200'
//http://localhost:8080/index.html'

//url.parse(req.url)
//querystring.parse(parsedUrl.query)

var http = require('http'),
	fs = require('fs'),
	path = require('path');

var staticExtns = ['.html', '.css', '.js', '.txt', '.xml', '.ico', '.json'];
function isStatic(resource){
	return staticExtns.indexOf(path.extname(resource)) !== -1;
}
var server = http.createServer(function(req , res ){
	var resource = path.join(__dirname, req.url);
	if (isStatic(resource)){
		if (!fs.existsSync(resource)){
			res.statusCode = 404;
			res.end();
		}
		fs.createReadStream(resource).pipe(res);
	} else if (req.url === '/calculator'){
		res.write('calculator request handling coming soon');
		res.end();
	} else {
		res.statusCode = 404;
		res.end();
	}
});

server.listen(8080);
console.log('server listening on port 8080');