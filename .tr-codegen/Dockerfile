FROM node:20-alpine AS builder
WORKDIR /app

# Install deps
COPY package*.json ./
RUN npm install

# Build
COPY . .
RUN npm run build

# --- runtime stage ---
FROM nginx:alpine

RUN apk update && apk add --no-cache git

# Verify git is installed
RUN git --version

# minimal nginx config
COPY ./.tr-codegen/nginx.conf /etc/nginx/conf.d/default.conf
# copy built static files
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /app/build/ /usr/share/nginx/html/