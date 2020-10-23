FROM node:12.16
MAINTAINER miaowing <me@zf.ink>

ENV VERSION 2.0.0
ENV MAILER_HOST smtp.mxhichina.com
ENV MAILER_PORT 465
ENV NODE_ENV production

WORKDIR /usr/src/app

ADD . ./
ADD config.example.js ./config.js

CMD ["npm","start"]

EXPOSE 3000
