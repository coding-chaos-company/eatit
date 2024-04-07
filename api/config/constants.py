import json
import os
from dotenv import load_dotenv

load_dotenv()

# URL
GIT_BASE_URL = "https://api.github.com/"

def GIT_USER_URL(user_name: str):
    return GIT_BASE_URL + "users/" + user_name

def GIT_REPOS_URL(user_name: str):
    return GIT_BASE_URL + "users/" + user_name + "/repos"

def GIT_EVENTS_URL(user_name: str):
    return GIT_BASE_URL + "users/" + user_name + "/events"

def GIT_COMMITS_URL(user_name: str, repo_name: str):
    return GIT_BASE_URL + "repos/" + user_name + "/" + repo_name + "/commits"


# ファイル
__json_extensions_data = open("config/extensions.json", "r", encoding="utf-8-sig")
EXTENSIONS = json.load(__json_extensions_data)


# 基準スコア
CODE_BASE_SCORE = 60
LANGS_BASE_SCORE = 10
CHANGE_FILES_BASE_SCORE = 30

# 基準経験値
EXP_DICT = {1: 3000, 2: 4500, 3: 6000}


def EXP(level: int):
    return EXP_DICT[level]


# 重み
DEL_WEIGHT = 0.2
ADD_WEIGHT = 1.2

# Githubアクセストークン
ACCESS_TOKEN = os.environ["ACCESS_TOKEN"]
