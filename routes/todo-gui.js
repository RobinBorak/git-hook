var express = require('express');
var router = express.Router();
const exec = require('child_process').exec;

router.get('/', function(req, res, next) {
  updateReactApp();
  res.send('ok');
});

router.post('/', function(req, res, next) {
  updateReactApp();
  res.send('ok');
});


function updateReactApp (){
	const workingDir = '/home/ubuntu/webapps/todo-gui';
	const wwwRoot = '/home/ubuntu/www';

	const command = `git pull origin master && npm install && npm run build && cp -r build/ ${wwwRoot}/todo`;
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
