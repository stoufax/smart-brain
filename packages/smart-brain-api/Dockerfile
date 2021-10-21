FROM node:lts

WORKDIR /usr/src/smart-brain-api

COPY ./package.json yarn.lock ./

RUN yarn

COPY . .

CMD ["/bin/bash"]