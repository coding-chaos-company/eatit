FROM openjdk:17-jdk-slim-bullseye as builder

RUN apt-get update -y
RUN apt-get install -y unzip git wget

ENV LANG C.UTF-8

# https://github.com/GumTreeDiff/gumtree/wiki/Getting-Started
RUN git clone https://github.com/GumTreeDiff/gumtree.git /opt/gumtree \
  && git -C /opt/gumtree reset --hard f013c70750d5d7a11de0b14935c4e0fd0a37a906 \
  && /opt/gumtree/gradlew -p /opt/gumtree build \
  && unzip -d /opt/gumtree/dist/build/distributions /opt/gumtree/dist/build/distributions/gumtree-3.1.0-SNAPSHOT.zip

RUN git clone https://github.com/GumTreeDiff/tree-sitter-parser.git /opt/tree-sitter-parser \
  && cd /opt/tree-sitter-parser \
  && git config --file .gitmodules --remove-section submodule.tree-sitter-ruby \
  && git rm --cached .gitmodules \
  && rm -rf tree-sitter-ruby \
  && git submodule sync \
  && git rm -r --cached --ignore-unmatch tree-sitter-ruby \
  && git submodule update --init --depth=1 \
  && wget https://github.com/tree-sitter/tree-sitter-ruby/archive/30f9807df1f5015be5fade0b0e54948d2c5f8310.zip \
  && unzip 30f9807df1f5015be5fade0b0e54948d2c5f8310.zip \
  && mv tree-sitter-ruby-30f9807df1f5015be5fade0b0e54948d2c5f8310 tree-sitter-ruby \
  && rm -rf 30f9807df1f5015be5fade0b0e54948d2c5f8310.zip

FROM python:3.11.8-slim

RUN apt-get update -y
RUN apt-get install -y make git ocaml npm libnum-ocaml-dev
RUN apt-get install -y nodejs gcc openjdk-17-jre-headless

# GumTree環境構築
COPY --from=builder /opt/gumtree/dist/build/distributions/gumtree-3.1.0-SNAPSHOT /opt/gumtree/dist
COPY --from=builder /opt/tree-sitter-parser /opt/tree-sitter-parser

RUN ln -s /opt/gumtree/dist/bin/gumtree /usr/bin/gumtree

RUN git clone --depth=1 https://github.com/GumTreeDiff/cgum.git /opt/cgum \
  && make -C /opt/cgum \
  && ln -s /opt/cgum/cgum /usr/bin/cgum

RUN git clone --depth=1 https://github.com/GumTreeDiff/pythonparser.git /opt/pythonparser  \
  && ln -s /opt/pythonparser/pythonparser /usr/bin/pythonparser

RUN git clone --depth=1 https://github.com/GumTreeDiff/jsparser.git /opt/jsparser \
  && ln -s /opt/jsparser/jsparser /usr/bin/jsparser \
  && npm --prefix /opt/jsparser/ install /opt/jsparser/ \
  && ln -s /opt/tree-sitter-parser/tree-sitter-parser.py /usr/bin/tree-sitter-parser.py

WORKDIR /works
COPY requirements.txt .

RUN pip install -U pip \
    && pip install --no-cache-dir --upgrade -r requirements.txt \
    && pip install parso tree_sitter pyyaml
