import requests
import sys
sys.path.append(-1)
from config import constants


# ユーザの全リポジトリを取得する
def get_repos_list(user_name: str):
  response = requests.get(constants.GIT_REPOS_URL(user_name))
  if response.status_code == 200:
    return response.json()
  else:
    print("対象ユーザのリポジトリが見つかりませんでした．:", user_name)
    return

# リポジトリの全コミットを取得する
def get_commits(user_name: str, repo_name: str):
  response = requests.get(constants.GIT_COMMITS_URL(user_name, repo_name))
  if response.status_code == 200:
    return response.json()
  else:
    print("対象リポジトリのコミットが見つかりませんでした．:", repo_name)
    return

# コミットのdiffを取得する
def get_diff(commit_url: str):
  response = requests.get(constants.GIT_DIFF_URL(commit_url))
  if response.status_code == 200:
    return response.text
  else:
    print("対象コミットのdiffが取得できませんでした．:", commit_url)
    return

# ユーザの最新1コミットを取得する
def get_latest_commit(user_name: str, repos_list: list):
  sorted_repos = sorted(repos_list, key=lambda x: x["updated_at"], reverse=True)
  commits = get_commits(user_name, sorted_repos[0]["name"])
  if commits:
    return commits[0]
  else:
    print("対象ユーザの最新1コミットが見つかりませんでした．:", user_name)
    return

# ユーザの最新1コミットのdiffを取得する
def get_latest_commit_diff(user_name: str):
  repos_list = get_repos_list(user_name)
  latest_commit = get_latest_commit(user_name, repos_list)
  return get_diff(latest_commit["url"])


  

