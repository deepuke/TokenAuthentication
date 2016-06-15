var express = require('express');
var bodyParser = require('body-parser');
var jwt = require('jwt-simple');
var mysql = require('mysql');
var md5 = require('MD5');
var app = express();
var cors = require('cors');

var createSendToken = require('./services/jwt.js');
var getAllUsersModule = require('./services/user.services.js');

var rest = require('./REST.users.js');
var restApps = require("./REST.applications.js");
var restRoles = require("./REST.roles.js");

app.use(bodyParser.json());
app.use(cors());

function REST() {
	var self = this;
	self.connectMysql();
};

REST.prototype.connectMysql = function() {
	var self = this;
	var pool = mysql.createPool({
		connectionLimit : 100,
		host : 'localhost',
		user : 'root',
		password : 'password',
		database : 'n4msaas',
		debug : false
	});
	pool.getConnection(function(err, connection) {
		if (err) {
			self.stop(err);
		} else {
			self.configureExpress(connection);
		}
	});
};

REST.prototype.configureExpress = function(connection) {
	var self = this;
	app.use(bodyParser.urlencoded({
		extended : true
	}));
	app.use(bodyParser.json());
	var router = express.Router();
	app.use('/api', router);
	var rest_router = new rest(router, connection, md5);
	var rest_router_appa = new restApps(router, connection);
	var rest_router_roles = new restRoles(router, connection);
	self.startServer();
};

REST.prototype.startServer = function() {
	// var payload = {
	//     foo: 'bar'
	// };
	// var secret = 'xxx';
	// // encode
	// var token = jwt.encode(payload, secret);
	// console.log(token);
	app.listen(6050, function() {
		console.log("All right ! I am alive at Port 6050.");
	});
};

REST.prototype.stop = function(err) {
	console.log("ISSUE WITH MYSQL n" + err);
	process.exit(1);
};

new REST();
