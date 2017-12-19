'use strict';

var mysql = require('mysql');
var config = require('./config.json');
var poolCluster = mysql.createPoolCluster();
poolCluster.add('MASTER', config[process.env.NODE_ENV ? process.env.NODE_ENV : 'development'].database);

var esc = mysql.escape;


/**
 * ##queryLoggingWrapper
 * - overriding pool.query
 * - SQL 및 소요시간 로그
 * @param {String} sql
 * @param {String[]} [values]
 * @param {Function} callback
 */
function queryLoggingWrapper(...args) {
    var callback;
    if (typeof args[args.length - 1] === 'function') {
        callback = args.pop();
    } else {
        callback = function () {};
    }

    var startTime = new Date().getTime();
    var takeTimes;

    var query = this._query(...args, function (err, rows, fields) {
        takeTimes = new Date().getTime() - startTime;
        if(err) {
            console.error(formatted_sql.red, err);
        } else {
            if (takeTimes > 3000) {
                console.log(`${takeTimes}ms: ${formatted_sql}`);
            } else {
                console.log(`${takeTimes}ms: ${formatted_sql}`);
            }
        }
        callback(err, rows);
    });

    var formatted_sql = query.sql;

    setTimeout(() => {
        if (takeTimes === undefined) {
            console.log(`pending.. ${formatted_sql}`)
        }
    }, 5000);
}

/**
 * ## commitReleaseWrapper
 * connection을 bind해주고 사용해야 함.
 * 트랜잭션 커밋 후 에러가 나지 않으면 커넥션을 릴리즈해줍니다.
 *
 * @param {function} callback
 */
function commitReleaseWrapper(callback) {
    this.commit(err => {
        if (err) return callback(err);
        this.release();
        callback();
    });
}

/**
 * ## rollbackReleaseWrapper
 * connection을 bind해주고 사용해야 함.
 * 트랜잭션 롤백 후 커넥션을 릴리즈해줍니다.
 *
 * @param {any} callback
 */
function rollbackReleaseWrapper(callback) {
    this.rollback(() => {
        this.release();
        callback();
    });
}

var query = function(...args) {
    var callback;
    if (typeof args[args.length - 1] === 'function') {
        callback = args.pop();
    } else {
        callback = function () {};
    }

    var sql = args[0].sql || args[0];
    poolCluster.getConnection('MASTER', (err, connection) => {
        if (err) return callback(err);
        if (!connection._query) {
            connection._query = connection.query;
        }
        queryLoggingWrapper.call(connection, ...args, (err, rows) => {
            connection.release();
            callback(err, rows);
        });
    });
}


// pool.getConnection = pool.getConnection;
var getConnection = function(callback) {
    poolCluster.getConnection('MASTER', function(err, connection) {
        if (err) return callback(err);
        if (!connection._query) {
            connection._query = connection.query;
        }
        connection.query = queryLoggingWrapper.bind(connection);
        connection.commitRelease = commitReleaseWrapper.bind(connection);
        connection.rollbackRelease = rollbackReleaseWrapper.bind(connection);
        connection.beginTransaction(err => {
            if (err) return callback(err);
            callback(null, connection);
        });
    });
}

module.exports = {
    mysql: mysql,
    escape: mysql.escape,
    format: mysql.format,
    query,
    getConnection,
};