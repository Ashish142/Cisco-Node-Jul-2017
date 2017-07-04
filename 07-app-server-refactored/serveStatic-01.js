var path = require('path'),
	fs = require('fs');

var staticExtns = ['.html', '.css', '.js', '.txt', '.xml', '.ico', '.json'];
function isStatic(resource){
	return staticExtns.indexOf(path.extname(resource)) !== -1;
}

module.exports = function(req, res, next){
	var resource = path.join(__dirname, req.urlObj.pathname);
	if (isStatic(resource)){
		if (!fs.existsSync(resource)){
			res.statusCode = 404;
			res.end();
		}
		//fs.createReadStream(resource).pipe(res);
		var stream = fs.createReadStream(resource);
		stream.on('data', function(chunk){
			console.log('serving data to the client');
			res.write(chunk);
		});
		stream.on('end', function(){
			res.end();
		});
	} else {
		next();
	}
}