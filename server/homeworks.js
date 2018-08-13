"use strict";

let db = require('./pghelper');

let findAll = (req, res, next) => {
    let courseId = req.query.courseId;
    let table_name = courseId + '_homework';
    let sql = `
        SELECT h.id, h.title, h.details
        FROM ${table_name} as h`;
    db.query(sql)
        .then(result => res.json(result))
        .catch(next);
};

let findByTeacher = (req, res, next) => {
    let teacherId = req.params.id;
    let sql = `
        SELECT c.id, c.code, c.name, teacher_id, t.name as teacher_name,
            c.period_id, p.name as period_name,
            count(e.student_id) as student_count
        FROM homework as c
        INNER JOIN teacher as t ON c.teacher_id=t.id
        INNER JOIN period as p ON c.period_id=p.id
        LEFT OUTER JOIN enrollment as e ON c.id=e.homework_id
        WHERE teacher_id = ?
        GROUP BY c.id, t.name p.name
        ORDER BY period_id DESC, code`;
    db.query(sql, [parseInt(teacherId)])
        .then(homeworks =>  res.json(homeworks))
        .catch(next);
};

let findByHomework = (req, res, next) => {
    let homework = req.params.homeworkId;
    let table_name = homework.course_code + homework.course_id;
    let path_field = homework.id + '_hw';
    let score_field = homework.id + '_score';
    let sql = `
        SELECT r.id, r.std_id, ${path_field}, ${score_field}, s.name as student_name
        FROM ${table_name} as r
        LEFT JOIN student as s ON r.student_id = s.id
        ORDER BY r.id`;
    db.query(sql)
        .then(homeworks =>  res.json(homeworks))
        .catch(next);
};

let findById = (req, res, next) => {
    let id = req.params.id;
    let sql = `
        SELECT h.id, h.title, h.details, c.id as course_id, c.code as course_code, c.name as course_name, 
        c.period_id
        FROM homework as h
        LEFT JOIN course as c ON c.id=h.course_id
        WHERE h.id = ?`;
    db.query(sql, [parseInt(id)])
        .then(homeworks =>  res.json(homeworks[0]))
        .catch(next);
};

let createItem = (req, res, next) => {
    let homework = req.body;
    let table_name = homework.course_code + '_homework';
    let sql = `INSERT INTO ${table_name} (title, details)
			   VALUES (?, ?)`;
    db.query(sql, [homework.title, homework.details])
        .then(result => {
            let sql = `
                ALTER TABLE ` + homework.course_code + '_students' + `
                ADD ` + result.insertId + `_hw TEXT;
                ALTER TABLE ` + homework.course_code + '_students' + `
                ADD ` + result.insertId + `_score DOUBLE;
              `;
            db.query(sql);
            res.send({id: result.insertId});
        })
        .catch(next);
};

let updateItem = (req, res, next) => {
    let homework = req.body;
    let sql = `UPDATE homework SET title=?, details=? WHERE id=?`;
    db.query(sql, [homework.title, homework.details, homework.id])
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
exports.findByTeacher = findByTeacher;
exports.findById = findById;
exports.createItem = createItem;
exports.updateItem = updateItem;
exports.deleteItem = deleteItem;
exports.findByHomework = findByHomework;