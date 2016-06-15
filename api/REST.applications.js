var mysql = require('mysql');

function REST_ROUTER(router, connection) {
    var self = this;
    self.handleRoutes(router, connection);
}

REST_ROUTER.prototype.handleRoutes = function(router, connection) {

    router.get("/getAllApps", function(req, res) {
        var query = 'SELECT * FROM application'
        var table = ["application"];
        query = mysql.format(query, table);
        connection.query(query, function(err, rows) {
            if (err) {
                console.log(err);
                res.json({
                    "Error": true,
                    "Message": "Error executing MySQL query"
                });
            } else {
                res.json({
                    "Error": false,
                    "Message": "Success",
                    "apps": rows
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
                    "Error": true,
                    "Message": "Error executing MySQL query"
                });
            } else {
                var query = 'INSERT INTO  application_role (role_id, app_id) VALUES (1, "' + application.app_id + '")';
                var table = ["application_role"];
                query = mysql.format(query, table);
                connection.query(query, function(err, rows) {
                    if (err) {
                        console.log(err);
                        res.json({
                            "Error": true,
                            "Message": "Error executing MySQL query, Application role is not set!"
                        });
                    } else {
                        res.json({
                            "Error": false,
                            "Message": "Registration Successfull " + application.app_name
                        });
                    }
                });
            }
        });
    });

}

module.exports = REST_ROUTER;
