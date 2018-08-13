"use strict";

let db = require('./pghelper');

let findAll = (req, res, next) => {
    let courseId = req.query.courseId;
    let sql = `
        SELECT *
        FROM ${courseId}_material`;
    db.query(sql)
        .then(result => res.json(result))
        .catch(next);
};

let findById = (req, res, next) => {
    let id = req.params.id;
    let sql = `SELECT *
        FROM lecture
        WHERE id = ?`;
    db.query(sql, [parseInt(id)])
        .then(presents =>  res.json(presents[0]))
        .catch(next);
};

let createItem = (req, res, next) => {
    let present = req.body;
    let sql = `INSERT INTO lecture SET ?`;
    db.query(sql, present)
        .then(result => {
            res.send({id: result.insertId});
        })
        .catch(next);
};

let updateItem = (req, res, next) => {
    let present = req.body;
    let sql = `UPDATE lecture SET ? WHERE id=?`;
    db.query(sql, present)
        .then(() => res.send({result: 'ok'}))
        .catch(next);
};

let deleteItem = (req, res, next) => {
    let presentkId = req.params.id;
    db.query('DELETE FROM lecture WHERE id=?', [presentkId], true)
        .then(() => res.send({result: 'ok'}))
        .catch(next);
};

exports.findAll = findAll;
exports.findById = findById;
exports.createItem = createItem;
exports.updateItem = updateItem;
exports.deleteItem = deleteItem;