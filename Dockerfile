FROM node:18-alpine3.16 AS deps
WORKDIR /app

RUN apk add --no-cache --virtual make 

COPY package.json yarn.lock* ./
RUN \
	if [ -f yarn.lock ]; then yarn --frozen-lockfile --network-timeout 1000000000; \
	elif [ -f package.json ]; then npm install; \
	else echo "Lockfile not found." && exit 1; \
	fi

# Now we make a container to handle our Build
FROM node:18-alpine3.16 AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
COPY .env ./.env

RUN yarn build

FROM node:18-alpine3.16 AS runner
WORKDIR /app

ENV NODE_ENV production

COPY --from=builder /app/. ./
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/next.config.js ./next.config.js
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.env ./.env

ENV HOST=0.0.0.0 PORT=3000 NODE_ENV=production

CMD ["yarn", "start"]
