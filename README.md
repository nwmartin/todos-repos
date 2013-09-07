Todos Repos
===========

Setup
-----

You'll want to copy account.json.example to account.json. Fill in username and password with your github username
and password. Fill in the org with your organization - this does not currently support listing user repositories.
Lastly, includeRepos should be a json array of repository names for which you desire to see pull requests.

This runs on node and express. If you already have node installed, as well as npm, you should be able to run
npm install in the root directory and all appropriate dependencies will be picked up.
