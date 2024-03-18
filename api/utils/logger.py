import logging

logger = logging.getLogger(__name__)
formatter = logging.Formatter('%(levelname)s:     %(message)s')
handler = logging.StreamHandler()
handler.setFormatter(formatter)
logger.addHandler(handler)

def log_info(msg: str):
  logger.setLevel(logging.INFO)
  handler.setLevel(logging.INFO)

  logger.info(msg)

def log_debug(msg: str):
  logger.setLevel(logging.DEBUG)
  handler.setLevel(logging.DEBUG)

  logger.debug(msg)

def log_error(msg: str):
  logger.setLevel(logging.ERROR)
  handler.setLevel(logging.ERROR)

  logger.error(msg)
