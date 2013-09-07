var org = function(json) {
  var self = this;
  self.title = json.login;
  self.repos = [];

  self.addRepo = function(repo) {
    self.repos.push(repo);
  }
}

exports.org = org;
