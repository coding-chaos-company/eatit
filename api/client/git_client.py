import requests
import sys
from typing import NamedTuple

sys.path.append("../")
from config import constants

class Diff(NamedTuple):
    file_name: str
    additions: int
    delections: int

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
    sorted_repos = sorted(repos_list, key=lambda x: x["pushed_at"], reverse=True)
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
    response = requests.get(latest_commit["url"])
    if response.status_code == 200:
        diffs = response.json()["files"]
        diff_list = []
        for diff in diffs:
            diff_list.append(Diff(diff['filename'], diff['additions'], diff['deletions']))
        return diff_list
    else:
        print("対象コミットのdiffが取得できませんでした．:", latest_commit)


# ユーザの前回更新時までのdiffを全て取得する
def get_commits_diff(user_name: str, last_date: str, current_date: str):
    repos_list = get_repos_list(user_name)
    diff_list = []
    for repo in repos_list:
        repo_name = repo["name"]
        params = {
            "since": last_date.isoformat(),
            "until": current_date.isoformat(),
            "per_page": 100,
        }

        response = requests.get(
            constants.GIT_COMMITS_URL(user_name, repo_name), params=params
        )

        if response.status_code == 200:
            commits_data = response.json()
            if not commits_data:
                return

            for commit in commits_data:
                commit["url"]
                diff_response = requests.get(commit["url"])
                if diff_response.status_code == 200:
                    diffs = diff_response.json()["files"]
                    for diff in diffs:
                        diff_list.append(Diff(diff["filename"], diff["additions"], diff["deletions"]))
                else:
                    return
        else:
            return
    return diff_list