"use strict";

let mysql = require('mysql'),
    config = require('./config'),
    databaseURL = config.databaseURL;
var pg = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'my_db',
    multipleStatements: true,
    pipes_as_concat: true,
});
exports.query = function (sql, values, singleItem, dontLog) {

    if (!dontLog) {
        console.log(sql, values);
    }

    return new Promise((resolve, reject) => {
        pg.getConnection(function (err, conn) {
            if (err) return reject(err);
            try {
                conn.query(sql, values, function (err, result) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(singleItem ? result[0] : result);
                    }
                });
                conn.release();
            }
            catch (e) {
                reject(e);
            }
        });

    });

};