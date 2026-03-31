---
title: "Advanced TypeScript: Generics and Advanced Types"
date: "2026-02-27"
description: "Take your TypeScript skills to the next level with powerful utility types and generic patterns."
category: "Frontend"
tags: ["TypeScript", "Programming", "Clean Code"]
slug: "advanced-typescript-techniques"
draft: false
---

TypeScript provides a sophisticated type system that can model complex logic at the type level.

## Powerful Generics

Generics allow us to create reusable components that work with a variety of types.

```typescript {2, 5}
// Advanced Generic Interface
interface ApiResponse<T = any> {
  data: T;
  status: number;
  message: string;
}

// Usage with explicit type
const userResponse: ApiResponse<{ id: number; name: string }> = {
  data: { id: 1, name: "Ola Ishola" },
  status: 200,
  message: "Success"
};
```

<Newsletter />

## Utility Types

TypeScript comes with several built-in utility types to facilitate common type transformations.

<Callout type="info">
  **Important**: Always prefer `Pick` or `Omit` over creating duplicate interfaces with slightly different fields. This keeps your codebase DRY (Don't Repeat Yourself).
</Callout>

### Example of Pick/Omit
```typescript
interface User {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
}

// Create a public profile type without the sensitive fields
type PublicProfile = Omit<User, 'passwordHash' | 'email'>;

const profile: PublicProfile = {
  id: "u123",
  name: "Ola Ishola"
};
```

## The Power of Union Types

Combining types with Unions allows for flexible but safe data structures.

- **Status**: `'loading' | 'success' | 'error'`
- **Role**: `'admin' | 'user' | 'guest'`

Using these makes your code much more self-documenting.
