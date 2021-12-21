
'use strict';
const nodemailer = require('nodemailer');


/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
    async create(ctx) {

        let transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'ks44811@ubt-uni.net',
                pass: 'kushtrim 123'
            }
        });
        let mailOptions = {
            from: 'ks44811@ubt-uni.net',
            to: 'granitnebiu@gmail.com',
            subject: 'Sending Email using Node.js',
            text: 'That was easy!',

        };

        transporter.sendMail(mailOptions, function (error, info) {

            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });

        return "";
    },
};