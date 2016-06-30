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

    router.post("/getRoleByRoleID", function(req, res) {
        var role = req.body;
        var query = 'SELECT * FROM role WHERE role.role_id=' + role.role_id + '';
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

    router.get("/getAllRoles", function(req, res) {
        var query = 'SELECT * FROM role';
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
        var query = 'INSERT INTO  role  (role_id, role_name) VALUES (null, "' + role.role_name + '")';
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
                    "Message": "Registration Successfull" + req.body.role_name
                });
            }
        });
    });

    router.put("/changeRoleState", function(req, res) {
        var role = req.body;
        console.log(role);
        var query = 'UPDATE n4msaas.role SET active='+role.active+' WHERE role_id='+role.role_id+'';
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
                    "Users": rows[0]
                });
            }
        });
    });

    router.put("/updateRole", function(req, res) {
        var role = req.body;
        console.log(role);
        var query = 'UPDATE n4msaas.role SET role_name="'+role.role_name+'" WHERE role_id=' + role.role_id + '';
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
                    "Users": rows[0]
                });
            }
        });
    });

    router.put('/updateUserRoles', deleteExistingRoles, AddNewRoles);

    function deleteExistingRoles(req, res, next) {
        var user = req.body;
        var query = 'DELETE FROM n4msaas.user_role where user_id = "' + user.user_id + '"';
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
                next();
            }
        });
    }

    function AddNewRoles(req, res, next) {
        var user = req.body;
        var len = user.role_ids.length;
        for (var i = 0; i < len; i++) {
            var query = 'INSERT INTO n4msaas.user_role  (role_id, user_id) VALUES ("' + parseInt(user.role_ids[i]) + '", "' + user.user_id + '")';
            var table = [""];
            query = mysql.format(query, table);
            connection.query(query, function(err, rows) {
                if (err) {
                    console.log(err);
                    res.json({
                        "Error": true,
                        "Message": "Error executing MySQL query"
                    });
                } else {
                    if (i == len - 1) {
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
};
module.exports = REST_ROUTER;
