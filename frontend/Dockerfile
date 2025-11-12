# Сборочный этап
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Продуктивный этап
FROM node:18-alpine AS production
WORKDIR /app
COPY --from=builder /app ./
RUN npm ci
EXPOSE 12000
CMD ["npm", "start"]
