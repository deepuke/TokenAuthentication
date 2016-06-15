var mysql = require('mysql');

function REST_ROUTER(router, connection) {
    var self = this;
    self.handleRoutes(router, connection);
}

REST_ROUTER.prototype.handleRoutes = function(router, connection) {
    router.get("/", function(req, res) {
        res.json({
            "Message": "Hello World !"
        });
    });

    router.get("/getAllRoles", function(req, res) {
        var query = 'SELECT * FROM role'
        var table = ["role"];
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
                    "roles": rows
                });
            }
        });
    });



    router.post("/addRole", function(req, res) {
        var role = req.body;
        console.log(role);
        var query = 'INSERT INTO  role  (role_id, role_name) VALUES ("' + role.role_id + '", "' + role.role_name + '")';
        var table = ["role"];
        query = mysql.format(query, table);
        console.log(query);
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
                    "Message": "Registration Successfull" + req.body.role_name
                });
            }
        });
    });

    router.put("/updateUserRole", function(req, res) {
        var user = req.body;
        console.log(user);
        var query = 'DELETE FROM n4msaas.user_role where email_id = "' + user.email_id + '"';
        var table = ["user_role"];
        query = mysql.format(query, table);
        connection.query(query, function(err, rows) {
            if (err) {
                console.log(err);
                res.json({
                    "Error": true,
                    "Message": "Error executing MySQL query"
                });
            } else {
                var len = user.newRoles.length;
                for (var i = 0; i < len; i++) {
                    console.log(user.newRoles[i]);
                    var query = 'INSERT INTO n4msaas.user_role  (role_id, email_id) VALUES ("' + parseInt(user.newRoles[i]) + '", "' + user.email_id + '")';
                    var table = [""];
                    query = mysql.format(query, table);
                    console.log(query);
                    connection.query(query, function(err, rows) {
                        if (err) {
                            console.log(err);
                            res.json({
                                "Error": true,
                                "Message": "Error executing MySQL query"
                            });
                        } else {
                            if (i == len-1) {
                                res.json({
                                    "Error": false,
                                    "Message": "Updated Successfull"
                                });
                            }
                        }
                    });
                }

                res.json({
                    "Error": false,
                    "Message": "Updated Successfull"
                });

            }
        });

    });


}
module.exports = REST_ROUTER;
