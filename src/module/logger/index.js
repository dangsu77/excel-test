var _path = require('path');
var _mkdirp = require('mkdirp');
var _moment = require('moment');
var _winston = require('winston'),
    _winston_daily_rotate_file = require('winston-daily-rotate-file');

// create logger
var logger = new (_winston.Logger)({
    transports: [
        new (_winston.transports.Console)({
            name: 'console',
            level: 'info',
            colorize: true,
            showLevel: true,
            json: false,
            timestamp: true,
            formatter: formatter,
        })
    ]
});

// logger levels
logger.setLevels({
    none: 0,
    error: 10,
    warn: 20,
    info: 30,
    debug: 40,
    verbose: 50,
});

function formatter(args) {
    var datetime = _moment().format('YYYY-MM-DDTHH:mm:ss.SSSZ');
    return '[' + datetime + '][' + (args.level + ' ').slice(0, 5) + ']' + args.message;
};

function hooks(arg) {
    if (!(this instanceof hooks)) {
        return new hooks(arg);
    }

    // find
    var path = arg.filename.split(_path.sep);
    var index = path.findIndex(function (p) {
        return p === 'src' || p === 'plugins';
    });

    var clazz = ''
    while (index < path.length) {
        if (clazz.length > 0) {
            clazz += '/';
        }
        clazz = clazz + path[index++];
    }

    this.clazz = clazz;
    return this;
};

hooks.prototype.info = function (msg, callback) {
    logger.info('[' + this.clazz + '] ' + msg, callback);
};

hooks.prototype.warn = function (msg, callback) {
    logger.warn('[' + this.clazz + '] ' + msg, callback);
};

hooks.prototype.error = function (msg, callback) {
    logger.error('[' + this.clazz + '] ' + msg, callback);
};

hooks.prototype.debug = function (msg, callback) {
    logger.debug('[' + this.clazz + '] ' + msg, callback);
};

hooks.prototype.verbose = function (msg, callback) {
    logger.verbose('[' + this.clazz + '] ' + msg, callback);
};

hooks.set = function (options) {
    // create file logger
    _mkdirp.sync(_path.dirname(options.file.logpath), function (err) {
        if (err) {
            logger.error('failed to create file logger | ' + err.toString());
            process.exit(-1);
        }
    });

    try { logger.remove('file'); } catch (ignore) { }
    logger.add(_winston_daily_rotate_file, {
        name: 'file',
        filename: options.file.logpath,
        datePattern: '-yyyy-MM-dd.log',
        level: 'info',
        maxsize: 2000000000,
        maxFiles: 1000,
        colorize: false,
        showLevel: true,
        json: false,
        timestamp: true,
        formatter: formatter
    });

    // set options
    if (options.console.level) {
        logger.transports.console.level = options.console.level;
    }
    if (options.file.level) {
        logger.transports.file.level = options.file.level;
    }
};

module.exports = hooks;