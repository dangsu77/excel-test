var _fs = require('fs');

// var logger = require('../module/logger')(module);

var elasticsearchConfig = {};
// var consoleConfig = {};
// var gatewayConfig = {};

try {
    elasticsearchConfig = JSON.parse(_fs.readFileSync('./config/elasticsearch.json', 'utf8'));
    // consoleConfig = JSON.parse(_fs.readFileSync('./config/console.json', 'utf8'));
    // gatewayConfig = JSON.parse(_fs.readFileSync('./config/gateway.json', 'utf8'));

    // set default
    // consoleConfig.session = consoleConfig.session || {};
    // consoleConfig.session.timeout_seconds = consoleConfig.session.timeout_seconds || 3600; // 1hour

    // set default
    // elasticsearchConfig.search.security = elasticsearchConfig.search.security || '';
    // elasticsearchConfig.service.security = elasticsearchConfig.service.security || '';
    // elasticsearchConfig.stats.security = elasticsearchConfig.stats.security || '';

    // // SSL 인증서 예외 처리
    // process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;

    // // https 확인
    // ['search', 'service', 'stats'].forEach(function (type) {
    //     var protocol = 'http://';
    //     elasticsearchConfig[type].hosts.forEach(function (host) {
    //         if (host.startsWith('https://') === true) {
    //             protocol = 'https://';
    //         }
    //     });

    //     elasticsearchConfig[type].protocol = protocol;
    // });

    // logger.info('loading configuration completed');
}
catch (err) {
    logger.error('could not load configuration | ' + err.toString());
    process.exit(1);
}

module.exports = {
    elasticsearch: elasticsearchConfig
    // console: consoleConfig,
    // gateway: gatewayConfig
};
