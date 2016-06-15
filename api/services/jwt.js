var jwt = require('jwt-simple');
var moment = require('moment');

module.exports = function(user, res) {
	console.log(user);
    var payload = {
        sub: user.email_id,
        exp: moment().add(10, 'days').unix()
    }

    var token = jwt.encode(payload, "shhh..");
	console.log(user);
    res.status(200).send({
        user: JSON.stringify(user),
        token: token
    });
};
