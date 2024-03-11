import datetime


def what_time():
    current_time_utc = datetime.datetime.utcnow()
    jst_offset = datetime.timedelta(hours=9)
    return current_time_utc + jst_offset
