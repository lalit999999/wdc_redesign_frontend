# Role-Based UI Implementation Guide

## Overview

The application has complete role-based UI system that checks user role from `localStorage` and shows appropriate content.

## Architecture

### 1. **useUserRole Hook** (`src/app/hooks/useUserRole.ts`)

Simple hook to access user role information anywhere in your components.

```tsx
const { user, isAdmin, isStudent, isAuthenticated, userRole } = useUserRole();
```

**Returns:**

- `user` - Full user object with `id`, `name`, `email`, `role`
- `isAdmin` - Boolean: true if user.role === "admin"
- `isStudent` - Boolean: true if user.role === "student"
- `isAuthenticated` - Boolean: true if user exists
- `userRole` - String: "admin" | "student" | null

### 2. **ProtectedRoute Component** (`src/app/components/ProtectedRoute.tsx`)

Wrapper component to protect routes and enforce role requirements.

```tsx
<ProtectedRoute requiredRole="admin">
  <AdminDashboard />
</ProtectedRoute>
```

## Usage Examples

### Example 1: Conditional Rendering

```tsx
import { useUserRole } from "../hooks/useUserRole";

export function Dashboard() {
  const { isAdmin, isStudent } = useUserRole();

  if (isAdmin) {
    return <AdminPanel />;
  } else if (isStudent) {
    return <StudentDashboard />;
  }
}
```

### Example 2: Show/Hide UI Elements

```tsx
export function Navbar() {
  const { isAdmin, isStudent } = useUserRole();

  return (
    <nav>
      <Link to="/dashboard">Dashboard</Link>

      {isAdmin && (
        <>
          <Link to="/admin/students">Manage Students</Link>
          <Link to="/admin/assignments">Manage Assignments</Link>
        </>
      )}

      {isStudent && <Link to="/dashboard/assignments">My Assignments</Link>}
    </nav>
  );
}
```

### Example 3: Get Current User

```tsx
export function UserProfile() {
  const { user, userRole } = useUserRole();

  return (
    <div>
      <h1>{user?.name}</h1>
      <p>Email: {user?.email}</p>
      <p>Role: {userRole}</p>
    </div>
  );
}
```

### Example 4: Protect Routes

In your routes configuration:

```tsx
import { ProtectedRoute } from "./components/ProtectedRoute";

{
  path: "admin",
  element: (
    <ProtectedRoute requiredRole="admin">
      <AdminDashboard />
    </ProtectedRoute>
  ),
}

{
  path: "dashboard",
  element: (
    <ProtectedRoute requiredRole="student">
      <StudentDashboard />
    </ProtectedRoute>
  ),
}
```

## How Authentication Works

1. **User logs in with Google** → Backend validates and returns token + user data
2. **AuthCallback page** → Captures response and stores in localStorage:
   - `localStorage.setItem("token", token)`
   - `localStorage.setItem("user", JSON.stringify(user))`
3. **AuthContext on app load** → Reads localStorage and loads user state
4. **Components check role** → Use `useUserRole()` to conditionally render

## User Object Structure

```typescript
interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "student";
  isShortlisted?: boolean;
}
```

## localStorage Keys

- `token` - JWT token for API authentication (used by authInterceptor)
- `user` - JSON stringified user object with role information

## When user logs out

Both token and user are cleared from localStorage and AuthContext state resets.

## Best Practices

1. **Always use `useUserRole()` hook** - Don't parse localStorage directly
2. **Use `ProtectedRoute` for sensitive pages** - Prevents unauthorized access
3. **Check `isAuthenticated`** before showing user-specific UI
4. **Store user in context** - AuthContext loads it automatically on app start
5. **Clear on logout** - `useAuth().logout()` handles this

## Common Patterns

### Pattern 1: Admin-Only Component

```tsx
export function AdminFeature() {
  const { isAdmin } = useUserRole();

  if (!isAdmin) return null;

  return <AdminSpecificUI />;
}
```

### Pattern 2: Role-Based Navigation

```tsx
export function Navigation() {
  const { isAdmin } = useUserRole();

  const links = [
    { href: "/", label: "Home" },
    { href: "/dashboard", label: "Dashboard" },
    ...(isAdmin ? [{ href: "/admin", label: "Admin" }] : []),
  ];

  return <nav>{links.map(...)}</nav>;
}
```

### Pattern 3: Lazy Load Based on Role

```tsx
export function App() {
  const { isAdmin } = useUserRole();

  return (
    <>
      {isAdmin && <AdminFeatures />}
      <MainUI />
    </>
  );
}
```
