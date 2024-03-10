
GIT_BASE_URL = 'https://api.github.com/'

def GIT_REPOS_URL(user_name: str):
  return GIT_BASE_URL + user_name + '/repos/'

def GIT_COMMITS_URL(user_name: str, repo_name: str):
  return GIT_REPOS_URL(user_name) + repo_name + '/commits/'

def GIT_DIFF_URL(commit_url: str):
  return commit_url + '/diff/'