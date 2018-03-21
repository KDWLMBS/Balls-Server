FROM node:8-alpine
RUN mkdir /app
COPY . /app
RUN cd /app \
 && yarn
EXPOSE 8080
CMD ["node", "/app"]
