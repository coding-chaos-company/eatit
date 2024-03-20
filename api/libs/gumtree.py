import subprocess
from typing import NamedTuple
from utils import extract_extension
import json
import os
from libs import metrics


class DiffContents(NamedTuple):
    file_path: str
    after_content: str
    before_content: str


def exec_gumtree(contents: DiffContents) -> float:
    extension = extract_extension(contents.file_path)
    with open(f"libs/temp/before.{extension}", "w", encoding="utf-8") as file:
        file.write(contents.before_content)
    with open(f"libs/temp/after.{extension}", "w", encoding="utf-8") as file:
        file.write(contents.after_content)

    command = f"gumtree textdiff -f JSON ./libs/temp/before.{extension} ./libs/temp/after.{extension} > ./libs/temp/result.json"
    result = subprocess.run(command, capture_output=True, shell=True)

    json_data = open("libs/temp/result.json", "r", encoding="utf-8-sig")
    if json_data:
        result = json.load(json_data)

        weight = metrics.get_gumtree_weight(result)

        os.remove(f"libs/temp/before.{extension}")
        os.remove(f"libs/temp/after.{extension}")
        os.remove("libs/temp/result.json")

        return weight
    return 1.0
