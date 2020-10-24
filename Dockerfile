FROM node:12.16.3-alpine3.9
MAINTAINER miaowing <me@zf.ink>

ENV VERSION 2.0.0
ENV MAILER_HOST smtp.mxhichina.com
ENV MAILER_PORT 465
ENV NODE_ENV production

WORKDIR /usr/src/app

ADD dist ./dist
ADD scripts ./scripts
ADD package.json ./package.json
ADD node_modules ./node_modules
ADD packages/keystone/.keystone ./packages/keystone/.keystone
ADD packages/keystone/.keystone/config.example.js ./packages/keystone/.keystone/config.js
ADD packages/keystone/.keystone/config.example.js ./config.js
ADD packages/next/.next ./packages/next/.next
ADD packages/next/next.config.js ./packages/next/next.config.js

RUN "ls"

CMD ["npm","start"]

EXPOSE 3000
