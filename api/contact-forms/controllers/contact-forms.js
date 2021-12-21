const { parseMultipartData, sanitizeEntity } = require('strapi-utils');

module.exports = {

    async create(ctx) {
        let entity;
        if (ctx.is('multipart')) {
            const { data, files } = parseMultipartData(ctx);
            entity = await strapi.services.contact_forms.create(data, { files });
        } else {
            entity = await strapi.services.contact_forms.create(ctx.request.body);
        }
        return sanitizeEntity(entity, { model: strapi.models.contact_forms });
    },


};
