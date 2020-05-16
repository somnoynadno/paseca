FROM node:carbon
WORKDIR /app

COPY . .
RUN npm install

RUN npm run build
RUN npm -g install serve

CMD ["serve", "-s", "build", "-p", "4000"]
EXPOSE 4000
