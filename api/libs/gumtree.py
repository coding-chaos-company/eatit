import subprocess
from typing import NamedTuple
from utils import extract_extension
import json
import os

class DiffContents(NamedTuple):
  file_path: str
  after_content: str
  before_content: str

def exec_gumtree(contents: DiffContents) -> float:
  extension = extract_extension(contents.file_path)
  with open(f"temp/before.{extension}", "w", encoding="utf-8") as file:
      file.write(contents.before_content)
  with open(f"temp/after.{extension}", "w", encoding="utf-8") as file:
      file.write(contents.after_content)

  subprocess.run(["gumtree", "textdiff", "-f", "JSON", "-o", "temp/result.json" , f"brefore.{extension}", f"after.{extension}"], capture_output=True)

  json_data = open("temp/result.json", "r", encoding="utf-8-sig")
  result = json.load(json_data)

  weight = result # 関数に渡してメトリクス計測

  os.remove(f"temp/before.{extension}")
  os.remove(f"temp/after.{extension}")
  os.remove("temp/result.json")

  return weight
