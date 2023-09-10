import logging
from logging.handlers import TimedRotatingFileHandler


def setup_logger(log_file_name):
    """Initialize a logger that writes to log_file_name."""
    logger_instance = logging.getLogger(__name__)
    logger_instance.setLevel(logging.DEBUG)

    handler = TimedRotatingFileHandler(
        filename=log_file_name, when="D", interval=1, backupCount=14
    )
    handler.setLevel(logging.DEBUG)

    console_handler = logging.StreamHandler()
    console_handler.setLevel(logging.DEBUG)

    formatter = logging.Formatter(
        '%(asctime)s - %(name)s - %(levelname)s - %(message)s'
    )
    handler.setFormatter(formatter)
    console_handler.setFormatter(formatter)

    logger_instance.addHandler(handler)
    logger_instance.addHandler(console_handler)

    return logger_instance


logger = setup_logger("starchasers.log")
