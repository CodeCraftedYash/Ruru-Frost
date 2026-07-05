# Database Design

## Design Principles

- We design for correctness, not convenience.
- We avoid storing duplicate data unless it is intentional (e.g. historical records).
- Every table represents a real business concept.
- Every field exists for a business reason.
- Every relationship answers a business requirement.

---

# Models

## User

### Purpose

Represents customers and administrators.

### Fields

| Field | Type | Nullable | Notes |
|--------|------|----------|-------|
| id | UUID | No | Primary Key |
| name | String | No | Customer name |
| email | String | No | Unique |
| password | String | No | Hashed password |
| phone | String | Yes | Required before placing the first order |
| role | Enum | No | USER / ADMIN |
| status | Enum | No | ACTIVE / BLOCKED |
| createdAt | DateTime | No | Audit |
| updatedAt | DateTime | No | Audit |

### Constraints

- `email` must be unique.
- `phone` must be unique (nullable).
- Password is always stored as a hash.

### Relationships

- One User → One Cart
- One User → Many Addresses
- One User → Many Orders

### Referenced By

- Address.userId
- Cart.userId
- Order.userId

### Indexes

- email (unique)
- phone (unique)

### Business Rules

- Users are never deleted.
- Blocked users cannot access protected customer features.
- Phone number is required before placing the first order.

---

## Address

### Purpose

Stores delivery addresses saved by users.

### Fields

| Field | Type | Nullable | Notes |
|--------|------|----------|-------|
| id | UUID | No | Primary Key |
| userId | UUID | No | Owner |
| recipientName | String | No | Delivery recipient |
| phone | String | No | Delivery contact |
| addressLine1 | String | No | Street / House |
| addressLine2 | String | Yes | Landmark / Apartment |
| city | String | No | |
| state | String | No | |
| postalCode | String | No | |
| country | String | No | |
| isDefault | Boolean | No | Default shipping address |
| createdAt | DateTime | No | Audit |
| updatedAt | DateTime | No | Audit |

### Relationships

- Many Addresses → One User

### Business Rules

- A user can have multiple addresses.
- Only one address can be marked as default.
- Addresses can be edited or deleted.
- Order shipping addresses are copied into the Order and are not linked to this table.
- When a new default address is selected, the previous default is automatically unset.

---

## Product

### Purpose

Represents a single sellable ice cream product.

### Fields

| Field | Type | Nullable | Notes |
|--------|------|----------|-------|
| id | UUID | No | Primary Key |
| name | String | No | Product name |
| slug | String | No | Unique |
| description | Text | No | Product description |
| sku | String | No | Unique |
| price | Decimal | No | Selling price |
| stock | Int | No | Must be ≥ 0 |
| volume | Int | No | Example: 100, 500, 1000 |
| volumeUnit | Enum | No | ML / L |
| isAvailable | Boolean | No | Controls product visibility |
| deletedAt | DateTime | Yes | Soft delete |
| createdAt | DateTime | No | Audit |
| updatedAt | DateTime | No | Audit |

### Constraints

- SKU must be unique.
- Slug must be unique.
- Price cannot be negative.
- Stock cannot be negative.

### Relationships

- One Product → Many ProductImages
- One Product → Many CartItems
- One Product → Many OrderItems
- Many Products ↔ Many Collections

### Referenced By

- ProductImage.productId
- CartItem.productId
- OrderItem.productId
- CollectionProduct.productId

### Indexes

- slug
- sku
- isAvailable
- deletedAt

### Business Rules

- Each sellable item is its own product.
- Products are soft deleted.
- A product may belong to multiple collections.
- A product may have multiple images.
- Products can be hidden without deleting them using `isAvailable`.
- A product cannot be deleted
if referenced by active business logic.
Instead it is soft deleted.

---

## ProductImage

### Purpose

Stores images belonging to a product.

### Fields

| Field | Type | Nullable | Notes |
|--------|------|----------|-------|
| id | UUID | No | Primary Key |
| productId | UUID | No | Product |
| imageUrl | String | No | Cloudinary URL |
| displayOrder | Int | No | Image display order |
| createdAt | DateTime | No | Audit |

### Relationships

- Many ProductImages → One Product


### Constraints
Unique(productId, displayOrder)


### Business Rules

- Products can have multiple images.
- Images are displayed using `displayOrder`.

---

## Collection

### Purpose

Groups products for marketing purposes.

Examples:

- Summer Specials
- Best Sellers
- Festival Collection

### Fields

| Field | Type | Nullable | Notes |
|--------|------|----------|-------|
| id | UUID | No | Primary Key |
| name | String | No | Unique |
| slug | String | No | Unique |
| description | String | Yes | Optional |
| createdAt | DateTime | No | Audit |
| updatedAt | DateTime | No | Audit |

### Relationships

- Many Collections ↔ Many Products

---

## CollectionProduct

### Purpose

Junction table connecting Products and Collections.  
(displayOrder >= 1)

### Fields

| Field | Type | Nullable | Notes |
|--------|------|----------|-------|
| productId | UUID | No | FK |
| collectionId | UUID | No | FK |
| displayOrder | Int | No | Product order within collection |

### Constraints

- Composite Primary Key (`productId`, `collectionId`)

---

## Cart

### Purpose

Represents a user's shopping cart.

### Fields

| Field | Type | Nullable | Notes |
|--------|------|----------|-------|
| id | UUID | No | Primary Key |
| userId | UUID | No | Unique |

### Relationships

- One Cart → Many CartItems
- One Cart → One User

---

## CartItem

### Purpose

Represents a product inside a cart.

### Fields

| Field | Type | Nullable | Notes |
|--------|------|----------|-------|
| id | UUID | No | Primary Key |
| cartId | UUID | No | FK |
| productId | UUID | No | FK |
| quantity | Int | No | Must be greater than 0 |

### Relationships

- Many CartItems → One Cart
- Many CartItems → One Product

### Constraints

- Composite Unique (cartId, productId)

---
## Order

### Purpose

Represents a completed purchase made by a customer.

The Order stores a snapshot of the shipping address and pricing information so that historical orders remain unchanged even if products or user information are updated later.

### Fields

| Field | Type | Nullable | Notes |
|--------|------|----------|-------|
| id | UUID | No | Primary Key |
| orderNumber | String | No | Unique, customer-facing identifier |
| userId | UUID | No | Customer who placed the order |
| status | Enum | No | PENDING / PREPARING / OUT_FOR_DELIVERY / DELIVERED / CANCELLED |
| paymentMethod | Enum | No | CASH_ON_DELIVERY |
| paymentStatus | Enum | No | PENDING / PAID / FAILED |
| subtotal | Decimal | No | Sum of all order items |
| shippingFee | Decimal | No | Shipping charge |
| totalAmount | Decimal | No | Final payable amount |
| recipientName | String | No | Shipping snapshot |
| phone | String | No | Shipping snapshot |
| addressLine1 | String | No | Shipping snapshot |
| addressLine2 | String | Yes | Shipping snapshot |
| city | String | No | Shipping snapshot |
| state | String | No | Shipping snapshot |
| postalCode | String | No | Shipping snapshot |
| country | String | No | Shipping snapshot |
| createdAt | DateTime | No | Audit |
| updatedAt | DateTime | No | Audit |

### Relationships

- One User → Many Orders
- One Order → Many OrderItems

### Indexes

- orderNumber
- userId
- status
- createdAt

### Business Rules

- Orders are immutable after creation.
- Only the order status can change.
- Shipping information is copied from the selected address.
- Prices are stored as a historical snapshot.
- Customers may cancel orders only while the status is `PENDING` or `PREPARING`.
- Stock is deducted only after
the order is successfully created.

---

## OrderItem

### Purpose

Represents an individual product purchased within an order.

Order items store a snapshot of product information so that order history remains accurate even if the original product changes later.

### Fields

| Field | Type | Nullable | Notes |
|--------|------|----------|-------|
| id | UUID | No | Primary Key |
| orderId | UUID | No | Parent order |
| productId | UUID | No | Purchased product |
| productName | String | No | Snapshot of product name |
| sku | String | No | Snapshot of product SKU |
| quantity | Int | No | Purchased quantity |
| unitPrice | Decimal | No | Price at purchase time |
| totalPrice | Decimal | No | `quantity × unitPrice` snapshot |

### Relationships

- Many OrderItems → One Order
- Many OrderItems → One Product

### Business Rules

- Product information is copied when the order is placed.
- Product name and price never change after purchase.
- Quantity must be greater than zero.
- Product snapshots are immutable.Changing Product later never changes OrderItem.

# Relationship Diagram

```
User
├── Cart (1:1)
│     └── CartItem (1:N)
│             └── Product
│                     ├── ProductImage (1:N)
│                     └── CollectionProduct (1:N)
│                               └── Collection
│
├── Address (1:N)
│
└── Order (1:N)
      └── OrderItem (1:N)
            └── Product
```