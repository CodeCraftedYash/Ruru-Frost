# Architecture

## Tech Stack

Frontend

- Next.js
- TypeScript
- Tailwind CSS

Backend

- Express.js
- Prisma ORM
- PostgreSQL

Authentication

- JWT
- Refresh Tokens
- HTTP Only Cookies

Storage

- Cloudinary

Validation

- Zod

---

# Backend Architecture

```
Client
      │
      ▼
Routes
      │
      ▼
Controllers
      │
      ▼
Services
      │
      ▼
Repositories
      │
      ▼
Prisma ORM
      │
      ▼
PostgreSQL
```

---

# Project Structure

```
client/

server/

docs/
```

Backend

```
src/
│
├── config/
├── controllers/
├── middleware/
├── repositories/
├── routes/
├── services/
├── validators/
├── prisma/
├── utils/
└── types/
```

Frontend

```
app/
components/
hooks/
services/
types/
lib/
```

---

# Design Principles

- RESTful API
- Layered Architecture
- Separation of Concerns
- Reusable Components
- Centralized Error Handling
- Input Validation
- Role-Based Authorization
- Clean Folder Structure