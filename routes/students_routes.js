'use strict';
var Student = require(__dirname + '/../models/students');
var express = require('express');
var jsonParser = require('body-parser').json();
var handleError = require(__dirname + '/../lib/handle_error');
var eatauth = require(__dirname + '/../lib/eat_auth');

var studentsRoute = module.exports = exports = express.Router();

studentsRoute.get('/students', function(req, res) {
	Student.find({}, function(err,data) {
		if (err) return handleError(err,res);
		res.json(data);
	});
}); 

studentsRoute.get('/students/:name', function(req,res) {
	Student.find({name:req.params.name}, function(err,data){
		if(err) return handleError(err,res);
		res.json(data);
	});

});

studentsRoute.put('/students/:id', jsonParser, function(req, res) {
  var newStudentBody = req.body;
  delete newStudentBody._id;
  Student.update({_id: req.params.id}, newStudentBody, function(err, data) {
    if (err) return handleError(err, res);
    res.json({msg: 'success'});
  });
});

studentsRoute.post('/students', jsonParser, /*eatauth,*/ function(req,res) {
	var newStudent = new Student(req.body);
	//newStudent.email = req.email;
	newStudent.save(function(err, data) {
		if (err) handleError(err,res);
		Student.schema.path('name').validate(function(value) {
		return value.length<20;}, "Too long name");
		res.json(data);
	});
});


studentsRoute.delete('/students/:id', function(req, res) {
  Student.remove({_id: req.params.id}, function(err) {
    if (err) return handleError(err, res);
    res.json({msg: 'success'});
  });
});





