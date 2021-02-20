FROM node:12.16.3-alpine3.9
MAINTAINER miaowing <me@zf.ink>

ENV VERSION 2.0.0
ENV MAILER_HOST smtp.mxhichina.com
ENV MAILER_PORT 465
ENV NODE_ENV production

WORKDIR /usr/src/app

ADD package.json ./package.json
ADD node_modules ./node_modules
ADD packages/keystone/.keystone ./packages/keystone/.keystone
ADD packages/keystone/.env ./packages/keystone/.keystone/.env
ADD packages/next/.next ./packages/next/.next
ADD packages/next/next.config.js ./packages/next/next.config.js

CMD ["npm","start"]

EXPOSE 3000
