## Standards
- Use @id @default(uuid()) for primary keys.
- Use createdAt @default(now()).
- Use updatedAt @updatedAt.
- Use enums instead of strings wherever applicable.
- Name relations explicitly when Prisma needs them.
- Add database indexes (@@index) where appropriate.
- Add unique constraints (@unique and @@unique) where appropriate.