FROM node:22.1-alpine as build
WORKDIR /app
RUN apk add --no-cache python3 
COPY package*.json /app
RUN npm install 
COPY . /app
RUN npm run build

FROM node:22.1-alpine
WORKDIR /app
COPY --from=build /app/build /app/build
COPY package*.json /app
RUN npm install --only=production
ENV PORT=3000
EXPOSE 3000
CMD ["node", "build/index.js"]
