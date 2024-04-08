import requests
import sys
import datetime
from typing import NamedTuple
from typing import NamedTuple
from utils import log_info

sys.path.append("../")
from config import constants


class Diff(NamedTuple):
    file_name: str
    additions: int
    delections: int
    date: str
    current_hash: str
    parent_hash: str


class GitClient:
    def __init__(self, user_name: str):
        self.__headers = {
            "Authorization": f"token {constants.ACCESS_TOKEN}",
            "Accept": "application/vnd.github.v3+json",
        }
        self.user_name = user_name
        self.display_name = self.__get_user_display_name()

    # ユーザのdisplayNameを取得する
    def __get_user_display_name(self):
        response = requests.get(
            constants.GIT_USER_URL(self.user_name), headers=self.__headers
        )

        if response.status_code == 200:
            return response.json()["name"]
        else:
            print("対象ユーザが見つかりませんでした。：", self.user_name)

    # ユーザの全リポジトリを取得する
    def get_repos_list(self) -> list:
        response = requests.get(
            constants.GIT_REPOS_URL(self.user_name), headers=self.__headers
        )
        if response.status_code == 200:
            return response.json()
        else:
            print("対象ユーザのリポジトリが見つかりませんでした．:", self.user_name)
            return []

    # ユーザの全イベントを取得する
    def get_events(self) -> list:
        response = requests.get(
            constants.GIT_EVENTS_URL(self.user_name), headers=self.__headers
        )
        if response.status_code == 200:
            return response.json()
        else:
            print("対象ユーザのイベントが見つかりませんでした。：", self.user_name)
            return []

    # リポジトリの全コミットを取得する
    def get_commits(self, repo_name: str) -> list:
        response = requests.get(
            constants.GIT_COMMITS_URL(self.user_name, repo_name), headers=self.__headers
        )
        if response.status_code == 200:
            return response.json()
        else:
            print("対象リポジトリのコミットが見つかりませんでした．:", repo_name)
            return []

    # ユーザの最新1コミットを取得する
    def get_latest_commit(self, repos_list: list) -> dict:
        sorted_repos = sorted(repos_list, key=lambda x: x["pushed_at"], reverse=True)
        commits = self.get_commits(sorted_repos[0]["name"])
        if commits:
            return commits[0]
        else:
            print("対象ユーザの最新1コミットが見つかりませんでした．:", self.user_name)
            return {}

    # ユーザの最新1コミットのdiffを取得する
    def get_latest_commit_diff(self) -> list:
        repos_list = self.get_repos_list()
        latest_commit = self.get_latest_commit(repos_list)

        parent_hash = ""
        if len(latest_commit["parents"]) > 0:
            parent_hash = latest_commit["parents"][0]["sha"]

        response = requests.get(latest_commit["url"], headers=self.__headers)
        if response.status_code == 200:
            diffs = response.json()["files"]
            diff_list = []
            for diff in diffs:
                diff_list.append(
                    Diff(
                        diff["filename"],
                        diff["additions"],
                        diff["deletions"],
                        "",
                        latest_commit["sha"],
                        parent_hash,
                    )
                )
            return diff_list
        else:
            print("対象コミットのdiffが取得できませんでした．:", latest_commit)
            return []

    # ユーザの前回更新時までのdiffを全て取得する
    def get_commits_diff(self, last_date: str) -> list:
        events_list = self.get_events()
        commit_list = []
        for event in events_list:
            # 現段階ではプッシュイベントのみを対象にする
            if event["type"] == "PushEvent":
                date_str = event["created_at"]
                date = datetime.datetime.strptime(date_str, "%Y-%m-%dT%H:%M:%SZ")
                jst_offset = datetime.timedelta(hours=9)

                if date + jst_offset <= last_date:
                    break

                commits = event["payload"]["commits"]
                if not commits:
                    continue
                for commit in commits:
                    author = commit["author"]["name"]
                    # コミット作成者がユーザ名と一致している時のみ判定
                    if author == self.user_name or author == self.display_name:
                        # コミットメッセージにmergeが含まれていたらマージコミットと判断してスキップ
                        if "merge" in commit["message"].lower():
                            continue

                        response = requests.get(commit["url"], headers=self.__headers)
                        if response.status_code == 200:
                            commit_data = response.json()
                            diffs = commit_data["files"]
                            parents = commit_data["parents"]
                            parent_hash = ""
                            if len(parents) > 0:
                                parent_hash = parents[0]["sha"]

                            diff_list = []
                            for diff in diffs:
                                diff_list.append(
                                    Diff(
                                        diff["filename"],
                                        diff["additions"],
                                        diff["deletions"],
                                        date + jst_offset,
                                        commit["sha"],
                                        parent_hash,
                                    )
                                )
                            commit_list.append(diff_list)
                        else:
                            return []

        return commit_list

    # 最終餌やり日から5日間の間にコミットしているかを判定
    def exist_5days_commits(self, last_date: str, current_date: str) -> bool:
        events_list = self.get_events()
        date_list = []
        for event in events_list:
            # 現段階ではプッシュイベントのみを対象にする
            if event["type"] == "PushEvent":
                date_str = event["created_at"]
                date = datetime.datetime.strptime(date_str, "%Y-%m-%dT%H:%M:%SZ")
                jst_offset = datetime.timedelta(hours=9)
                if date + jst_offset <= last_date:
                    break

                commits = event["payload"]["commits"]
                if not commits:
                    continue
                for commit in commits:
                    author = commit["author"]["name"]
                    # コミット作成者がユーザ名と一致している時のみ判定
                    if author == self.user_name or author == self.display_name:
                        # コミットメッセージにmergeが含まれていたらマージコミットと判断してスキップ
                        if "merge" in commit["message"].lower():
                            continue
                        date_list.append(date + jst_offset)
                        break

        sorted_date_list = sorted(date_list, key=lambda x: x)
        sorted_date_list.insert(0, last_date)
        sorted_date_list.append(current_date)
        for first, second in zip(sorted_date_list[:-1], sorted_date_list[1:]):
            delta = abs(second - first)
            delta_days = delta.days
            if int(delta_days) < 5:
                continue
            else:
                log_info(str(delta_days) + "日間餌がなかったので恐竜は死にました")
                return False
        log_info("恐竜は生存中です")
        return True
