"use strict";

let db = require('./pghelper');

let findAll = (req, res, next) => {
    let universityId = req.query.universityId;
    let table_name = universityId + `_course`;
    let sql = `
        SELECT c.id, c.code, c.name, c.teacher_id, c.university_id, t.name as teacher_name,
            c.period_id, p.name as period_name,
            count(e.student_id) as student_count
        FROM ${table_name} as c
        INNER JOIN teacher as t ON c.teacher_id=t.id
        INNER JOIN period as p ON c.period_id=p.id
        LEFT OUTER JOIN enrollment as e ON c.id=e.course_id
        GROUP BY c.id, t.name, p.name
        ORDER BY period_id DESC, code`;
    db.query(sql, universityId ? [universityId] : [])
        .then(result => res.json(result))
        .catch(next);
};

let findByTeacher = (req, res, next) => {
    let teacherId = req.body.teacher_id;
    let universityId = req.body.university_id;
    let table_name = universityId + '_course';
    let sql = `
        SELECT c.id, c.code, c.name, c.teacher_id, c.university_id, t.name as teacher_name,
            c.period_id, p.name as period_name,
            count(e.student_id) as student_count
        FROM ${table_name} as c
        INNER JOIN teacher as t ON c.teacher_id=t.id
        INNER JOIN period as p ON c.period_id=p.id
        LEFT OUTER JOIN ${universityId}_enrollment as e ON c.id=e.course_id
        WHERE teacher_id = ?
        GROUP BY c.id, t.name, p.name
        ORDER BY period_id DESC, code`;
    db.query(sql, [parseInt(teacherId)])
        .then(courses =>  res.json(courses))
        .catch(next);
};

let findById = (req, res, next) => {
    let id = req.params.id;
    var search = id.search(/\d/);
    var university_id = id.slice(0,search);
    var course_id = id.slice(search+6);
    let sql = `
        SELECT c.id, c.code, c.name, c.university_id, c.teacher_id, t.name as teacher_name,
            c.period_id, p.name as period_name
        FROM ${university_id}_course as c
        INNER JOIN teacher as t ON c.teacher_id=t.id
        INNER JOIN period as p ON c.period_id=p.id
        WHERE c.id = ?`;
    db.query(sql, [parseInt(course_id)])
        .then(courses =>  res.json(courses[0]))
        .catch(next);
};

let createItem = (req, res, next) => {
    let course = req.body;
    let table_name = course.university_id+'_course';
    let sql = `INSERT INTO ${table_name} (name, period_id, teacher_id, university_id)
			   VALUES (?, ?, ?, ?)`;
    db.query(sql, [course.name, course.period_id, course.teacher_id, course.university_id])
        .then(result => {
            let sql = `SELECT * FROM period WHERE id=?`;
            db.query(sql, [course.period_id]).then(periods => {
                let secret_code = course.university_id + periods[0]['year'] + periods[0]['semester'] + result.insertId;
                sql = `CREATE TABLE ` + secret_code +`_students`+ ` (
                    student_id int(0) NOT NULL,
                    PRIMARY KEY (student_id)
                  )`;
                db.query(sql);
                sql = `CREATE TABLE ` + secret_code + `_homework` + ` (
                    id int(11) NOT NULL AUTO_INCREMENT,
                    title varchar(255) DEFAULT NULL,
                    details varchar(255) DEFAULT NULL,
                    PRIMARY KEY (id) USING BTREE
                  )`;
                db.query(sql);
                sql = `CREATE TABLE ` + secret_code + `_material (
                    id int(11) NOT NULL AUTO_INCREMENT,
                    teacher_id int(11) DEFAULT NULL,
                    description text,
                    path text,
                    size bigint(20) DEFAULT NULL,
                    uploaded_time timestamp NULL DEFAULT CURRENT_TIMESTAMP,
                    PRIMARY KEY (id)
                  )`;
                db.query(sql);
                sql = `CREATE TABLE ` + secret_code + `_chat` + ` (
                    id int(11) NOT NULL AUTO_INCREMENT,
                    user_id int(11) DEFAULT NULL,
                    pos varchar(20) DEFAULT NULL,
                    text text,
                    time timestamp NULL DEFAULT CURRENT_TIMESTAMP,
                    type tinyint(4) DEFAULT NULL,
                    PRIMARY KEY (id)
                  )`;
                db.query(sql);
                sql = `UPDATE ${table_name} SET code=? WHERE id=?`;
                db.query(sql, [secret_code,result.insertId]);
                res.send({id: secret_code});
            });
        })
        .catch(next);
};

let updateItem = (req, res, next) => {
    let course = req.body;
    let table_name = course.university_id + '_course';
    let sql = `UPDATE ${table_name} SET code=?, name=?, period_id=?, teacher_id=? WHERE id=?`;
    db.query(sql, [course.code, course.name, course.period_id, course.teacher_id, course.id])
        .then(() => res.send({result: 'ok'}))
        .catch(next);
};

let deleteItem = (req, res, next) => {
    let courseId = req.params.id;
    var search = courseId.search(/\d/);
    var university_id = courseId.slice(0,search);
    var course_id = courseId.slice(search+6);
    db.query(`DELETE FROM ${university_id}_course WHERE id=?`, [course_id], true)
        .then(() => {
            let sql = `DROP TABLE IF EXISTS ` + courseId +`_students`;
            db.query(sql);
            sql = `DROP TABLE IF EXISTS ` + courseId + `_homework`;
            db.query(sql);
            sql = `DROP TABLE IF EXISTS ` + courseId + `_material`;
            db.query(sql);
            sql = `DROP TABLE IF EXISTS ` + courseId + `_chat`;
            db.query(sql);
            res.send({result: 'ok'});
        })
        .catch(next);
};

exports.findAll = findAll;
exports.findByTeacher = findByTeacher;
exports.findById = findById;
exports.createItem = createItem;
exports.updateItem = updateItem;
exports.deleteItem = deleteItem;