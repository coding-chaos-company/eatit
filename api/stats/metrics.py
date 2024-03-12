import sys
sys.path.append('../')

from client import get_latest_commit_diff, get_commits_diff

class MetricsManager:
  def __init__(self, user_name: str):
    self.user_name = user_name

  def calculate_metrics(self, is_first=False):
    if(is_first):
      diffs = get_latest_commit_diff(self.user_name)
    else:
      diffs = get_commits_diff(self.user_name)
