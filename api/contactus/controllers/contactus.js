'use strict';
const { parseMultipartData, sanitizeEntity } = require('strapi-utils');
const nodemailer = require('nodemailer');
/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
    async create(ctx) {
        let entity;
        if (ctx.is('multipart')) {
            const { data, files } = parseMultipartData(ctx);
            entity = await strapi.services.contactus.create(data, { files });
        } else {
            entity = await strapi.services.contactus.create(ctx.request.body);
        }
        entity = sanitizeEntity(entity, { model: strapi.models.contactus });
        let transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'ks44811@ubt-uni.net',
                pass: 'kushtrim 123'
            }
        });
        let mailOptions = {
            from: 'ks44811@ubt-uni.net',
            to: 'kushtra.55@gmail.com',
            subject: 'Sending Email by :' + ctx.request.body.name,
            html: '<h1>' + ctx.request.body.contact + '</h1> <br/> <h4>' + ctx.request.body.message + '</h4>'

        };

        transporter.sendMail(mailOptions, function (error, info) {

            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });

        return entity

    }
};
