"use strict";

let db = require('./pghelper');

let findAll = (req, res, next) => {
    let name = req.query.name;
    let sql = `SELECT t.id, t.name, t.email, t.allowed, u.name AS university, t.university AS university_id, t.department, IF ( allowed, 'Approved', 'Not') approved
        FROM teacher as t 
        INNER JOIN university as u ON t.university=u.code
        ORDER BY name`;
    db.query(sql)
        .then(result => res.json(result))
        .catch(next);
};

let findById = (req, res, next) => {
    let id = req.params.id;
    let sql = `SELECT t.id, t.name AS name, t.email, t.allowed, u.name AS university, t.department, t.university AS university_id
        FROM teacher as t 
        INNER JOIN university as u ON t.university=u.code WHERE id=?`;
    db.query(sql, [parseInt(id)])
        .then(teachers =>  res.json(teachers[0]))
        .catch(next);
};

let findByData = (req, res, next) => {
    let teacher = req.body;
    let sql = `SELECT id, name, email, university, department, allowed FROM teacher WHERE email=? AND pwd=?`;
    db.query(sql, [teacher.email,teacher.pwd])
    .then(teachers =>  res.json(teachers[0]))
    .catch(next);
};

let createItem = (req, res, next) => {
    let teacher = req.body;
    let sql = `
        INSERT IGNORE INTO teacher SET ?`;
    db.query(sql, [teacher])
        .then(result => {
            res.json(result)
        })
        .catch(next);
};

let updateItem = (req, res, next) => {
    let teacher = req.body;
    let sql = `UPDATE teacher SET name=?, email=?, university=?, department=?, allowed=? WHERE id=?`;
    db.query(sql, [teacher.name, teacher.email, teacher.university_id, teacher.department, teacher.allowed, teacher.id])
        .then(() => res.send({result: 'ok'}))
        .catch(next);
};

let deleteItem = (req, res, next) => {
    let teacherId = req.params.id;
    db.query('DELETE FROM teacher WHERE id=?', [teacherId], true)
        .then(() =>res.send({result: 'ok'}))
        .catch(next);
};


exports.findAll = findAll;
exports.findById = findById;
exports.createItem = createItem;
exports.updateItem = updateItem;
exports.findByData = findByData;
exports.deleteItem = deleteItem;