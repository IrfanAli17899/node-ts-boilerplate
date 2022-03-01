FROM node:14.17.3-alpine
WORKDIR /app
COPY . .

RUN npm install --production
RUN npm install --global ts-node@10.1.0
RUN apk update && \
    apk add --no-cache \
    openssh-keygen curl

ENTRYPOINT ["/bin/sh"]
CMD ["./script/run.sh"]