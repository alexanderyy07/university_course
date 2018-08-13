var express = require('express'),
    bodyParser = require('body-parser'),
    compression = require('compression'),
    students = require('./server/students'),
    courses = require('./server/courses'),
    homeworks = require('./server/homeworks'),
    results = require('./server/results'),
    presents = require('./server/presents'),
    enrollments = require('./server/enrollments'),
    teachers = require('./server/teachers'),
    universities = require('./server/universities'),
    periods = require('./server/periods'),
    messages = require('./server/messages'),
    multer = require('multer'),
    busboy = require('connect-busboy'),
    fs = require('fs-extra'),
    mime = require('mime'),
    path = require('path'),
    //sqlinit = require('./server/sqlinit'),
    app = express();

app.set('port', process.env.PORT || 5000);

app.use(bodyParser.json());
app.use(compression());
app.use(busboy());

app.use('/', express.static(__dirname + '/www'));

app.route('/upload')
.post(function (req, res, next) {
    var fstream;
    req.pipe(req.busboy);
    req.busboy.on('file', function (fieldname, file, filename) {
        console.log("Uploading: " + filename);

        //Path where image will be uploaded
        fstream = fs.createWriteStream(__dirname + '/www/upload/' + filename);
        file.pipe(fstream);
        fstream.on('close', function () {    
            console.log("Upload Finished of " + filename);              
            res.json({success: true, filePath:filename});           //where to go next
        });
    });
});

app.route('/downview')
.post(function(req, res, next){
    var file = __dirname + '/www/upload/'+ req.body.filename;

    res.setHeader('Content-disposition', 'attachment; filename=' + file);
    res.setHeader('Content-type', 'text/plain');

    fs.exists(file, (exists) => {
        console.log(exists ? 'sending data' : 'no file to send!');
        if(exists)
        {
            var filestream = fs.createReadStream(file);
            filestream.pipe(res);
        }
        else
            res.send("no file");
    });
});

app.route('/download')
.post(function(req, res, next){
    var file = __dirname + '/www/upload/'+ req.body.filename;
    var filename = path.basename(file);
    var mimetype = mime.lookup(file);
  
    res.setHeader('Content-disposition', 'attachment; filename=' + filename);
    res.setHeader('Content-type', mimetype);
  
    var filestream = fs.createReadStream(file);
    filestream.pipe(res);
});
app.route('/deletefile')
.post(function(req, res, next){
    var file = __dirname + '/www/upload/'+ req.body.filename;

    fs.exists(file, (exists) => {
        console.log(exists ? 'deleting code file' : 'no file to delete!');
        if(exists)
            fs.unlinkSync(file);
      });
    res.send('success');
});

app.get('/students', students.findAll);
app.get('/students/:id', students.findById);
app.get('/students/:id/enrollments', enrollments.findByStudent);
app.post('/students', students.createItem);
app.post('/student', students.findByData);
app.put('/students', students.updateItem);
app.delete('/students/:id', students.deleteItem);

app.get('/results', results.findAll);
app.get('/results/:id', results.findById);
app.post('/results', results.createItem);
app.post('/result', results.findByCourse);
app.put('/results', results.updateItem);
app.delete('/results/:id', results.deleteItem);

app.get('/presents', presents.findAll);
app.get('/presents/:id', presents.findById);
app.post('/presents', presents.createItem);
app.put('/presents', presents.updateItem);
app.delete('/presents/:id', presents.deleteItem);

app.get('/courses', courses.findAll);
app.get('/courses/:id', courses.findById);
app.get('/courses/:id/enrollments', enrollments.findByCourse);
app.post('/courses', courses.createItem);
app.put('/courses', courses.updateItem);
app.delete('/courses/:id', courses.deleteItem);

app.get('/homeworks', homeworks.findAll);
app.get('/homeworks/:id', homeworks.findById);
app.get('/homeworks/:id/results', homeworks.findByHomework);
app.post('/homeworks', homeworks.createItem);
app.put('/homeworks', homeworks.updateItem);
app.delete('/homeworks/:id', homeworks.deleteItem);

app.get('/teachers', teachers.findAll);
app.get('/teachers/:id', teachers.findById);
app.post('/teacher_courses', courses.findByTeacher);
app.post('/teachers', teachers.createItem);
app.post('/teacher', teachers.findByData);
app.put('/teachers', teachers.updateItem);
app.delete('/teachers/:id', teachers.deleteItem);

app.get('/universities', universities.findAll);
app.get('/universities/:id', universities.findById);
app.post('/universities', universities.createItem);
app.put('/universities', universities.updateItem);
app.delete('/universities/:id', universities.deleteItem);

app.get('/messages', messages.findAll);
app.get('/messages/:id', messages.findById);
app.post('/messages', messages.createItem);
app.post('/message', messages.findByData);
app.put('/messages', messages.updateItem);
app.delete('/messages/:id', messages.deleteItem);

app.post('/enrollments', enrollments.createItem);
app.delete('/enrollments/:id', enrollments.deleteItem);

app.get('/periods', periods.findAll);
app.post('/periods', periods.currentPeriod);

app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send(err);
});

app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});