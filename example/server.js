var express = require('express')
  , app = express()
  , port = process.env.PORT || 3000;

app.use(express.static(__dirname));

app.listen(port, function () {
	console.log('app listening on port %d', port);
});