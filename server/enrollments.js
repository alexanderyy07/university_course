"use strict";

let db = require('./pghelper');

let findByStudent = (req, res, next) => {

    let Id = req.params.id;
    let periodId = req.query.periodId;

    var search = Id.search(/\d/);
    var university_id = Id.slice(0,search);
    var studentId = Id.slice(search);
    let params = [studentId];
    if (periodId) params.push(periodId);

    let sql = `
        SELECT e.id, e.student_id, e.course_id, c.code, c.name as course_name,
            c.teacher_id, t.name as teacher_name,
            c.period_id, p.name as period_name
        FROM ${university_id}enrollment as e
        INNER JOIN ${university_id}course AS c ON e.course_id=c.id
        INNER JOIN teacher AS t ON c.teacher_id = t.id
        INNER JOIN period AS p ON c.period_id = p.id
        WHERE student_id=? ${periodId ? "AND period_id=?" : ""}
        ORDER BY c.period_id DESC, c.code`;

    db.query(sql, params)
        .then(result => res.json(result))
        .catch(next);

};

let findByCourse = (req, res, next) => {

    let courseId = req.params.id;

    let sql = `
        SELECT e.id, s.id as student_id, name
        FROM enrollment as e
        INNER JOIN student AS s ON e.student_id=s.id
        WHERE course_id=?
        ORDER BY name`;

    db.query(sql, [courseId])
        .then(result => res.json(result))
        .catch(next);

};

let createItem = (req, res, next) => {
    let enrollment = req.body;
    var course_code = enrollment.course_code;
    var search = course_code.search(/\d/);
    var university_id = course_code.slice(0,search);
    var course_id = course_code.slice(search+6);
    var search = enrollment.student_id.search(/\d/);
    var student_id = enrollment.student_id.slice(search);
    let sql = `INSERT INTO ${university_id}_enrollment (student_id, course_id) VALUES (?,?)`;
    db.query(sql, [student_id, course_id])
        .then(result => {
            let sql = `INSERT INTO ${course_code}_students (student_id) VALUES (?)`;
            db.query(sql, [student_id]);
            res.send({result: "ok"})
        })
        .catch(next);
};

let deleteItem = (req, res, next) => {
    let enrollmentId = req.params.id;
    db.query('DELETE FROM enrollment WHERE id=?', [enrollmentId], true)
        .then(() => res.send({result: 'ok'}))
        .catch(next);
};

exports.findByStudent = findByStudent;
exports.findByCourse = findByCourse;
exports.createItem = createItem;
exports.deleteItem = deleteItem;