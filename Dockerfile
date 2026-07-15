# syntax=docker/dockerfile:1

#
# 1. deps — install dependencies only, cached separately from source changes
#
FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
COPY patches ./patches
RUN npm ci

#
# 2. builder — build the Next.js standalone output
#
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# NEXT_PUBLIC_* vars are inlined into the client bundle at build time, so they
# must be supplied as build args (docker build --build-arg ...), not just at
# `docker run`. Server-only secrets (CLERK_SECRET_KEY, STREAM_SECRET_KEY, etc.)
# are read at runtime and must NOT be passed here — set them via `docker run -e`
# or an env file instead.
ARG NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
ARG NEXT_PUBLIC_CONVEX_URL
ARG NEXT_PUBLIC_STREAM_API_KEY
ENV NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=$NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
ENV NEXT_PUBLIC_CONVEX_URL=$NEXT_PUBLIC_CONVEX_URL
ENV NEXT_PUBLIC_STREAM_API_KEY=$NEXT_PUBLIC_STREAM_API_KEY
ENV NEXT_TELEMETRY_DISABLED=1

RUN npm run build

#
# 3. runner — distroless, only the standalone server + static assets
#
FROM gcr.io/distroless/nodejs20-debian12 AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# Next.js standalone output already traces and copies only the node_modules
# files actually needed to run the server.
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

USER nonroot
EXPOSE 3000
CMD ["server.js"]
