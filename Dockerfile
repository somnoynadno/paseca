# Stage 1 - the build process
FROM node:carbon-alpine as builder

WORKDIR /app
COPY package.json yarn.lock ./

RUN npm install --production

COPY . ./
RUN npm run build

# Stage 2 - release
FROM node:8.9-alpine AS release

WORKDIR /app
COPY --from=builder /app/build ./build

RUN npm -g install serve

CMD ["serve", "-s", "build", "-p", "4000"]
EXPOSE 4000
