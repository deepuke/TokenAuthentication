var nodemailer = require('nodemailer');

module.exports = function(user, res) {
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
        text: 'Verificaton Key : 123456',
    };

    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
            res.json({
                Message: 'error'
            });
        } else {
            console.log(info);
            res.json({
                Message: info.response
            });
        }
    });
};
