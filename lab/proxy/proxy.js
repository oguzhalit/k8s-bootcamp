const express = require('express');
const path = require('path');
const app = express();

//app.use(express.static(path.join(__dirname, 'build')));

app
	.get('/', function (req, res) {
		res.sendFile(path.join(__dirname, '', 'index.html'));
	})
	.get('/api/*', function (req, res) {
		res.send('api! ' + req.params);
	})
	.post('/api/*', function (req, res) {
		res.send('api! ' + req.params);
	})
	.delete('/api/*', function (req, res) {
		res.send('api! ' + req.params);
	})
	.put('/api/*', function (req, res) {
		res.send('api! ' + req.params);
	})
	.listen(9000);