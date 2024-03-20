import datetime
import os


def what_time():
    current_time_utc = datetime.datetime.utcnow()
    jst_offset = datetime.timedelta(hours=9)
    return current_time_utc + jst_offset


def extract_extension(file_name: str) -> str:
    file_extension = os.path.splitext(file_name)[1][1:]
    return file_extension
