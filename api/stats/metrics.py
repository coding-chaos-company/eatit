from typing import NamedTuple
import sys

sys.path.append("../")

from client import GitClient
from config import constants


class Metrics(NamedTuple):
    commit_len: int
    file_exp: int
    change_files: int
    code_exp: int
    code_score: int
    lang_exp: int



class MetricsManager:
    def __init__(self, user_name: str):
        self.user_name = user_name

    def calculate_metrics(self, is_first=False):
        git_client = GitClient(self.user_name)
        if is_first:
            diffs = git_client.get_latest_commit_diff()
            file_len = len(diffs)

        else:
            # TODO:日付を引数で取得
            diffs = git_client.get_commits_diff("last_date", "current_date")
