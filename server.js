var express = require('express');
var app = express();
app.set('port', (process.env.PORT || 5000));
app.get('/', function (req, res) {
	res.sendfile(__dirname + '/index.html');
});
app.use('/src',express.static('src'));
app.use('/dist',express.static('dist'));
app.use('/vendor',express.static('vendor'));
var server = app.listen(app.get('port'), function () {
	var host = server.address().address;
	var port = server.address().port;
});