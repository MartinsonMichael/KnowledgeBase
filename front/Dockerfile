# stage 1: Build react
FROM node:10-alpine as builder

WORKDIR /front
COPY package.json package-lock.json ./
RUN npm install
COPY src/ ./src/
COPY public/ ./public/
RUN npm run build

# stage 2: add nginx
FROM nginx:alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf

## Remove default nginx index page
RUN rm -rf /usr/share/nginx/html/*

# Copy from the stahg 1
COPY --from=builder /front/build /usr/share/nginx/html

EXPOSE 3000 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]
