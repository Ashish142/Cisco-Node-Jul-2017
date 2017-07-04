var http = require('http'),
	
	dataParser = require('./dataParser'),
	serveStatic = require('./serveStatic'),
	calculatorHandler = require('./calculatorHandler');
	notFoundHandler = require('./notFoundHandler');

var _middlewares = [dataParser, serveStatic, calculatorHandler, notFoundHandler];
var server = http.createServer(function(req , res ){
	function exec(req, res, middlewares){
		var first = middlewares[0],
			remaining = middlewares.slice(1),
			next = function(){
				exec(req, res, remaining);
			};
		if (typeof first === 'function')
			first(req, res, next);
	}
	exec(req, res, _middlewares);
});
server.listen(8080);
console.log('server listening on port 8080');