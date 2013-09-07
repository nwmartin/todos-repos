var express = require('express');
var _ = require('underscore');
var async = require('async');

var account = require('./account');
var Org = require('./org').org;
var Repo = require('./repo').repo;
var PullRequest = require('./pullRequest').pullRequest;

var port = 3001;

var app = express();
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
      if (account.org == org.title) {
        github.repos.getFromOrg({
          org: account.org
        }, function(err, repos) {
          repos.forEach(function(repoJson) {
            var repo = new Repo(repoJson);
            if (_.contains(account.includeRepos, repo.title)) {
              org.addRepo(new Repo(repoJson));
            }
          });

          var getPullRequestsForRepos = _.map(org.repos, function(repo) {
            return function (callback) {
              github.pullRequests.getAll({
                user: org.title,
                repo: repo.title
              }, function(err, pullRequests) {
                pullRequests.forEach(function(pullRequestJson) {
                  repo.addPullRequest(new PullRequest(pullRequestJson));
                })
                callback();
              });
            };
          });

          async.parallel(getPullRequestsForRepos, function(err) {
            res.render('repos', {
              org: org
            });
          })

        });
      }
    });
  });


});

app.listen(port);
console.log('Listening on port ' + port);
