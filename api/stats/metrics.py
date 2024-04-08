from typing import NamedTuple
import datetime
import sys

sys.path.append("../")

from client import GitClient
from config import constants
from utils import extract_extension, what_time, log_info


class Metrics(NamedTuple):
    commits_count: int
    level: int
    exp: int
    change_files: float
    code_score: float
    current_date: str


class FilesMetrics(NamedTuple):
    file_len: int
    lang_weight: int
    code_score: float
    date: datetime


class CurrentMetrics(NamedTuple):
    level: int
    exp: int
    code_score: float
    change_files: float
    commits_count: int
    last_date: str


class CurrentGrowth(NamedTuple):
    level: int
    exp: int


class DiffContents(NamedTuple):
    file_path: str
    after_content: str
    before_content: str


class MetricsManager:
    def __init__(self, user_name: str):
        self.user_name = user_name

    # メトリクスを算出
    def calc_metrics(self, current_met=None) -> Metrics:
        git_client = GitClient(self.user_name)
        current_date = what_time()

        # feedの処理
        if current_met:
            diffs = git_client.get_commits_diff(current_met.last_date)
            current_level = current_met.level
            current_exp = current_met.exp
            code_score = current_met.code_score * current_met.commits_count
            change_files = current_met.change_files * current_met.commits_count
            sorted_diffs = sorted(diffs, key=lambda x: x[0].date)
            log_info(sorted_diffs)
            log_info(current_met.last_date)

            for index, files in enumerate(sorted_diffs):
                f_met = self.__get_files_metrics(files)
                total_exp = self.__calc_total_exp(f_met, current_met)
                current_exp += total_exp

                code_score += f_met.code_score
                change_files += f_met.file_len

                growth = self.__calc_growth(current_level, current_exp)
                if growth:
                    current_level = growth.level
                    current_exp = growth.exp

                if index == len(diffs) - 1:
                    commits_count = current_met.commits_count + len(diffs)
                    code_score = code_score / commits_count
                    change_files = change_files / commits_count

                    return Metrics(
                        level=current_level,
                        exp=current_exp,
                        commits_count=commits_count,
                        code_score=code_score,
                        change_files=change_files,
                        current_date=f_met.date,
                    )
        # registerの処理
        else:
            files = git_client.get_latest_commit_diff()
            f_met = self.__get_files_metrics(files)
            lang_exp = self.__calc_lang_exp(f_met.lang_weight)
            total_exp = (
                constants.CHANGE_FILES_BASE_SCORE + constants.CODE_BASE_SCORE + lang_exp
            )

            return Metrics(
                commits_count=1,
                level=1,
                exp=total_exp,
                change_files=f_met.file_len,
                code_score=f_met.code_score,
                current_date=current_date,
            )

    # レベルが上がったどうかを判定
    def __calc_growth(self, level: int, exp: int) -> CurrentGrowth | None:
        if exp >= constants.EXP(level):
            return CurrentGrowth(level=level + 1, exp=constants.EXP(level) - exp)
        return None

    # トータル経験値を算出
    def __calc_total_exp(self, f_met: FilesMetrics, current_met: CurrentMetrics) -> int:
        code_exp = self.__calc_code_exp(f_met.code_score, current_met.code_score)
        lang_exp = self.__calc_lang_exp(f_met.lang_weight)
        file_exp = self.__calc_file_exp(f_met.file_len, current_met.change_files)
        return code_exp + lang_exp + file_exp

    # コード経験値を算出
    def __calc_code_exp(self, current_score: float, user_score: float) -> int:
        rate = 1
        if current_score > 0:
            rate = current_score / user_score
        return round(constants.CODE_BASE_SCORE * rate)

    # 言語経験値を算出
    def __calc_lang_exp(self, weight: int) -> int:
        return round(constants.LANGS_BASE_SCORE * weight)

    # ファイル数経験値を算出
    def __calc_file_exp(self, current_files: int, user_files: int) -> int:
        rate = current_files / user_files
        return round(constants.CHANGE_FILES_BASE_SCORE * rate)

    # 1コミット分のメトリクスを取得
    def __get_files_metrics(self, files: list) -> FilesMetrics:
        file_len = len(files)
        lang_weight = 0
        additions = 0
        delections = 0
        max_score = 0
        for file in files:
            weight = 0
            file_name = file.file_name
            extension = extract_extension(file_name)
            if extension in constants.EXTENSIONS:
                weight = constants.EXTENSIONS[extension]
                if lang_weight < constants.EXTENSIONS[extension]:
                    lang_weight = constants.EXTENSIONS[extension]

            additions += file.additions * weight
            delections += file.delections * weight
            if (
                max_score
                < delections * constants.DEL_WEIGHT + additions * constants.ADD_WEIGHT
            ) and weight > 0:
                max_score = (
                    delections * constants.DEL_WEIGHT + additions * constants.ADD_WEIGHT
                )
        code_score = (delections * constants.DEL_WEIGHT) / len(files) + (
            additions * constants.ADD_WEIGHT
        ) / len(files)

        if len(files) > 0:
            date = files[0].date

        return FilesMetrics(file_len, lang_weight, code_score, date)
