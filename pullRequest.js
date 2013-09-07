var pullRequest = function(json) {
  var self = this;
  self.title = json.title;
  self.url = json.html_url;
  self.number = json.number;
}

exports.pullRequest = pullRequest;
