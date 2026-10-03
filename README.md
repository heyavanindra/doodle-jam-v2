# 🚀 Doodle Jam

A modern, production-grade, fullstack TypeScript monorepo built with **Turborepo**, **pnpm Workspaces**, **Next.js**, **Express 5**, **Better Auth**, **Drizzle ORM**, **PostgreSQL**, **BullMQ**, and **Redis**.

---

## 🏗️ Architecture & Workspaces

Doodle Jam is organized as an enterprise-ready monorepo with strict separation of concerns, explicit configuration injection, and type-safe shared packages:

```text
doodle-jam/
├── apps/
│   ├── api/                  # Express 5 backend API (Node.js ESM, Layered Architecture)
│   ├── worker/               # Dedicated BullMQ background job worker daemon
│   ├── web/                  # Next.js 16 frontend application (React 19, App Router)
│   └── docs/                 # Next.js documentation portal
│
├── packages/
│   ├── auth/                 # @repo/auth - Centralized Better Auth with Drizzle adapter
│   ├── db/                   # @repo/db - PostgreSQL client factory, Drizzle schemas & migrations
│   ├── redis/                # @repo/redis - Redis client factory & connection defaults
│   ├── jobs/                 # @repo/jobs - BullMQ queue factories & background job definitions
│   ├── logger/               # @repo/logger - Shared Pino structured logger factory
│   ├── validator/            # @repo/validator - Shared Zod validation schemas & types
│   ├── ui/                   # @repo/ui - Shared React component library
│   ├── eslint-config/        # @repo/eslint-config - Shared ESLint rules
│   └── typescript-config/    # @repo/typescript-config - Base tsconfig presets
│
├── turbo.json                # Turborepo task pipeline configuration
├── pnpm-workspace.yaml       # pnpm workspace definition
└── package.json              # Monorepo root scripts and devDependencies
```

---

## 🛠️ Tech Stack

### Core Monorepo

- **Orchestration**: [Turborepo v2](https://turborepo.dev/)
- **Package Manager**: [pnpm](https://pnpm.io/) (v11+)
- **Runtime**: [Node.js](https://nodejs.org/) (>= 24) & [TypeScript](https://www.typescriptlang.org/) (ESM)

### Backend (`apps/api` & `apps/worker`)

- **Web Framework**: [Express 5](https://expressjs.com/) with ESM
- **Layered Architecture**: Controller ➔ Service ➔ Repository pattern
- **Authentication**: [Better Auth](https://www.better-auth.com/) via `@repo/auth`
- **Database & ORM**: PostgreSQL & [Drizzle ORM](https://orm.drizzle.team/) via `@repo/db`
- **Background Jobs**: [BullMQ](https://docs.bullmq.io/) via `@repo/jobs` consumed by `apps/worker`
- **Cache & Redis**: [ioredis](https://github.com/redis/ioredis) via `@repo/redis`
- **Object Storage**: AWS S3 SDK v3 (Direct presigned URL uploads)
- **Validation**: [Zod](https://zod.dev/) via `@repo/validator`
- **Observability**: [Pino](https://getpino.io/) via `@repo/logger` & `pino-http` request tracing
- **Security**: [Helmet](https://helmetjs.github.io/), [CORS](https://github.com/expressjs/cors), [express-rate-limit](https://express-rate-limit.mintlify.app/)
- **Bundler & Tooling**: [esbuild](https://esbuild.github.io/), [tsx](https://github.com/privatenumber/tsx)

### Frontend (`apps/web`)

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router, Server Components)
- **UI Library**: React 19 & `@repo/ui`
- **Styling**: Modern CSS / Tailwind-ready components

### Shared Packages (`packages/*`)

- **`@repo/db`**: Database layer exporting the `createDb({ databaseUrl })` factory, Drizzle schemas (`authSchema`, `todos`), and database migration/studio tooling.
- **`@repo/auth`**: Authentication factory exporting `createAuth({ db })` with Better Auth and the Drizzle PostgreSQL adapter, plus Node HTTP adapters (`toNodeHandler`, `fromNodeHeaders`).
- **`@repo/redis`**: Shared Redis client factory `createRedisClient(redisConfig)` with sensible defaults (e.g. `maxRetriesPerRequest: null`, exponential backoff `retryStrategy`).
- **`@repo/jobs`**: BullMQ queue factory `createEmailQueue(redisConfig)` and shared background job contracts.
- **`@repo/logger`**: Structured logger factory `createLogger(nodeEnv, options)` supporting colorized output in development and high-throughput JSON in production.
- **`@repo/validator`**: Centralized Zod validation schemas and inferred TypeScript types shared across API routes, controllers, and frontend forms.
- **`@repo/ui`**: Shared, composable React UI components.
- **`@repo/typescript-config`**: Shared TypeScript presets (`base.json`, `nextjs.json`, `react-library.json`).
- **`@repo/eslint-config`**: Standardized ESLint rules across all workspaces.

---

## 🏛️ Design Principle: Factory Pattern & No Ambient Env

Packages in `packages/*` **do not read `process.env` globally** and do not export ready-made singletons. Instead, they export pure factory functions:

1. **One Source of Truth**: Each application (`apps/api`, `apps/worker`) validates its own environment variables using Zod schemas at boot time.
2. **Explicit Dependency Injection**: Dependencies are passed down explicitly into factories (`createDb({ databaseUrl })`, `createAuth({ db })`, `createRedisClient(redisConfig)`).
3. **Testability & Isolation**: Allows spinning up isolated test databases, mocking Redis connections, or running multiple worker queues without mutating global environment variables.

---

## 🚦 Getting Started

### 1. Prerequisites

- [Node.js](https://nodejs.org/) `>= 24.0.0`
- [pnpm](https://pnpm.io/) `>= 11.0.0` (`npm install -g pnpm`)
- Running [PostgreSQL](https://www.postgresql.org/) and [Redis](https://redis.io/) instances (or Docker)

### 2. Installation

Clone the repository and install all workspace dependencies:

```bash
git clone <your-repo-url> doodle-jam
cd doodle-jam
pnpm install
```

### 3. Environment Setup

Configure your environment variables for the workspaces:

#### Database (`packages/db/.env.development`):

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/doodle_jam_dev"
```

#### API (`apps/api/.env.development`):

```env
PORT=4000
NODE_ENV=development
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/doodle_jam_dev"
BETTER_AUTH_SECRET="your-better-auth-secret-min-32-chars"
BETTER_AUTH_URL="http://localhost:4000"
REDIS_HOST="localhost"
REDIS_PORT=6379
AWS_REGION="us-east-1"
AWS_ACCESS_KEY_ID="your-access-key"
AWS_SECRET_ACCESS_KEY="your-secret-key"
AWS_BUCKET_NAME="your-s3-bucket"
```

#### Worker (`apps/worker/.env.development`):

```env
NODE_ENV=development
LOG_LEVEL=debug
REDIS_HOST="localhost"
REDIS_PORT=6379
REDIS_PASSWORD=""
```

### 4. Push Database Schema

Push the Drizzle schemas (including Better Auth tables and Todos) to your database:

```bash
pnpm --filter @repo/db db:push
```

### 5. Run Development Servers

Start all applications and services in parallel:

```bash
pnpm dev
```

This will concurrently run:

- **`apps/api`**: `http://localhost:4000` (Express API server)
- **`apps/worker`**: BullMQ background job worker
- **`apps/web`**: `http://localhost:3000` (Next.js web app)
- **`apps/docs`**: `http://localhost:3001` (Next.js documentation portal)

---

## 💻 Common Commands

### Development & Build

| Command            | Description                                  |
| :----------------- | :------------------------------------------- |
| `pnpm dev`         | Start development servers across all apps    |
| `pnpm build`       | Build all apps and packages for production   |
| `pnpm check-types` | Run type checking across the entire monorepo |
| `pnpm lint`        | Lint all workspaces with ESLint              |
| `pnpm format`      | Format code using Prettier                   |

### Workspace Filtering

Turborepo and pnpm allow running commands on specific workspaces:

```bash
# Run only the API dev server
pnpm --filter api dev

# Run only the background worker
pnpm --filter worker dev

# Run type check only on auth and db packages
pnpm --filter @repo/auth --filter @repo/db check-types

# Build only the web application
pnpm --filter web build
```

### Database Management (`@repo/db`)

| Command                              | Description                                              |
| :----------------------------------- | :------------------------------------------------------- |
| `pnpm --filter @repo/db db:push`     | Push schema changes directly to PostgreSQL (development) |
| `pnpm --filter @repo/db db:generate` | Generate SQL migration files from schema                 |
| `pnpm --filter @repo/db db:migrate`  | Execute pending SQL migrations                           |
| `pnpm --filter @repo/db db:studio`   | Open interactive Drizzle Studio interface                |

---

## 🔒 Authentication (`@repo/auth`)

Better Auth is configured in `@repo/auth` using the Drizzle PostgreSQL adapter.

To consume authentication in an app (e.g. `apps/api`):

```typescript
// 1. Initialize Auth in your app (e.g. apps/api/src/lib/auth.ts)
import { createAuth } from '@repo/auth';
import { db } from './db.js';

export const auth = createAuth({ db });

export type Auth = typeof auth;
export type Session = typeof auth.$Infer.Session.session;
export type User = typeof auth.$Infer.Session.user;

// 2. Mount Better Auth route handler (Express app.ts)
import { toNodeHandler } from '@repo/auth';
import { auth } from './lib/auth.js';

app.all('/api/auth/*splat', toNodeHandler(auth));

// 3. Verify session in Express middleware
import { fromNodeHeaders } from '@repo/auth';
import { auth } from '../lib/auth.js';

export const requireAuth = async (req: Request, _res: Response, next: NextFunction) => {
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers),
  });
  // attach req.user, req.session...
  next();
};
```

---

## 📜 License

This project is licensed under the [ISC License](LICENSE).
