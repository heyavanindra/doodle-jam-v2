# ⚙️ Doodle Jam Background Worker (`worker`)

Dedicated background worker daemon for the Doodle Jam monorepo. Backed by [BullMQ](https://bullmq.io/) and [Redis](https://redis.io/) to handle asynchronous, retriable background tasks (e.g. welcome email dispatch, notifications, and queued background workflows).

---

## 🚀 Getting Started

### Prerequisites

Ensure Redis is running locally:

```bash
docker run -d --name doodle-jam-redis -p 6379:6379 redis:7-alpine
```

### Environment Configuration

Copy `.env.example` to `.env.development`:

```bash
cp .env.example .env.development
```

Available environment variables:

- `NODE_ENV`: Application environment (`development` | `production` | `test`)
- `LOG_LEVEL`: Log verbosity (defaults to `debug`)
- `REDIS_HOST`: Redis host (defaults to `127.0.0.1`)
- `REDIS_PORT`: Redis port (defaults to `6379`)
- `REDIS_PASSWORD`: Optional Redis password
- `REDIS_URL`: Optional full Redis connection string

---

## 💻 Development & Build Scripts

From the repository root:

```bash
# Run worker in development mode with live-reload
pnpm --filter worker dev

# Typecheck worker
pnpm --filter worker check-types

# Build worker with esbuild
pnpm --filter worker build

# Run production build
pnpm --filter worker start
```

---

## 📁 Architecture & Flow

- **Queue Consumer**: Listens for jobs enqueued by `apps/api` (e.g. `email-queue`).
- **Graceful Shutdown**: Intercepts `SIGINT` and `SIGTERM` to allow in-flight BullMQ jobs to finish cleanly before disconnecting from Redis.
- **Shared Infrastructure**:
  - `@repo/redis`: Shared Redis connection setup.
  - `@repo/logger`: Structured JSON logging in production, colorized pretty logging in development.
