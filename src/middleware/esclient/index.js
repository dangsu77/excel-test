var _elasticsearch = require('elasticsearch');

var config = require('../../config');
var logger = require('../../module/logger')(module);
const constants = require('../../constants');

var client = {
  search: new _elasticsearch.Client({
    hosts: config.elasticsearch.search.hosts,
    httpAuth: config.elasticsearch.search.security,
    requestTimeout: config.elasticsearch.search.requestTimeout
  }),
  service: new _elasticsearch.Client({
    hosts: config.elasticsearch.service.hosts,
    httpAuth: config.elasticsearch.service.security,
    requestTimeout: config.elasticsearch.service.equestTimeout
  }),
  stats: new _elasticsearch.Client({
    hosts: config.elasticsearch.stats.hosts,
    httpAuth: config.elasticsearch.service.security,
    requestTimeout: config.elasticsearch.stats.requestTimeout
  })
};

module.exports = {
  search: client.search,
  service: client.service,
  stats: client.stats,
  _custom_: {
    /** 1. index */
    index: (mode, index, docType, payload, _id) => {
      var param = {
        refresh: true,
        index: index,
        type: docType,
        id: _id,
        body: payload
      };

      logger.verbose('client.index\n' + JSON.stringify(param, null, 2));

      return client[mode].index(param)
        .catch(err => {
          logger.error(err);
          throw err;
        })
    },
    /** 2. Create document */
    create: async (mode, index, docType, payload, _id) => {
      var param = {
        refresh: true,
        index: index,
        type: docType,
        id: _id,
        body: payload,
      };

      logger.verbose('client.create\n' + JSON.stringify(param, null, 2));

      return client[mode].create(param)
        .catch(err => {
          logger.error(err);
          throw err;
        })
    },
    /** 3. GET Indices field mapping */
    getFieldMapping: async (mode, index, fields) => {
      var param = {
        ignoreUnavailable: true,
        include_type_name: constants.es_version === 7 ? true : undefined,
        index: index,
        fields: fields
      };

      logger.verbose('client.indices.getFieldMapping\n' + JSON.stringify(param, null, 2));

      return client[mode].indices.getFieldMapping(param)
        .catch(err => {
          logger.error(err);
          throw err;
        })
    },
    getTemplate: async (mode, name) => {
      var param = {
        name: name,
        include_type_name: constants.es_version === 7 ? true : undefined,
      };

      logger.verbose('client.indices.getTemplate\n' + JSON.stringify(param, null, 2));

      return client[mode].indices.getTemplate(param)
        .catch(err => {
          logger.error(err);
          throw err;
        })
    },
    putTemplate: async (mode, name, payload) => {
      var param = {
        name: name,
        body: payload,
        include_type_name: constants.es_version === 7 ? true : undefined,
      };

      logger.verbose('client.indices.putTemplate\n' + JSON.stringify(param, null, 2));

      return client[mode].indices.putTemplate(param)
        .catch(err => {
          logger.error(err);
          throw err;
        })
    },
    /** 4. Get */
    get: async (mode, index, docType, _id) => {
      var param = {
        index: index,
        type: docType,
        id: _id
      };

      logger.verbose('client.get\n' + JSON.stringify(param, null, 2));

      return client[mode].get(param)
        .catch(err => {
          logger.error(err);
          throw err;
        })
    },
    /** 5. Update a document */
    update: async (mode, index, docType, payload, _id) => {
      var param = {
        refresh: true,
        index: index,
        type: docType,
        id: _id,
        body: payload,
      };

      logger.verbose('client.update\n' + JSON.stringify(param, null, 2));

      return client[mode].update(param)
        .catch(err => {
          logger.error(err);
          throw err;
        })
    },
    deleteIndices: async (mode, indices) => {
      var param = {
        ignoreUnavailable: true,
        index: indices,
      };

      logger.verbose('client.indices.delete\n' + JSON.stringify(param, null, 2));

      return client[mode].indices.delete(param)
        .catch(err => {
          logger.error(err);
          throw err;
        })
    },
    deleteDocument: async (mode, index, docType, _id) => {
      var param = {
        refresh: true,
        index: index,
        type: docType,
        id: _id
      };

      logger.verbose('client.delete\n' + JSON.stringify(param, null, 2));

      return client[mode].delete(param)
        .catch(err => {
          logger.error(err);
          throw err;
        })
    },
    /** 6. Search */
    search: async (mode, index, docType, payload, scrollOption) => {
      var param = {
        ignoreUnavailable: true,
        rest_total_hits_as_int: constants.es_version === 7 ? true : undefined,
        scroll: scrollOption,
        index: index,
        type: docType,
        body: payload,
      };

      logger.verbose('client.search\n' + JSON.stringify(param, null, 2));

      return client[mode].search(param)
        .catch(err => {
          logger.error(err);
          throw err;
        })
    },
    /** 9. Scroll */
    scroll: async (mode, scroll, scrollId) => {
      var param = {
        scrollId: scrollId,
        rest_total_hits_as_int: constants.es_version === 7 ? true : undefined,
        scroll: scroll,
      };

      logger.verbose('client.scroll\n' + JSON.stringify(param, null, 2));

      return client[mode].scroll(param)
        .catch(err => {
          logger.error(err);
          throw err;
        })
    },
    nodeInfo: async (mode, params) => {
      logger.verbose('client.nodes.info\n' + JSON.stringify(params, null, 2));

      return client[mode].nodes.info(params)
        .catch(err => {
          logger.error(err);
          throw err;
        })
    },
    deleteByQuery: async (mode, index, docType, payload) => {
      var param = {
        ignoreUnavailable: true,
        refresh: true,
        index: index,
        type: docType,
        body: payload,
      };

      logger.verbose('client.deleteByQuery\n' + JSON.stringify(param, null, 2));

      return client[mode].deleteByQuery(param)
        .catch(err => {
          logger.error(err);
          throw err;
        })
    },
    bulk: async (mode, payload) => {
      logger.verbose('client.bulk\n' + JSON.stringify(payload, null, 2));

      return client[mode].bulk({
        refresh: true,
        body: payload,
      })
        .catch(err => {
          logger.error(err);
          throw err;
        })
    },
    indicesAnalyze: async (mode, index, payload) => {
      logger.verbose('client.indices.analyze\n' + JSON.stringify(payload, null, 2));

      return client[mode].indices.analyze({
        index: index,
        body: payload
      })
    }
  }
};