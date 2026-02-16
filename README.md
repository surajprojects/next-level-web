---

# Next-Level Web (Assignment)

A modern Nextjs application demonstrating role-based access control (RBAC) patterns with Prisma ORM and PostgreSQL.
This project showcases clean architecture principles and separation of concerns for building scalable web applications.

- **Frontend** Interactive React component with role-switching buttons to test protected endpoints
- **Backend** Protected API route that validates user roles before granting access
- **Database** PostgreSQL with Prisma ORM for type-safe database operations
- **Architecture** Centralized RBAC logic for maintainability and consistency

## Key Features

- Role-based access control with two roles - `USER` and `ADMIN`
- Protected API endpoint that enforces role-based authorization
- Type-safe database queries with Prisma
- Clean separation between business logic and route handlers
- Interactive UI for testing different user roles
- Leverages Next.js App Router and React 19

## Architecture Decisions

### Why Next.js App Router?

The App Router provides several advantages over the Pages Router

- **Server Components** Built-in support for server-side rendering with `"use server"` directives
- **Cleaner API Routes** Simpler file-based routing for API endpoints
- **Better Performance** Native support for streaming and incremental static regeneration
- **Modern React Integration** Direct integration with React 19 features

### Why Prisma?

Prisma offers significant benefits for database operations

- **Type Safety** Auto-generated TypeScript types from the schema prevent runtime errors
- **Developer Experience** Intuitive schema definition and migrations
- **Query Builder** Ergonomic API that reads like plain JavaScript
- **Multi-Adapter Support** Easy switching between different databases (PostgreSQL, MySQL, SQLite, etc.)
- **Generated Prisma Client** No boilerplate code needed—just import and use

### Why Centralized RBAC?

The `hasAccess()` utility function in `src/lib/rbac.ts` is the single source of truth for authorization

**Benefits**

- **Security** All role checks go through one function, reducing risk of inconsistencies
- **Reusability** Same logic can be used across API routes, server actions, and middleware
- **Maintainability** Changes to authorization rules only need to happen in one place
- **Testability** Easy to unit test authorization logic in isolation

**Why not check roles inline?**

- Scattered checks lead to copy-paste errors
- Inconsistent authorization logic across the codebase
- Harder to audit security decisions
- Difficult to add new features (e.g., role hierarchies, permission attributes)

## Project Structure

```
src/
├── app/                          # Next.js App Router
│   ├── api/
│   │   └── protected/
│   │       └── route.ts         # Protected API endpoint (ADMIN only)
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Homepage with role-testing UI
├── db/                          # Database layer
│   ├── index.ts                 # Prisma client initialization
│   ├── generated/               # Auto-generated Prisma types
│   └── prisma/
│       ├── schema.prisma        # Database schema definition
│       └── migrations/          # Database migration history
└── lib/                         # Shared utilities
    ├── auth.ts                  # Authentication helpers (reserved)
    └── rbac.ts                  # Role-based access control logic
```

## Database Schema

The application uses a simple User model with role-based authorization

```prisma
enum Role {
  USER
  ADMIN
}

model User {
  id   String @id @default(uuid())
  name String
  role Role   # User's role USER or ADMIN
}
```

**Currently**, the application uses request headers to simulate user roles (no database queries). This keeps the demo focused on RBAC patterns rather than full authentication.

### Installation & Setup

1. Clone the repository
2. Navigate to the folder
3. Install dependencies
4. Generate prisma client
5. Start the development server
6. Open the app in your browser at http://localhost:3000

### Testing the Protected Endpoint

The homepage provides two buttons to test role-based access

1. **Request as Admin** Sends a request with the `ADMIN` role
   - Succeeds and returns `"Secret admin data!!!"`
2. **Request as User** Sends a request with the `USER` role
   - Fails with `403 Forbidden` and returns `"Forbidden!!!"`

## Tradeoffs & Design Decisions

### Simplicity Over Full Authentication

**Decision** Use request headers instead of JWT or session-based auth

**Tradeoff**

- **Pro** Focus on RBAC patterns without auth complexity
- **Pro** Easier to understand and test
- **Con** Not suitable for production (no session management)
- **Con** No persistent authentication across requests

**For Production** Integrate a proper auth system (NextAuth.js, Auth0, Firebase Auth) and extract roles from authenticated sessions.

### Client-Side Role Simulation

**Decision** Set roles via request headers from the frontend

**Tradeoff**

- **Pro** Simple demo of role-based logic
- **Pro** No database setup required to test
- **Con** Insecure (users could spoof roles)
- **Con** Doesn't demonstrate real user management

**For Production** Retrieve user roles from the database or auth provider, never trust client-supplied role claims.

### No Full User Management System

**Decision** Keep the project focused on RBAC patterns

**Scope Intentionally Excludes**

- User registration and login flows
- Password hashing and validation
- User profile management
- Session persistence

**Why** The goal is to demonstrate clean RBAC architecture, not build a complete auth system. These features can be added as extensions.

## Deployment

This web app is deployed using [Vercel](https://vercel.com) by Tiger. You can access the live version here [Next Level Web](https://next-level-web-three.vercel.app)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

Made with ❤️ by Tiger

---
