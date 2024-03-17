import json

# URL
GIT_BASE_URL = "https://api.github.com/"


def GIT_REPOS_URL(user_name: str):
    return GIT_BASE_URL + "users/" + user_name + "/repos"


def GIT_COMMITS_URL(user_name: str, repo_name: str):
    return GIT_BASE_URL + "repos/" + user_name + "/" + repo_name + "/commits"


# ファイル
__json_data = open("extensions.json")
EXTENSIONS = json.load(__json_data)

# スコア
CODE_BASE_SCORE = 60
LANGS_BASE_SCORE = 10
CHANGE_FILES_BASE_SCORE = 30

# 基準経験値
EXP_DICT = {1: 3000, 2: 4500, 3: 6000}


def EXP(level: int):
    return EXP_DICT[level]


# 重み
DEL_WEIGHT = 0.5
ADD_WEIGHT = 1.5
