FROM python:3.11.8-slim

WORKDIR /works
COPY requirements.txt .

RUN pip install -U pip \
    && pip install --no-cache-dir --upgrade -r requirements.txt