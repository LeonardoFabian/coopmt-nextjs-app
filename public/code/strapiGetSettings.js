getSettings: async (ctx, next) => {
    try {
      const id = ctx.request.params.id;

      if (typeof id === 'string' && id.trim() !== '' && id.length < 1000) {
        // const _metadata = strapi.db.metadata.get(id);

        const result = await strapi.db.connection.table('strapi_core_store_settings')
          .where('key', 'plugin_content_manager_configuration_content_types::' + id)
          .select({ value: 'value' });

        // const result2 = await strapi.db.connection.raw('select value from strapi_core_store_settings where key = ?', ['plugin_content_manager_configuration_content_types' + id]);

        if (result.length > 0) {
          const metadata = JSON.parse(result[0].value);
          const schema = strapi.getModel(ctx.request.params.id);
          // console.log(schema);

          metadata.schema = { attributes: schema.attributes, info: schema.info };

          return metadata;
        }

        return { ok: false };
      }

      return ctx.badRequest('Invalid id: ' + id);
    } catch (err) {
      ctx.body = err;
    }
  },