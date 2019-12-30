FROM node:10.18.0-alpine

ADD . /opt/frontend
WORKDIR /opt/frontend

RUN npm install

EXPOSE 3000

CMD [ "npm", "run", "dev" ]
