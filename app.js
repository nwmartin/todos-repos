var express = require('express');
var app = express();
var port = 3001;

app.engine('.html', require('ejs').__express);
app.set('views', __dirname + '/views');
app.set('view engine', 'html');

app.get('/', function(req, res){
  res.render('repos', {
    repos: [
      {title:'herp'},
      {title:'derp'}
    ]
  });
});

app.listen(port);
console.log('Listening on port ' + port);
