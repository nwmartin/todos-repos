var express = require('express');
var app = express();
var _ = require('underscore');
var account = require('./account');
var Org = require('./org').org;
var Repo = require('./repo').repo;

var port = 3001;

app.engine('.html', require('ejs').__express);
app.set('views', __dirname + '/views');
app.set('view engine', 'html');

var GitHubApi = require("github");
var github = new GitHubApi({
    version: "3.0.0",
    timeout: 5000
});

github.authenticate({
    type: "basic",
    username: account.username,
    password: account.password
});

app.get('/', function(req, res){

  github.user.getOrgs({
    user: account.username
  }, function(error, orgs) {
    orgs.forEach( function(orgJson) {
      var org = new Org(orgJson);
      if (org.title === 'RiparianData') {
        github.repos.getFromOrg({
          org: org.title
        }, function(err, repos) {
          repos.forEach(function(repoJson) {
            org.addRepo(new Repo(repoJson));
          });

          res.render('repos', {
            org: org
          });

        });
      }
    });
  });


});

app.listen(port);
console.log('Listening on port ' + port);
