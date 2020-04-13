FROM node:lts

WORKDIR /usr/src/smart-brain-backend

COPY ./package.json yarn.lock ./

RUN yarn

COPY . .

CMD ["/bin/bash"]