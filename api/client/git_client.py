import requests
import sys
import datetime
import time
from typing import NamedTuple
from utils import log_info, log_debug

sys.path.append("../")
from config import constants


class Diff(NamedTuple):
    file_name: str
    additions: int
    delections: int


class GitClient:
    def __init__(self, user_name: str):
        self.user_name = user_name
        self.__headers = {
            "Authorization": f"token {constants.ACCESS_TOKEN}",
            "Accept": "application/vnd.github.v3+json"
        }

    # ユーザの全リポジトリを取得する
    def get_repos_list(self):
        response = requests.get(constants.GIT_REPOS_URL(self.user_name), headers=self.__headers)
        if response.status_code == 200:
            return response.json()
        else:
            print("対象ユーザのリポジトリが見つかりませんでした．:", self.user_name)
            return

    # リポジトリの全コミットを取得する
    def get_commits(self, repo_name: str):
        response = requests.get(constants.GIT_COMMITS_URL(self.user_name, repo_name), headers=self.__headers)
        if response.status_code == 200:
            return response.json()
        else:
            print("対象リポジトリのコミットが見つかりませんでした．:", repo_name)
            return

    # ユーザの最新1コミットを取得する
    def get_latest_commit(self, repos_list: list):
        sorted_repos = sorted(repos_list, key=lambda x: x["pushed_at"], reverse=True)
        commits = self.get_commits(sorted_repos[0]["name"])
        if commits:
            return commits[0]
        else:
            print("対象ユーザの最新1コミットが見つかりませんでした．:", self.user_name)
            return

    # ユーザの最新1コミットのdiffを取得する
    def get_latest_commit_diff(self):
        repos_list = self.get_repos_list()
        latest_commit = self.get_latest_commit(repos_list)
        response = requests.get(latest_commit["url"], headers=self.__headers)
        if response.status_code == 200:
            diffs = response.json()["files"]
            diff_list = []
            for diff in diffs:
                diff_list.append(
                    Diff(diff["filename"], diff["additions"], diff["deletions"])
                )
            return diff_list
        else:
            print("対象コミットのdiffが取得できませんでした．:", latest_commit)

    # ユーザの前回更新時までのdiffを全て取得する
    def get_commits_diff(self, last_date: str, current_date: str):
        repos_list = self.get_repos_list()
        repo_commit_list = []
        for repo in repos_list:
            repo_name = repo["name"]
            params = {
                "since": last_date.isoformat(),
                "until": current_date.isoformat(),
                "per_page": 100,
            }

            response = requests.get(
                constants.GIT_COMMITS_URL(self.user_name, repo_name), params=params, headers=self.__headers
            )

            if response.status_code == 200:
                commits_data = response.json()
                if not commits_data:
                    continue

                commit_list = []
                for commit in commits_data:
                    commit["url"]
                    diff_response = requests.get(commit["url"], headers=self.__headers)
                    if diff_response.status_code == 200:
                        diffs = diff_response.json()["files"]
                        diff_list = []
                        for diff in diffs:
                            diff_list.append(
                                Diff(
                                    diff["filename"],
                                    diff["additions"],
                                    diff["deletions"],
                                )
                            )
                        commit_list.append(diff_list)
                    else:
                        return
                repo_commit_list += commit_list
            else:
                return
        return repo_commit_list

    def exist_5days_commits(self, last_date: str, current_date: str):
        # True:恐竜が生きている．False:恐竜が死んでいる
        repos_list = self.get_repos_list()
        date_list = []
        for repo in repos_list:
            log_info(repo["name"])
            repo_name = repo["name"]
            params = {
                "since": last_date.isoformat(),
                "until": current_date.isoformat(),
                "per_page": 100,
            }

            response = requests.get(
                constants.GIT_COMMITS_URL(self.user_name, repo_name), params=params, headers=self.__headers
            )

            if response.status_code == 200:
                commits_data = response.json()
                if not commits_data:
                    continue
                else:
                    for commit in commits_data:
                        utc_date_str = commit["commit"]["author"]["date"]
                        utc_date = datetime.datetime.strptime(utc_date_str, '%Y-%m-%dT%H:%M:%SZ')
                        jst_offset = datetime.timedelta(hours=9)
                        date_list.append(utc_date + jst_offset)
            else:
                continue

        sorted_date_list = sorted(date_list, key=lambda x: x)
        sorted_date_list.append(current_date)
        for first, second in zip(sorted_date_list[:-1], sorted_date_list[1:]):
            delta = abs(second - first)
            delta_days = delta.days
            if int(delta_days) < 5:
                continue
            else:
                log_info(delta_days)
                return False
        return True
