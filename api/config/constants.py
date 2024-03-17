# URL
GIT_BASE_URL = "https://api.github.com/"


def GIT_REPOS_URL(user_name: str):
    return GIT_BASE_URL + "users/" + user_name + "/repos"


def GIT_COMMITS_URL(user_name: str, repo_name: str):
    return GIT_BASE_URL + "repos/" + user_name + "/" + repo_name + "/commits"


# スコア
CODE_BASE_SCORE = 60
LANGS_BASE_SCORE = 10
CHANGE_FILES_BASE_SCORE = 30

# 基準経験値
LEVEL1_EXP = 1000
LEVEL2_EXP = 1500
LEVEL3_EXP = 2000
