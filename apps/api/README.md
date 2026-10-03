# Node.js TypeScript Boilerplate

A robust, enterprise-grade, production-ready backend boilerplate built with **Node.js (ESM)**, **TypeScript**, **Express 5**, **Drizzle ORM**, and **PostgreSQL**. Designed with clean layered architecture (Controller-Service-Repository), **Better Auth** authentication, **BullMQ** background job queues, **AWS S3** presigned file uploads, rate limiting, centralized error handling, and comprehensive code quality tooling.

---

## 🛠️ Tech Stack

- **Runtime & Language**: [Node.js](https://nodejs.org/) (ES Modules, v20+) & [TypeScript](https://www.typescriptlang.org/)
- **Web Framework**: [Express 5](https://expressjs.com/)
- **Database & ORM**: [PostgreSQL 16](https://www.postgresql.org/) & [Drizzle ORM](https://orm.drizzle.team/) with [pg](https://node-postgres.com/)
- **Authentication**: [Better Auth](https://www.better-auth.com/) with Drizzle PostgreSQL adapter
- **Background Jobs & Queues**: [BullMQ](https://docs.bullmq.io/) & [ioredis](https://github.com/redis/ioredis)
- **Cloud Storage**: [AWS SDK for JavaScript v3](https://aws.amazon.com/sdk-for-javascript/) (`@aws-sdk/client-s3`, `@aws-sdk/s3-request-presigner`)
- **Validation**: [Zod](https://zod.dev/) (request schemas & environment variables)
- **Security & Middlewares**: [Helmet](https://helmetjs.github.io/), [CORS](https://github.com/expressjs/cors), [express-rate-limit](https://express-rate-limit.mintlify.app/)
- **Logging & Tracing**: [Pino](https://getpino.io/), `pino-http`, and `pino-pretty` with request tracing
- **Environment Management**: [@dotenvx/dotenvx](https://dotenvx.com/)
- **Code Quality**: [ESLint](https://eslint.org/), [Prettier](https://prettier.io/), [Husky](https://typicode.github.io/husky/) pre-commit hooks
- **Tooling & Bundling**: [tsx](https://github.com/privatenumber/tsx), [esbuild](https://esbuild.github.io/), [Docker](https://www.docker.com/) (multi-stage alpine build)
- **Package Manager**: [pnpm](https://pnpm.io/)

---

## ✨ Key Features

- **Layered Architecture**: Strict separation of concerns (`Routes` ➔ `Middlewares` ➔ `Controllers` ➔ `Services` ➔ `Repositories` ➔ `Database`).
- **Complete Authentication**: Better Auth integration with Drizzle adapter, handling user accounts, sessions, and verification, with an Express auth middleware (`requireAuth`) injecting `req.user` and `req.session`.
- **Background Job Queue**: Dedicated BullMQ email queue backed by Redis with automated retries and exponential backoff, consumed by the standalone worker service (`apps/worker`).
- **Secure File Storage (AWS S3)**: Direct-to-bucket upload pattern via presigned URLs (`/getPresignedUrl`) to offload bandwidth from the API server.
- **Production-Ready Security**: HTTP security headers via Helmet, configurable CORS, and rate limiting with health check exemptions.
- **Type-Safe Environment Variables**: Strict schema validation with Zod on boot to prevent misconfiguration in any deployment stage.
- **Structured HTTP Logging**: Request ID generation, duration timing, and JSON log correlation using Pino and `pino-http`.
- **Centralized Error Handling**: Unified `AppError` handling with standard HTTP status codes (`http-status-codes`), fail/error status classification, and formatted Zod validation issues.
- **Standardized API Responses**: Predictable JSON envelopes (`sendSuccess`, `sendError`) across all routes.
- **Graceful Shutdown**: Intercepts `SIGTERM` and `SIGINT` to safely finish active HTTP requests, drain connection pools, and shut down workers/Redis cleanly.
- **Developer Experience**: Fast TypeScript hot-reloading with `tsx watch` and pre-commit verification with Husky.
- **Containerized**: Production-ready multi-stage `Dockerfile` with pnpm cache mounting and Docker Compose for local database setup.

---

## 📁 Project Structure

```text
├── .husky/                   # Git pre-commit hooks (lint, format checks)
├── docker-compose.yml        # PostgreSQL container setup
├── Dockerfile                # Multi-stage production Docker build
├── drizzle.config.ts         # Drizzle ORM configuration
├── esbuild.config.mjs        # Production bundle build configuration
├── eslint.config.ts          # ESLint configuration
├── package.json              # Dependencies and scripts
├── pnpm-lock.yaml            # pnpm lockfile
├── tsconfig.json             # TypeScript configuration
└── src/
    ├── app.ts                # Express app setup, middleware stack, & route mounting
    ├── jobs/                 # BullMQ queues and job helpers
    │   ├── helpers/          # Job execution helpers (email payload types)
    │   └── queues/           # BullMQ queue instances (email-queue)
    ├── lib/                  # Shared utilities (logger, AppError, response types)
    ├── middlewares/          # Auth, error handler, rate limiter, logger, validator
    ├── repository/           # Data access layer (database queries via Drizzle)
    ├── routes/               # API route definitions
    │   └── v1/               # Version 1 route endpoints (todos, etc.)
    ├── services/             # Business logic layer
    ├── types/                # TypeScript ambient declarations (Express Request extensions)
    ├── utils/                # Utility helpers (Better Auth instance, S3 presigned URL)
    └── validations/          # Zod validation schemas for request bodies/parameters
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v20+ or v22+ recommended)
- [pnpm](https://pnpm.io/) (`npm install -g pnpm`)
- [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/)
- [Redis](https://redis.io/) (for BullMQ background queues)

### 1. Clone the Repository

```bash
git clone https://github.com/heyavanindra/nodejs-boilerplate.git
cd nodejs-boilerplate
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Configure Environment Variables

Create your local `.env.development` file from `.env.example`:

```bash
cp .env.example .env.development
```

Configure your environment variables:

```env
# Application
PORT=4000
NODE_ENV=development
LOG_LEVEL=debug

# Database
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/todo_db"

# Authentication (Better Auth)
BETTER_AUTH_SECRET="your-better-auth-secret"
BETTER_AUTH_URL="http://localhost:3000"

# Redis & Background Jobs
REDIS_HOST="127.0.0.1"
REDIS_PORT=6379
REDIS_PASSWORD=""
# REDIS_URL="redis://localhost:6379"

# AWS S3 (Presigned URLs)
AWS_ACCESS_KEY_ID="your-access-key-id"
AWS_SECRET_ACCESS_KEY="your-secret-access-key"
AWS_BUCKET="your-s3-bucket-name"
AWS_BUCKET_REGION="ap-south-1"
```

### 4. Start Infrastructure Services

Spin up PostgreSQL via Docker Compose:

```bash
docker compose up -d
```

_(Ensure Redis is running locally on port `6379` or configure `REDIS_HOST` / `REDIS_PORT`)._

### 5. Run Database Migrations / Schema Push

Push the Drizzle schemas (todos and auth tables) directly to PostgreSQL:

```bash
pnpm db:push
```

### 6. Run the Application

#### Start the API Server

```bash
pnpm dev
```

The API server starts with live reload at `http://localhost:4000`.

#### Start the Background Worker (Dedicated Service)

```bash
pnpm --filter worker dev
```

The dedicated background worker service (`apps/worker`) will listen for BullMQ jobs (e.g. welcome email notifications).

---

## 📡 API Endpoints

### 1. System & Health

| Method | Endpoint  | Description                                | Auth Required |
| :----- | :-------- | :----------------------------------------- | :------------ |
| `GET`  | `/health` | Server health check (bypasses rate-limits) | No            |

**Response** (`200 OK`):

```json
{
  "status": "ok",
  "message": "Server is running",
  "timestamp": "2026-09-09T12:00:00.000Z"
}
```

---

### 2. Authentication (`/api/auth/*`)

Managed by [Better Auth](https://www.better-auth.com/):

- Handles user registration, email/password authentication, sessions, and account verification.
- Routes are mounted at `/api/auth/*splat`.
- Authenticated requests send session tokens via standard HTTP cookies or authorization headers.

---

### 3. File Storage (`/getPresignedUrl`)

| Method | Endpoint           | Description                                 | Auth Required |
| :----- | :----------------- | :------------------------------------------ | :------------ |
| `GET`  | `/getPresignedUrl` | Generate S3 presigned URL for direct upload | No            |

**Request Body**:

```json
{
  "fileName": "avatar-user-123.png"
}
```

**Response** (`200 OK`):

```json
{
  "url": "https://your-s3-bucket.s3.ap-south-1.amazonaws.com/avatar-user-123.png?..."
}
```

---

### 4. Todos (`/api/v1/todos`)

All Todo endpoints require authentication (`requireAuth`) and automatically scope items to the authenticated user.

| Method   | Endpoint                | Description                    | Status         |
| :------- | :---------------------- | :----------------------------- | :------------- |
| `POST`   | `/api/v1/todos`         | Create a new todo              | ✅ Implemented |
| `GET`    | `/api/v1/todos`         | List all todos for active user | ✅ Implemented |
| `GET`    | `/api/v1/todos/:todoId` | Get todo by ID                 | ✅ Implemented |
| `PUT`    | `/api/v1/todos/:todoId` | Update an existing todo        | ✅ Implemented |
| `DELETE` | `/api/v1/todos/:todoId` | Delete a todo                  | ✅ Implemented |

#### Example: Create Todo

**Request**:

```http
POST /api/v1/todos
Content-Type: application/json

{
  "title": "Build backend boilerplate",
  "description": "Complete setup with Better Auth and BullMQ",
  "status": "pending"
}
```

**Response** (`201 Created`):

```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "Build backend boilerplate",
    "description": "Complete setup with Better Auth and BullMQ",
    "status": "pending",
    "userId": "usr_941029412",
    "createdAt": "2026-09-09T12:00:00.000Z",
    "updatedAt": "2026-09-09T12:00:00.000Z"
  }
}
```

#### Example: Error Response

```json
{
  "status": "fail",
  "message": "Todo not found"
}
```

---

## 📜 Available Scripts

| Script              | Command                                                     | Description                                                   |
| :------------------ | :---------------------------------------------------------- | :------------------------------------------------------------ |
| `pnpm dev`          | `dotenvx run -f .env.development -- tsx watch src/index.ts` | Starts API development server with live reload                |
| `pnpm build`        | `esbuild src/index.ts ...`                                  | Bundles TypeScript into production JavaScript in `dist/`      |
| `pnpm start`        | `dotenvx run -f .env -- node dist/index.js`                 | Runs compiled production API server                           |
| `pnpm check-types`  | `tsc --noEmit`                                              | Runs TypeScript type checking without emitting files          |
| `pnpm lint`         | `eslint .`                                                  | Checks for linting errors across the codebase                 |
| `pnpm fix`          | `eslint . --fix`                                            | Automatically fixes autofixable lint issues                   |
| `pnpm format`       | `prettier --write .`                                        | Formats all files using Prettier                              |
| `pnpm format:check` | `prettier --check .`                                        | Verifies formatting of all files against Prettier rules       |
| `pnpm db:push`      | `dotenvx run -f .env.development -- drizzle-kit push`       | Pushes Drizzle schema definitions directly to database        |
| `pnpm db:generate`  | `dotenvx run -f .env.development -- drizzle-kit generate`   | Generates migration SQL files based on schema changes         |
| `pnpm db:migrate`   | `dotenvx run -f .env.development -- drizzle-kit migrate`    | Executes pending database migrations                          |
| `pnpm db:studio`    | `dotenvx run -f .env.development -- drizzle-kit studio`     | Launches Drizzle Studio Web GUI for managing database records |

---

## 🐳 Docker Deployment

A production-optimized, multi-stage Dockerfile is provided:

```bash
# Build the Docker image
docker build -t nodejs-boilerplate .

# Run the container
docker run -p 4000:4000 --env-file .env nodejs-boilerplate
```

---

## 🛡️ Git Pre-commit Hooks

Pre-commit hooks are configured via **Husky** (`.husky/pre-commit`). On every commit, the hook automatically runs:

1. `pnpm lint`
2. `pnpm check-types`
3. `pnpm format:check`

---

## 📝 License

This project is licensed under the [ISC License](LICENSE).
