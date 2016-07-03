var jwt = require('jwt-simple');
var mysql = require('mysql');
var createSendToken = require('./services/jwt.js');
var checkLoggedUser = require('./services/user.services.js');

var nodemailer = require('nodemailer');
var sgTransport = require('nodemailer-sendgrid-transport');

var ROLE_ID = 5;
var DEFAULT_APP_ID = 2;
var ADMIN_ROLE_ID = 1;
var selectedUser = {};

function REST_ROUTER(router, connection, md5) {
    var self = this;
    self.handleRoutes(router, connection, md5);
}

REST_ROUTER.prototype.handleRoutes = function(router, connection, md5) {

    router.post('/sendEmail', function(req, res) {
        var user = req.body;
        var verificationCode = Math.floor((Math.random() * 1000000) + 1);
        var options = {
            service: 'hotmail',
            auth: {
                user: 'deepuke1984@live.com',
                pass: 'Poiuyt123#'
            }
        };
        var transporter = nodemailer.createTransport('SMTP', options);

        var mailOptions = {
            from: 'deepuke1984@live.com',
            to: user.email_id,
            subject: 'hello world!',
            text: 'Verificaton Key : ' + verificationCode,
        };

        transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
                console.log(error);
                res.json({
                    Message: 'error'
                });
            } else {
                var query = 'INSERT INTO `n4msaas`.`pre_register` (`email_id`, `verification_code`) VALUES ("' + user.email_id + '", ' +
                    verificationCode + ')';
                var table = ["pre_register"];
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
                            "Users": rows,
                        });
                    }
                });
                // res.json({
                //     Message: info.response
                // });
            }
        });
    });

    router.post("/getusers", function(req, res) {
        var user = req.body;
        var query = 'SELECT user_id, email_id, username, address, zipcode, companyname FROM n4msaas.user where user.username = "' + user.username + '"';
        var table = ["user"];
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
                    "Users": rows,
                });
            }
        });
    });

    router.post("/getUserByUserName", function(req, res) {
        var user = req.body;

        if (user.username == null) {
            res.end();
        }
        var query = 'SELECT * FROM n4msaas.user_role INNER JOIN n4msaas.user on user_role.user_id=user.user_id WHERE user_role.user_id IN (SELECT user.user_id FROM user WHERE user.username = "' + user.username + '")';
        var table = ["user"];
        query = mysql.format(query, table);
        connection.query(query, function(err, rows) {
            if (err) {
                console.log(err);
                res.json({
                    "Error": true,
                    "Message": "Error executing MySQL query"
                });
            } else {
                var item = {
                    role_ids: [],
                    user: rows[0]
                };
                if (rows.length) {
                    delete item.user.password;
                    for (var i = 0; i < rows.length; i++) {
                        item.role_ids.push(rows[i].role_id);
                    }
                    delete item.user.role_id;
                }

                res.json({
                    "Error": false,
                    "Message": "Success",
                    "Users": item,
                });
            }

        });
    });

    router.post("/getuserByID", function(req, res) {
        var user = req.body;

        if (user.user_id == null) {
            res.end();
        }
        var query = 'SELECT * FROM n4msaas.user_role INNER JOIN n4msaas.user on user_role.user_id=user.user_id WHERE user_role.user_id IN (SELECT user.user_id FROM user WHERE user.user_id = "' + user.user_id + '")';
        var table = ["user"];
        query = mysql.format(query, table);
        connection.query(query, function(err, rows) {
            if (err) {
                console.log(err);
                res.json({
                    "Error": true,
                    "Message": "Error executing MySQL query"
                });
            } else {
                var item = {
                    role_ids: [],
                    user: rows[0]
                };
                if (rows.length) {
                    delete item.user.password;
                    for (var i = 0; i < rows.length; i++) {
                        item.role_ids.push(rows[i].role_id);
                    }
                    delete item.user.role_id;
                }

                res.json({
                    "Error": false,
                    "Message": "Success",
                    "Users": item,
                });
            }

        });
    });

    router.post("/changeUserState", function(req, res) {
        var user = req.body;
        var query = 'UPDATE n4msaas.user SET active=' + user.active + ' WHERE username="' + user.username + '"';
        var table = ["user"];
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
                    "Users": rows
                });
            }
        });
    });

    router.post("/updateUser", function(req, res) {
        var user = req.body;
        user.password = md5(user.password);
        var query = 'UPDATE n4msaas.user SET username="' + user.username + '", address="' + user.address + '",zipcode=' + user.zipcode + ', companyname="' + user.companyname + '" WHERE email_id="' + user.email_id + '"';
        var table = ["user"];
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
                    "Users": rows
                });
            }
        });
    });

    router.post("/login", function(req, res) {
        var user = req.body;
        user.password = md5(user.password);
        var query = 'SELECT user_role.user_id, user_role.role_id FROM user_role WHERE user_role.user_id IN';
        query += '( SELECT user.user_id FROM user WHERE username = "' + user.username + '" and  password="' + user.password + '" and  active=1)';
        var table = ["user"];
        query = mysql.format(query, table);
        connection.query(query, function(err, rows) {
            if (err) {
                console.log(err);
                res.json({
                    "Error": true,
                    "Message": "Error executing MySQL query"
                });
            } else {
                if (!rows.length) {
                    res.json({
                        "Error": false,
                        "Message": "Check your credential, Or user might not be active please try again Or contact administrator.",
                        "Users": rows
                    });
                } else {
                    createSendToken(rows[0], res);
                }

            }
        });
    });

    router.post('/changePassword', validateVerificationCode, updatePassword);

    function updatePassword(req, res, next) {
        var user = req.body;
        var query = 'UPDATE n4msaas.user SET password="' + md5(user.password) + '" WHERE email_id="' + user.email_id + '"';
        var table = ["user"];
        query = mysql.format(query, table);
        connection.query(query, function(err, rows) {
            if (err) {
                console.log(err);
                res.json({
                    "Error": true,
                    "Message": "Error executing MySQL query, User is not created."
                });
            } else {
                res.json({
                    "Error": true,
                    "Message": "User password updated."
                });
            }
        });
    }

    function validateVerificationCode(req, res, next) {
        var user = req.body;
        var query = 'DELETE FROM `n4msaas`.`pre_register` WHERE `email_id`="' + user.email_id + '" and `verification_code` = ' + user.verification_code + '';
        var table = ["pre_register"];
        query = mysql.format(query, table);
        connection.query(query, function(err, rows) {
            if (err) {
                console.log(err);
                res.json({
                    "Error": true,
                    "Message": "Error executing MySQL query, User is not created."
                });
            } else {
                next();
            }
        });
    }
    router.post('/user', validateVerificationCode, saveUserData, getUserIdByUserName, setDefaultRoleForUser, setDefaultAppForUser);

    function saveUserData(req, res, next) {
        var user = req.body;
        var query = 'INSERT INTO n4msaas.user SET  email_id = "' + user.email_id + '", username="' + user.username + '", password="' + md5(user.password) + '", address="' + user.address + '", zipcode=' + parseInt(user.zipcode) + ', companyname="' + user.companyname + '", active=1';
        var table = ["user"];
        query = mysql.format(query, table);
        connection.query(query, function(err, rows) {
            if (err) {
                console.log(err);
                res.json({
                    "Error": true,
                    "Message": "Error executing MySQL query, User is not created."
                });
            } else {
                next();
            }
        });
    }

    function setDefaultRoleForUser(req, res, next) {
        var query = 'INSERT INTO n4msaas.user_role SET role_id = "' + ROLE_ID + '", user_id="' + selectedUser.user_id + '"';
        var table = ["user_role"];
        query = mysql.format(query, table);
        connection.query(query, function(err, rows) {
            if (err) {
                console.log(err);
                res.json({
                    "Error": true,
                    "Message": "Error executing MySQL query, User Role is not created"
                });
            } else {
                next();
            }
        });
    }

    function setDefaultAppForUser(req, res, next) {
        var user = req.body;
        var query = 'INSERT INTO application_user SET app_id = "' + DEFAULT_APP_ID + '", user_id="' + selectedUser.user_id + '"';
        var table = ["application_user"];
        query = mysql.format(query, table);
        connection.query(query, function(err, rows) {
            if (err) {
                console.log(err);
                res.json({
                    "Error": true,
                    "Message": "Error executing MySQL query, App ID is not created"
                });
            } else {
                createSendToken(user, res);
            }
        });
    }

    function getUserIdByUserName(req, res, next) {
        var user = req.body;
        var query = 'SELECT user.user_id FROM user where user.username = "' + user.username + '" ';
        var table = ['user'];
        query = mysql.format(query, table);
        connection.query(query, function(err, rows) {
            if (err) {
                console.log(err);
                res.json({
                    "Error": true,
                    "Message": "Error executing MySQL query, User Role is not created"
                });
            } else {
                selectedUser.user_id = rows[0].user_id;
                next();
            }
        });

    }

    router.post("/getAllusers", function(req, res) {
        var user = req.body;
        var token = req.headers.authorization.split(' ')[1];
        var payload = jwt.decode(token, "shhh..");
        if (user.role_id !== ADMIN_ROLE_ID) {
            res.json({
                "status": 403,
                "Error": false,
                "Message": "Access denied!",
                "Users": []
            });
        } else {
            var query = 'SELECT user.username, user.email_id, user.companyname, user.address, user.zipcode, user.active FROM user ';
            var table = ["user"];
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
                        "Message": "User List Available",
                        "Users": rows
                    });
                }
            });
        }
    });
};

module.exports = REST_ROUTER;
