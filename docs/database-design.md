# Database Design

## Models

### User

- id
- name
- email
- password
- role

---

### Address

- id
- userId
- city
- state
- country
- postalCode

---

### Product

- id
- name
- description
- price
- stock
- categoryId

---

### ProductImage

- id
- imageUrl
- productId

---

### Cart

- id
- userId

---

### CartItem

- id
- cartId
- productId
- quantity

---

### Order

- id
- userId
- totalPrice
- status

---

### OrderItem

- id
- orderId
- productId
- quantity
- price

---

# Relationships

User

- One User → One Cart
- One User → Many Orders
- One User → Many Addresses

Category

- One Category → Many Products

Product

- One Product → Many Images

Cart

- One Cart → Many Cart Items

Order

- One Order → Many Order Items