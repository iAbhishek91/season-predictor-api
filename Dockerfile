FROM node:boron-alpine

RUN mkdir -p /user/seasonService && \
npm i yarn -g

WORKDIR /user/seasonService

COPY package.json yarn.lock ./

RUN yarn

COPY . ./

RUN yarn build

ENTRYPOINT [ "node", "dist/server/" ]

# to execute 
#step-1: build the docker image: `docker build -t season-service .`
#step-2: [optional] verify the image file is created: `docker images`
#step-3: run the image to form the container: `docker run -i --rm --init -p 1212:1212 --name my-container1 season-service index.js`