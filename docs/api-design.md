# API Design

## Authentication

| Method | Endpoint | Description |
|----------|----------|-------------|
| POST | /auth/register | Register user |
| POST | /auth/login | Login |
| POST | /auth/logout | Logout |
| POST | /auth/refresh | Refresh access token |

---

## Products

| Method | Endpoint |
|----------|----------|
| GET | /products |
| GET | /products/:id |
| POST | /products |
| PATCH | /products/:id |
| DELETE | /products/:id |

---

## Cart

| Method | Endpoint |
|----------|----------|
| GET | /cart |
| POST | /cart/items |
| PATCH | /cart/items/:id |
| DELETE | /cart/items/:id |

---

## Orders

| Method | Endpoint |
|----------|----------|
| POST | /orders |
| GET | /orders |
| GET | /orders/:id |
| PATCH | /orders/:id/status |

---

## Users

| Method | Endpoint |
|----------|----------|
| GET | /users/me |
| PATCH | /users/me |

---

## Addresses

| Method | Endpoint |
|----------|----------|
| GET | /addresses |
| POST | /addresses |
| PATCH | /addresses/:id |
| DELETE | /addresses/:id |