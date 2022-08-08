FROM node:16.15.0-slim AS core
RUN mkdir /app
RUN chown -R node:node /app
USER node
WORKDIR /app
COPY --chown=node:node package*.json ./
COPY --chown=node:node src /app/src
ENV NODE_ENV production
RUN npm ci --production

FROM gcr.io/distroless/nodejs:16
COPY --from=core /app /app
USER 1000
WORKDIR /app
CMD ["src/index.js"]
