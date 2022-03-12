##################
# Server BUILDER #
##################

FROM node:14-alpine as builder
ENV NODE_ENV=build
WORKDIR /usr/src/app
COPY package.json ./
RUN yarn install
COPY . .
# RUN yarn build
# RUN npm audit fix

##############
# UI BUILDER #
##############

FROM node:14 as ui-builder
ENV NODE_ENV=build
WORKDIR /usr/src/app
COPY ./client/package.json /usr/src/app
RUN yarn install
COPY client/ /usr/src/app
RUN yarn build
# RUN ls /usr/src/app/build/

#########
# FINAL #
#########

FROM node:14-alpine

ENV APP_HOME=/home/app
ENV APP_SERVER=/home/app
ENV APP_WEB=/home/app/client/build
ENV DATA_DIR=/data

RUN mkdir $DATA_DIR

WORKDIR $APP_HOME
COPY --from=builder /usr/src/app $APP_SERVER
COPY --from=ui-builder /usr/src/app/build $APP_WEB

EXPOSE 3001

# create the app user
RUN addgroup -S app \
  && adduser -S app -G app

# chown all the files to the app user
RUN chown -R app:app $APP_HOME \
  && chown -R app:app $DATA_DIR

# change to the app user
USER app

WORKDIR $APP_SERVER
CMD [ "npm", "run", "start" ]