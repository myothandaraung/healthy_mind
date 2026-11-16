# MindCare

MindCare is a multilingual mental-wellness web application for tracking moods,
writing journal entries, reviewing progress, practising relaxation exercises,
setting gentle goals, and finding support resources.

> MindCare is a wellness tool, not a substitute for professional medical care or
> emergency services.

## Features

- Mood check-ins and summaries
- Personal journal
- Wellness activities and breathing exercises
- Gentle goals and progress views
- Support resources
- Account and preference management
- English, Burmese, and Japanese translations
- JWT-based authentication

## Tech stack

- **Frontend:** React 19, TypeScript, Vite, Tailwind CSS, TanStack Query
- **Backend:** Java 17, Spring Boot 3, Spring Security, Spring Data JPA
- **Database:** PostgreSQL with Flyway migrations
- **Tests:** Spring Boot Test, Spring Security Test, and H2

## Project structure

```text
MindCare/
|-- frontend/   # React single-page application
`-- backend/    # Spring Boot REST API and database migrations
```

## Prerequisites

Install the following before running the project:

- Node.js and npm
- Java Development Kit (JDK) 17 or later
- Maven 3.9 or later
- PostgreSQL

## Getting started

### 1. Create the database

Create a PostgreSQL database named `mindcare`:

```sql
CREATE DATABASE mindcare;
```

The default development configuration connects with the username `postgres`
and password `root`. Update `backend/src/main/resources/application.properties`
if your local credentials are different. Flyway applies the database migrations
automatically when the backend starts.

### 2. Configure authentication

The backend accepts JWTs and supports the following environment variables:

| Variable | Description |
| --- | --- |
| `AUTH_JWT_ISSUER_URI` | JWT issuer URL |
| `AUTH_JWT_AUDIENCE` | Expected JWT audience (defaults to `authenticated`) |
| `AUTH_JWT_JWKS_URI` | URL of the JSON Web Key Set used to verify tokens |

The application also includes local register and login endpoints. The Supabase-
style JWT settings in `application.properties` are placeholders and should be
replaced before using an external identity provider.

### 3. Start the backend

```bash
cd backend
mvn spring-boot:run
```

The API is served at `http://localhost:8080/api/v1`.

### 4. Start the frontend

In another terminal:

```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:5174`. During development, Vite proxies requests from
`/api/v1` to the backend on port `8080`.

To use a different API URL, set `VITE_API_BASE` before starting or building the
frontend.

## Useful commands

### Frontend

```bash
cd frontend
npm run dev       # Start the development server
npm run build     # Type-check and create a production build
npm run preview   # Preview the production build locally
```

### Backend

```bash
cd backend
mvn spring-boot:run  # Start the API
mvn test             # Run backend tests
mvn package          # Build the application JAR
```

## API overview

The REST API includes endpoints for:

- Authentication
- User profiles and preferences
- Mood entries and summaries
- Journal entries
- Wellness activities
- Support resources
- Privacy-related export and deletion requests

Protected endpoints require an `Authorization: Bearer <token>` header.

## Production notes

Before deploying, keep database credentials and JWT configuration in environment
variables or a secrets manager, restrict CORS to the deployed frontend origin,
and serve the frontend build over HTTPS.

