var jwt = require('jwt-simple');
var mysql = require('mysql');
var createSendToken = require('./services/jwt.js');
var checkLoggedUser = require('./services/user.services.js');
var ROLE_ID = 5;
var DEFAULT_APP_ID = 2;
var ADMIN_ROLE_ID = 1;

function REST_ROUTER(router, connection, md5) {
	var self = this;
	self.handleRoutes(router, connection, md5);
}

REST_ROUTER.prototype.handleRoutes = function(router, connection, md5) {

	router.post("/getusers", function(req, res) {
		var user = req.body;
		console.log(req.headers);
		var query = 'SELECT email_id, username, address, zipcode, companyname FROM n4msaas.user where user.email_id = "' + user.email_id + '"';
		//var query = 'SELECT * FROM n4msaas.user_role INNER JOIN n4msaas.user on user_role.email_id=user.email_id';
		var table = ["user"];
		query = mysql.format(query, table);
		connection.query(query, function(err, rows) {
			if (err) {
				console.log(err);
				res.json({
					"Error" : true,
					"Message" : "Error executing MySQL query"
				});
			} else {
				res.json({
					"Error" : false,
					"Message" : "Success",
					"Users" : rows,
				});
			}
		});
	});

	router.post("/getuserByEmail", function(req, res) {
		var user = req.body;
		console.log(user);
		//var query = 'SELECT email_id, username, address, zipcode, companyname FROM n4msaas.user where user.email_id = "' + user.email_id + '"';
		var query = 'SELECT * FROM n4msaas.user_role INNER JOIN n4msaas.user on user_role.email_id=user.email_id';
		var table = ["user"];
		query = mysql.format(query, table);
		connection.query(query, function(err, rows) {
			if (err) {
				console.log(err);
				res.json({
					"Error" : true,
					"Message" : "Error executing MySQL query"
				});
			} else {
				var item = {};
				for (var i = 0; i < rows.length; i++) {
					if (rows[i].email_id === user.email_id) {
						delete rows[i].password;
						item = rows[i];
					}
				}
			}
			res.json({
				"Error" : false,
				"Message" : "Success",
				"Users" : item,
			});
		});
	});

	router.post("/updateUser", function(req, res) {
		var user = req.body;
		user.password = md5(user.password);
		console.log(user);
		var query = 'UPDATE n4msaas.user SET username="' + user.username + '", address="' + user.address + '",zipcode=' + user.zipcode + ', companyname="' + user.companyname + '" WHERE email_id="' + user.email_id + '"';
		var table = ["user"];
		query = mysql.format(query, table);
		connection.query(query, function(err, rows) {
			if (err) {
				console.log(err);
				res.json({
					"Error" : true,
					"Message" : "Error executing MySQL query"
				});
			} else {
				console.log(rows);
				res.json({
					"Error" : false,
					"Message" : "Success",
					"Users" : rows
				});
			}
		});
	});

	router.post("/login", function(req, res) {
		var user = req.body;
		user.password = md5(user.password);
		console.log(user);
		var query = 'SELECT email_id  FROM n4msaas.user where email_id = "' + user.email_id + '" and  password="' + user.password + '"';
		var table = ["user"];
		query = mysql.format(query, table);
		connection.query(query, function(err, rows) {
			if (err) {
				console.log(err);
				res.json({
					"Error" : true,
					"Message" : "Error executing MySQL query"
				});
			} else {
				console.log(rows);
				createSendToken(user, res);
			}
		});
	});

	router.post("/user", function(req, res) {
		var user = req.body;
		console.log(user);
		var query = 'INSERT INTO n4msaas.user SET email_id = "' + user.email_id + '", username="' + user.username + '", password="' + md5(user.password) + '", address="' + user.address + '", zipcode=' + parseInt(user.zipcode) + ', companyname="' + user.companyname + '"';
		var table = ["user"];
		query = mysql.format(query, table);
		console.log(query);
		connection.query(query, function(err, rows) {
			if (err) {
				console.log(err);
				res.json({
					"Error" : true,
					"Message" : "Error executing MySQL query, User is not created."
				});
			} else {
				var query = 'INSERT INTO n4msaas.user_role SET role_id = "' + ROLE_ID + '", email_id="' + user.email_id + '"';
				var table = ["user_role"];
				query = mysql.format(query, table);
				connection.query(query, function(err, rows) {
					if (err) {
						console.log(err);
						res.json({
							"Error" : true,
							"Message" : "Error executing MySQL query, User Role is not created"
						});
					} else {

						var query = 'INSERT INTO application_user SET app_id = "' + DEFAULT_APP_ID + '", email_id="' + user.email_id + '"';
						var table = ["user_role"];
						query = mysql.format(query, table);
						connection.query(query, function(err, rows) {
							if (err) {
								console.log(err);
								res.json({
									"Error" : true,
									"Message" : "Error executing MySQL query, App ID is not created"
								});
							} else {
								createSendToken(user, res);
							}
						});
					}
				});
			}
		});
	});

	router.get("/getusers", function(req, res) {
		var user = req.body;
		console.log(req.headers.authorization);
		var token = req.headers.authorization.split(' ')[1];
		var payload = jwt.decode(token, "shhh..");
		console.log(payload);

		var query = 'SELECT role_id FROM n4msaas.user_role WHERE user_role.email_id = "' + payload.sub + '"';
		var table = ["user_role"];
		query = mysql.format(query, table);
		connection.query(query, function(err, rows) {
			if (err) {
				console.log(err);
				res.json({
					"Error" : true,
					"Message" : "Error executing MySQL query"
				});
			} else {
				console.log(rows[0].role_id);
				if (rows[0].role_id !== ADMIN_ROLE_ID) {
					res.json({
						"status" : 403,
						"Error" : false,
						"Message" : "Access denied!",
						"Users" : []
					});
				} else {
					var query = 'SELECT user.username, user.email_id, user.companyname FROM user ';
					var table = ["user"];
					query = mysql.format(query, table);
					console.log(query);
					connection.query(query, function(err, rows) {
						if (err) {
							console.log(err);
							res.json({
								"Error" : true,
								"Message" : "Error executing MySQL query"
							});
						} else {
							res.json({
								"Error" : false,
								"Message" : "User List Available",
								"Users" : rows
							});
						}
					});
				}
			}
		});

	});
};

module.exports = REST_ROUTER;
