FROM node:22.2-alpine
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
RUN npm run build

FROM node:22.2-alpine
WORKDIR /app
COPY --from=build /app/build
