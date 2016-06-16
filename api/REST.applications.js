var mysql = require('mysql');

function REST_ROUTER(router, connection) {
	var self = this;
	self.handleRoutes(router, connection);
}

REST_ROUTER.prototype.handleRoutes = function(router, connection) {

	router.post("/getAllApps", function(req, res) {
		var user = req.body;
		console.log(user);
		var query = 'SELECT app_id, app_name FROM application WHERE application.app_id IN ';
		query += '(SELECT application_user.app_id FROM application_user WHERE application_user.email_id = "' + user.email_id + '")';
		var table = ["application"];
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
					"apps" : rows
				});
			}
		});
	});

	router.post("/addApplication", function(req, res) {
		var application = req.body;
		console.log(application);
		var query = 'INSERT INTO  application  (app_id, app_name) VALUES ("' + application.app_id + '", "' + application.app_name + '")';
		var table = ["application"];
		query = mysql.format(query, table);
		connection.query(query, function(err, rows) {
			if (err) {
				console.log(err);
				res.json({
					"Error" : true,
					"Message" : "Error executing MySQL query"
				});
			} else {
				var query = 'INSERT INTO  application_role (role_id, app_id) VALUES (1, "' + application.app_id + '")';
				var table = ["application_role"];
				query = mysql.format(query, table);
				connection.query(query, function(err, rows) {
					if (err) {
						console.log(err);
						res.json({
							"Error" : true,
							"Message" : "Error executing MySQL query, Application role is not set!"
						});
					} else {
						res.json({
							"Error" : false,
							"Message" : "Registration Successfull " + application.app_name
						});
					}
				});
			}
		});
	});

};

module.exports = REST_ROUTER;
