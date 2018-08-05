FROM node:6.14.3
# FROM node:6.11-alpine

# ENV NODE_ENV production

# Setup application code
RUN npm i -g npm
RUN mkdir /code
COPY . /code
WORKDIR /code
RUN npm i && NODE_ENV=production npm run build
RUN rm -rf node_modules && npm i --prod

EXPOSE 8080

CMD yarn seed && yarn start
