var repo = function(json) {
  var self = this;
  self.title = json.name;
  self.pullRequests = [];

  self.addPullRequest = function(pullRequest) {
    self.pullRequests.push(pullRequest);
  };
}

exports.repo = repo;
