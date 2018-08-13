"use strict";

let db = require('./pghelper');

let findAll = (req, res, next) => {
    let name = req.query.name;
    let sql = `SELECT code, name
        FROM university ORDER BY name`;
    db.query(sql)
        .then(result => res.json(result))
        .catch(next);
};

let findById = (req, res, next) => {
    let id = req.params.id;
    let sql = `SELECT code, name
        FROM university WHERE id=?`;
    db.query(sql, [parseInt(id)])
        .then(universitys =>  res.json(universitys[0]))
        .catch(next);
};

let createItem = (req, res, next) => {
    let university = req.body;
    let sql = `
        INSERT IGNORE INTO university SET ?`;
    db.query(sql, [university])
        .then(result => {
            let sql = `CREATE TABLE ` + university.code + `_course (
                id int(20) unsigned NOT NULL AUTO_INCREMENT,
                code varchar(50) DEFAULT NULL,
                name varchar(255) DEFAULT NULL,
                period_id int(11) DEFAULT NULL,
                teacher_id int(11) DEFAULT NULL,
                university_id varchar(20) DEFAULT NULL,
                PRIMARY KEY (id) USING BTREE )`;
            db.query(sql);
            sql = `CREATE TABLE ` + university.code + `_enrollment (
                id bigint(20) unsigned NOT NULL AUTO_INCREMENT,
                course_id int(11) DEFAULT NULL,
                student_id int(11) DEFAULT NULL,
                PRIMARY KEY (id) USING BTREE,
                UNIQUE KEY idx_enrollment (course_id,student_id) USING BTREE
              )`;
            db.query(sql);
            sql = `CREATE TABLE ` + university.code + `_student (
                id int(11) NOT NULL,
                name varchar(30) NOT NULL,
                pwd varchar(50) DEFAULT NULL,
                PRIMARY KEY (id)
              )`;
            db.query(sql);
            res.json(result)
        })
        .catch(next);
};

let updateItem = (req, res, next) => {
    let university = req.body;
    let sql = `UPDATE university SET name=? WHERE code=?`;
    db.query(sql, [university.name, university.code])
        .then(() => res.send({result: 'ok'}))
        .catch(next);
};

let deleteItem = (req, res, next) => {
    let universityId = req.params.id;
    db.query('DELETE FROM university WHERE code=?', [universityId], true)
        .then(() =>res.send({result: 'ok'}))
        .catch(next);
};


exports.findAll = findAll;
exports.findById = findById;
exports.createItem = createItem;
exports.updateItem = updateItem;
exports.deleteItem = deleteItem;