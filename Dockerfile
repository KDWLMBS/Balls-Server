FROM node:8-alpine
RUN mkdir /app
COPY . /app
RUN cd /app \
 && npm i --loglevel=warn
CMD ["node", "/app"]
