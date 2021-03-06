var express = require('express');
var router = express.Router();

var taskList = [
	{id : 1, name : 'Fix that bug', isCompleted : false},
	{id : 2, name : 'Watch a movie', isCompleted : true},
];

/* GET task listing. */
router.get('/', function(req, res, next) {
  var viewModel = {
  	list : taskList
  };
  res.render('tasks/list', viewModel);
});

router.get('/new', function(req, res, next){
	res.render('tasks/new');
});

router.post('/new', function(req, res, next){
	var taskName = req.body.txtTask,
		newTaskId = taskList.reduce(function(result, task){
			return result > task.id ? result : task.id;
		},0)+1;
	var newTask = {
		id : newTaskId,
		name : taskName,
		isCompleted : false
	};
	taskList.push(newTask);
	res.redirect('/tasks');
});

router.get('/toggle/:id', function(req, res, next){
	var taskId = parseInt(req.params.id),
		task = taskList.filter(function(t){
			return t.id === taskId;
		})[0];
	if (task){
		task.isCompleted = !task.isCompleted;
	}
	res.redirect('/tasks');
});

module.exports = router;
