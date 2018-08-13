"use strict";

let db = require('./pghelper');

let findAll = (req, res, next) => {
    let courseId = req.query.courseId;
    let sql = `
        SELECT h.id, h.title, h.details, c.id as course_id, c.code as course_code, c.name
        FROM homework as h
        LEFT OUTER JOIN course as c ON h.course_id=c.id
        ${courseId ? 'WHERE h.course_id = ?' : ''}`;
    db.query(sql, courseId ? [courseId] : [])
        .then(result => res.json(result))
        .catch(next);
};

let findByCourse = (req, res, next) => {
    let course = req.body;
    let table_name = course.code + '_students';
    let path_field = course.id + '_hw';
    let score_field = course.id + '_score';
    var search = course.code.search(/\d/);
    var university_id = course.code.slice(0,search);
    let student_table = university_id + '_student';
    let sql = `
        SELECT s.name as name, r.*
        FROM ${table_name} r
        LEFT JOIN ${student_table} as s ON r.student_id = s.id
        ORDER BY r.student_id`;
    db.query(sql)
        .then(results =>  {
            res.json(results);
        })
        .catch(next);
};

let findById = (req, res, next) => {
    let id = req.params.id;
    let sql = `
        SELECT h.id, h.title, h.details, c.id, c.code, c.name, 
        c.period_id, 
        FROM homework as h
        LEFT JOIN homework as c ON c.id=h.homework_id
        WHERE h.id = ?`;
    db.query(sql, [parseInt(id)])
        .then(homeworks =>  res.json(homeworks[0]))
        .catch(next);
};

let createItem = (req, res, next) => {
    let homework = req.body;
    let table_name = homework.course_code + '_students';
    let path_field = homework.id + '_hw';
    let score_field = homework.id + '_score';
    // let sql = `IF EXISTS (SELECT * FROM ${table_name} WHERE student_id=${homework.student_id})
    //                 UPDATE ${table_name} SET ${path_field} = '${homework.path}' WHERE student_id=${homework.student_id}
    //             ELSE
    //                 INSERT INTO ${table_name} (student_id, ${path_field})    VALUES (?, ?)`;
    let sql = `INSERT INTO ${table_name} (student_id, ${path_field}) VALUES (?, ?)
    ON DUPLICATE KEY UPDATE ${path_field} = '${homework.path}'`;
    db.query(sql, [homework.student_id, homework.path])
        .then(result => {
            res.json(result);
        })
        .catch(next);
};

let updateItem = (req, res, next) => {
    let result = req.body;
    let table_name = result.course_code + '_students';
    let path_field = result.homework_id + '_hw';
    let score_field = result.homework_id + '_score';
    let sql = `UPDATE ${table_name} SET ${score_field}=? WHERE student_id=?`;
    db.query(sql, [result.score, result.id])
        .then(() => res.send({result: 'ok'}))
        .catch(next);
};

let deleteItem = (req, res, next) => {
    let homeworkId = req.params.id;
    db.query('DELETE FROM homework WHERE id=?', [homeworkId], true)
        .then(() => res.send({result: 'ok'}))
        .catch(next);
};

exports.findAll = findAll;
exports.findByCourse = findByCourse;
exports.findById = findById;
exports.createItem = createItem;
exports.updateItem = updateItem;
exports.deleteItem = deleteItem;