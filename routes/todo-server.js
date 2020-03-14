var express = require('express');
var router = express.Router();
const exec = require('child_process').exec;

router.get('/', function(req, res, next) {
  updateNodeApp();
  res.send('ok');
});

router.post('/', function(req, res, next) {
  updateNodeApp();
  res.send('ok');
});


function updateNodeApp (){
	const workingDir = '/home/ubuntu/webapps/todo-server';

	const command = "git pull origin master && npm install && (pm2 delete 'todo-server' || true) && pm2 start npm --name 'todo-server' -- start";
		exec(command, {cwd: workingDir, maxBuffer: 1024 * 500} , (e, stdout, stderr) => {
			if (e instanceof Error) {
				console.error(e);
				throw e;
			}
			console.log('stdout ', stdout);
			console.log('stderr ', stderr);
			
		});
}

module.exports = router;
