# URL Shortener

## Introduction

This project is a full-stack URL Shortener built as an assessment project.
It allows users to submit a long URL and get a short URL that can be shared.
When the short URL is opened, the app resolves it and redirects to the original URL.

Tech stack:

- Frontend: Next.js
- Backend: NestJS
- Database: PostgreSQL with Prisma ORM
- Containerization: Docker Compose

## How To Run

### Option 1: Run with Docker (recommended)

1. Make sure Docker Desktop is running.
2. From the project root, start all services:

```bash
docker compose up --build
```

3. Open the apps:

- Frontend: http://localhost:3000
- Backend API: http://localhost:3001

This command starts:

- PostgreSQL on port 5432
- NestJS backend on port 3001
- Next.js frontend on port 3000

### Option 2: Run locally without Docker

1. Start PostgreSQL and create a database named `url_shortener`.
2. In `backend/.env`, set:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/url_shortener"
```

3. Install and run backend:

```bash
cd backend
npm install
npx prisma migrate dev
npm run start:dev
```

4. In a new terminal, install and run frontend:

```bash
cd frontend
npm install
npm run dev
```

5. Open http://localhost:3000

## How To Use

1. Open the frontend at http://localhost:3000.
2. Enter a long URL in the form and submit.
3. Copy the generated short URL.
4. Open the short URL in your browser.
5. You will be redirected to the original long URL.

You can also use backend endpoints directly:

- `POST /url` to create a short URL
- `GET /url/:shortUrl` to get original URL from a short code
- `GET /url` to list all stored URLs
