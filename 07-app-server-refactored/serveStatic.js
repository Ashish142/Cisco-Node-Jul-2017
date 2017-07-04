var path = require('path'),
	fs = require('fs');

var staticExtns = ['.html', '.css', '.js', '.txt', '.xml', '.ico', '.json'];
function isStatic(resource){
	var result = staticExtns.indexOf(path.extname(resource)) !== -1;
	return result;
}

module.exports = function(staticResourceFolder){
	return function(req, res, next){
		var resource = path.join(staticResourceFolder, req.urlObj.pathname);
		if (isStatic(resource)){
			if (!fs.existsSync(resource)){
				res.statusCode = 404;
				res.end();
				return;
			}
			fs.createReadStream(resource).pipe(res);
		} else {
			next();
		}
	}
};