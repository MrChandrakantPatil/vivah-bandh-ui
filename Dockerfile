FROM public.ecr.aws/docker/library/node:22-alpine AS build

WORKDIR /app
COPY package*.json ./
RUN npm ci

ARG VITE_API_BASE_URL=http://vivahbandh.shomexa.com:3000
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL

COPY . .
RUN npm run build

FROM public.ecr.aws/docker/library/node:22-alpine AS runtime

ENV NODE_ENV=production
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY --from=build --chown=node:node /app/dist ./dist

USER node
EXPOSE 5000

CMD ["./node_modules/.bin/serve", "--single", "--listen", "5000", "dist"]