var express = require('express');
var app = express();
// var favicon      = require('serve-favicon');
var router = express.Router();
var bodyParser = require('body-parser');
var MessageController = require('./routes/message');

/**
 * Routing & middlewares
 */
app.use(express.static(__dirname + '/static'));
// app.use(favicon(__dirname + '/favicon.ico'));
app.use(bodyParser.json({ extended: true }));
app.use(router);

router.post('/sendmessage', MessageController.post);

app.use(function (request, response) {
	response.status(404).json({
		message: 'Oops! You may get lost!',
		code: 'E_NOTFOUND'
	});
});

app.use(function (error, request, response, next) {
	response.status(500).json({
		message: error.message,
		code: error.code
	});
});

app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), () => {
	console.log('Foodee service runs on port: ' + app.get('port'));
});

module.exports = app;
