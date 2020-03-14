var express = require('express');
var router = express.Router();
const exec = require('child_process').exec;

router.get('/', function(req, res, next) {
  updateNodeApp();
  res.send('respond with a resource');
});

router.post('/', function(req, res, next) {
  updateNodeApp();
  res.send('POST respond with a resource');
});


function updateNodeApp (){
	const workingDir = '/home/ubuntu/webapps/trailer-generator';

	const command = "git pull && npm install && (pm2 delete 'node-app-githook' || true) && pm2 start npm --name 'node-app-githook' -- start";
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
