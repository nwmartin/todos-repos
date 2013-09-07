var org = function(json) {
  var self = this;
  self.title = json.login;
  var repos = [];

  self.addRepo = function(repo) {
    repos.push(repo);
  }

  self.getRepos = function() {
    return repos;
  }
}

exports.org = org;
