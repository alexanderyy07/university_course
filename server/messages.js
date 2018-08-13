"use strict";

let db = require('./pghelper');

let findAll = (req, res, next) => {
    let sql = `SELECT c.id, c.user_id, c.pos, c.text, c.time, c.type, IF (pos='teacher', t.name, s.name) user_name
        FROM chat as c
        LEFT JOIN student as s on c.user_id = s.id
        LEFT JOIN teacher as t on c.user_id = t.id
        ORDER BY time`;
    db.query(sql)
        .then(result => res.json(result))
        .catch(next);
};

let findById = (req, res, next) => {
    let id = req.params.id;
    let sql = `SELECT id, user_id, pos, text, time
        FROM chat WHERE id=?`;
    db.query(sql, [parseInt(id)])
        .then(teachers =>  res.json(teachers[0]))
        .catch(next);
};

let findByData = (req, res, next) => {
    let msg = req.body;
    let sql = `SELECT id, user_id, pos, text, time WHERE user_id=? AND pos=?`;
    db.query(sql, [msg.user_id, msg.pos])
    .then(msgs =>  res.json(msgs[0]))
    .catch(next);
};

let createItem = (req, res, next) => {
    let msg = req.body;
    let sql = `
        INSERT INTO chat SET ?`;
    db.query(sql, [msg])
        .then(result => {
            res.json(result)
        })
        .catch(next);
};

let updateItem = (req, res, next) => {
    let msg = req.body;
    let sql = `UPDATE chat SET text=? WHERE id=?`;
    db.query(sql, [msg.text, msg.id])
        .then(() => res.send({result: 'ok'}))
        .catch(next);
};

let deleteItem = (req, res, next) => {
    let msgId = req.params.id;
    db.query('DELETE FROM chat WHERE id=?', [msgId], true)
        .then(() =>res.send({result: 'ok'}))
        .catch(next);
};


exports.findAll = findAll;
exports.findById = findById;
exports.createItem = createItem;
exports.updateItem = updateItem;
exports.findByData = findByData;
exports.deleteItem = deleteItem;