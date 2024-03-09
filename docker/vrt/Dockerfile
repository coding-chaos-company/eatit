FROM mcr.microsoft.com/playwright:v1.42.1-focal

ENV LANG "ja_JP.UTF-8"
ENV APP_ROOT /vrt

WORKDIR $APP_ROOT

COPY ./.yarnrc.yml ./package.json ./yarn.lock $APP_ROOT

RUN apt-get update

# 日本語フォントを使えるようにする
RUN apt-get install -y --no-install-recommends fonts-noto-cjk \
 && apt-get remove -y --purge fonts-ipafont fonts-ipafont-gothic fonts-wqy-zenhei \
 && apt-get clean \
 && rm -rf /var/lib/apt/lists/* \
 && fc-cache -vf

RUN corepack enable && yarn install

COPY . $APP_ROOT
