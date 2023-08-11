FROM node:20.5
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npx @nestjs/cli build
EXPOSE 3000
CMD ["/bin/sh", "start.sh"]
