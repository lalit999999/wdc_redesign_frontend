# Frontend API Calls Guide

Step 13 of the authentication setup: Making API calls from frontend components.

## Overview

All API functions are organized in dedicated modules and can be imported and used directly in your components. The axios interceptors handle token injection and error handling automatically.

## Available API Functions

### User API (`src/api/userApi.js`)

```javascript
import {
  getProfile,
  updateProfile,
  getApplicationStatus,
} from "../api/userApi";
```

**`getProfile()`**

- Gets current user's profile information
- Returns: `{ data: { user: { id, name, email, role, ... } } }`
- Usage:
  ```javascript
  const res = await getProfile();
  const user = res.data.user;
  ```

**`updateProfile(data)`**

- Updates user profile with provided data
- Parameters: `{ name?, email?, about?, ... }`
- Returns: `{ data: { user: {...} } }`
- Usage:
  ```javascript
  const res = await updateProfile({ name: "John", about: "..." });
  ```

**`getApplicationStatus()`**

- Gets user's application status
- Returns: `{ data: { applicationStatus: "shortlisted" | "pending" | "rejected" } }`
- Usage:
  ```javascript
  const res = await getApplicationStatus();
  const status = res.data.applicationStatus;
  ```

### Assignment API (`src/api/assignmentApi.js`)

```javascript
import { getAssignments, submitAssignment } from "../api/assignmentApi";
```

**`getAssignments()`**

- Fetches all assignments for the student
- Returns: `{ data: [{ id, title, description, dueDate, ... }] }`
- Usage:
  ```javascript
  const res = await getAssignments();
  const assignments = res.data;
  ```

**`submitAssignment(id, data)`**

- Submits an assignment solution
- Parameters: `id` (assignment ID), `data` (submission data)
- Returns: `{ data: { submission: {...} } }`
- Usage:
  ```javascript
  const res = await submitAssignment("123", { solution: "..." });
  ```

### Announcement API (`src/api/announcementApi.js`)

```javascript
import { getAnnouncements } from "../api/announcementApi";
```

**`getAnnouncements()`**

- Fetches all announcements
- Returns: `{ data: [{ id, title, description, postedAt, ... }] }`
- Usage:
  ```javascript
  const res = await getAnnouncements();
  const announcements = res.data;
  ```

### Admin API (`src/api/adminApi.js`)

```javascript
import {
  getUsers,
  approveUser,
  rejectUser,
  createAssignment,
  deleteAssignment,
  createAnnouncement,
  deleteAnnouncement,
} from "../api/adminApi";
```

**`getUsers()`**

- Fetches all students for admin review
- Returns: `{ data: [{ id, name, email, applicationStatus, ... }] }`

**`approveUser(id)`**

- Approves a student's application
- Returns: `{ data: { user: {...} } }`

**`rejectUser(id)`**

- Rejects a student's application
- Returns: `{ data: { user: {...} } }`

**`createAssignment(data)`**

- Creates a new assignment
- Parameters: `{ title, description, dueDate, ... }`
- Returns: `{ data: { assignment: {...} } }`

**`deleteAssignment(id)`**

- Deletes an assignment
- Returns: `{ data: { message: "Assignment deleted" } }`

**`createAnnouncement(data)`**

- Creates a new announcement
- Parameters: `{ title, description, ... }`
- Returns: `{ data: { announcement: {...} } }`

**`deleteAnnouncement(id)`**

- Deletes an announcement
- Returns: `{ data: { message: "Announcement deleted" } }`

## Basic Usage Pattern

### 1. Simple API Call on Component Mount

```typescript
import { useEffect, useState } from "react";
import { getProfile } from "../api/userApi";

export function MyComponent() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const res = await getProfile();
      console.log(res.data.user);  // This is what you asked for in Step 13!
      setProfile(res.data.user);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  return <div>{profile.name}</div>;
}
```

### 2. Form Submission

```typescript
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await updateProfile({ name, email });
    console.log("Updated:", res.data.user);
    setSuccess(true);
  } catch (err) {
    setError(err.message);
  }
};
```

### 3. Multiple API Calls

```typescript
useEffect(() => {
  const loadData = async () => {
    try {
      // Call multiple APIs
      const profileRes = await getProfile();
      const statusRes = await getApplicationStatus();
      const assignmentsRes = await getAssignments();

      setProfile(profileRes.data.user);
      setStatus(statusRes.data);
      setAssignments(assignmentsRes.data);
    } catch (err) {
      console.error("API Error:", err);
    }
  };

  loadData();
}, []);
```

## With Error Handling Hook

Using the `useApiError` hook for better error messages:

```typescript
import { useApiError } from "../hooks/useApiError";
import { getProfile } from "../api/userApi";

export function MyComponent() {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);
  const { handleError } = useApiError();

  const loadProfile = async () => {
    try {
      const res = await getProfile();
      setProfile(res.data.user);
    } catch (err) {
      // handleError converts status codes to user-friendly messages
      const errorInfo = handleError(err);
      setError(errorInfo?.message);
    }
  };

  // Render...
}
```

## With Custom Error Handlers

```typescript
const { handleError } = useApiError();

try {
  const res = await updateProfile(data);
} catch (err) {
  const errorInfo = handleError(err, {
    // Override default messages for specific status codes
    422: () => "Please check the form fields",
    409: () => "Email already in use",
  });
  setError(errorInfo?.message);
}
```

## Automatic Token Handling

The request interceptor automatically adds the JWT token to every API call:

```javascript
// You write:
const res = await getProfile();

// Axios automatically sends:
// Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
```

## Automatic Error Handling

The response interceptor automatically handles certain errors globally:

- **401 (Unauthorized)**: Clears token, redirects to `/login`
- **403 (Forbidden)**: Shows "Access Denied" alert
- **404 (Not Found)**: Logs warning
- **500 (Server Error)**: Shows "Server error" alert

You can still catch these errors in try-catch and handle them locally as well.

## Example: The Exact Step 13 Code

As shown in your request, the simplest example:

```javascript
import { getProfile } from "../api/userApi";

const loadProfile = async () => {
  const res = await getProfile();
  console.log(res.data.user); // ← Your exact code
};

// Call it in useEffect
useEffect(() => {
  loadProfile();
}, []);
```

## Full Working Component

See `FrontendApiCallExamples.tsx` for 4 complete working examples:

1. `LoadProfileExample` - Load profile on mount
2. `UpdateProfileFormExample` - Submit form and update profile
3. `CheckApplicationStatusExample` - Check application status
4. `DashboardWithMultipleAPICalls` - Load multiple data sources

## Response Data Structure

All API responses follow this pattern:

```javascript
{
  data: {
    // Different based on endpoint
    user: {...},
    applicationStatus: "shortlisted",
    [...]
  }
}
```

So access the actual data with: `response.data.[field]`

## Common Patterns

### Refetch Data

```javascript
const handleRefresh = async () => {
  setLoading(true);
  try {
    const res = await getProfile();
    setProfile(res.data.user);
  } finally {
    setLoading(false);
  }
};

<button onClick={handleRefresh}>Refresh</button>;
```

### Conditional Loading Based on Status

```javascript
useEffect(() => {
  if (applicationStatus === "shortlisted") {
    // Load assignments only if shortlisted
    loadAssignments();
  }
}, [applicationStatus]);
```

### Chaining Multiple API Calls

```javascript
const handleApproveStudent = async (userId) => {
  try {
    await approveUser(userId);
    // Refresh student list after approval
    const res = await getUsers();
    setUsers(res.data);
  } catch (err) {
    handleError(err);
  }
};
```

## Next Steps

1. Use these API calls in your dashboard components
2. Implement form submissions with API calls
3. Add data fetching on route changes
4. Implement data caching to avoid duplicate requests
5. Add optimistic updates for better UX
