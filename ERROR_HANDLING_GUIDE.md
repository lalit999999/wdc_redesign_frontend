# Global Error Handling Guide

## Overview

Axios response interceptor handles API errors globally. Components can override with `useApiError` hook for custom handling.

## Architecture

### 1. **Global Response Interceptor** (`src/api/authInterceptor.js`)

Automatically handles all API responses globally.

**Handled Status Codes:**

- `401 Unauthorized` - Clear token, redirect to login
- `403 Forbidden` - Show alert, reject request
- `404 Not Found` - Log warning
- `500 Server Error` - Show alert

```javascript
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }

    if (error.response.status === 403) {
      alert("Access Denied");
    }

    return Promise.reject(error);
  },
);
```

### 2. **useApiError Hook** (`src/app/hooks/useApiError.ts`)

Per-component error handling for specific scenarios.

```tsx
const { handleError } = useApiError();

try {
  await someApiCall();
} catch (error) {
  const errorInfo = handleError(error);
  console.log(errorInfo.message); // User-friendly message
}
```

## Usage Examples

### Example 1: Form Submission with Error Handling

```tsx
import { useApiError } from "../hooks/useApiError";
import { updateProfile } from "../../api/userApi";

export function UpdateProfile() {
  const [error, setError] = useState<string | null>(null);
  const { handleError } = useApiError();

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      const data = new FormData(e.currentTarget);
      await updateProfile(Object.fromEntries(data));
    } catch (err: any) {
      const errorInfo = handleError(err);
      setError(errorInfo?.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="error">{error}</div>}
      {/* form fields */}
    </form>
  );
}
```

### Example 2: Custom Error Handling for Specific Codes

```tsx
const { handleError } = useApiError();

try {
  await deleteAssignment(id);
} catch (error) {
  handleError(error, {
    403: () => alert("Only admins can delete assignments"),
    404: () => alert("Assignment not found"),
  });
}
```

### Example 3: Auto-Dismiss Error Message

```tsx
export function MyComponent() {
  const [error, setError] = useState<string | null>(null);
  const { handleError } = useApiError();

  const handleApiCall = async () => {
    try {
      await someApiCall();
    } catch (err) {
      const errorInfo = handleError(err);

      setError(errorInfo?.message);

      // Auto-dismiss after 3 seconds
      setTimeout(() => setError(null), 3000);
    }
  };

  return (
    <>
      {error && <div className="toast">{error}</div>}
      <button onClick={handleApiCall}>Make API Call</button>
    </>
  );
}
```

### Example 4: Global Error Toast

```tsx
// Create a global error context/provider
export function errorToast(message: string) {
  // Show toast notification
  const toast = document.createElement("div");
  toast.textContent = message;
  toast.className = "fixed bottom-4 right-4 bg-red-500 text-white p-4 rounded";
  document.body.appendChild(toast);

  setTimeout(() => toast.remove(), 3000);
}

// In components
catch (err) {
  const errorInfo = handleError(err);
  errorToast(errorInfo?.message);
}
```

## Status Code Handling

| Code   | Global Handler        | Component Override | Action                |
| ------ | --------------------- | ------------------ | --------------------- |
| `400`  | Log warning           | ✓                  | Bad request           |
| `401`  | Clear token, redirect | ✓                  | Redirect to login     |
| `403`  | Show alert            | ✓                  | Access denied message |
| `404`  | Log warning           | ✓                  | Resource not found    |
| `422`  | Pass validation error | ✓                  | Show field errors     |
| `500`  | Show alert            | ✓                  | Server error message  |
| Others | Log & reject          | ✓                  | Generic error         |

## How It Works

### Global Flow (All Requests)

```
API Call
  ↓
Request Interceptor (adds token)
  ↓
Backend Response
  ↓
Response Interceptor (checks status)
  ├─ 401? → Clear token, redirect /login
  ├─ 403? → Show alert
  └─ Other? → Log & reject
  ↓
Component catch block (optional custom handling)
```

### Component Flow (Specific Scenarios)

```tsx
try {
  const response = await api.get("/data");
  setData(response.data);
} catch (error) {
  const errorInfo = handleError(error); // Returns user-friendly message
  setError(errorInfo.message);
  // Component handles the error with custom UI
}
```

## Error Response Structure

```typescript
interface ApiError {
  status?: number; // HTTP status code
  message: string; // User-friendly message
  data?: any; // Additional error data
}
```

## Best Practices

1. **Always use try-catch for API calls**

   ```tsx
   try {
     await apiCall();
   } catch (error) {
     handleError(error);
   }
   ```

2. **Show user-friendly error messages**

   ```tsx
   const errorInfo = handleError(error);
   setError(errorInfo.message); // Don't show raw error
   ```

3. **Handle 401 redirects gracefully**
   - Global interceptor handles this
   - Don't make additional API calls after 401

4. **Custom handlers for domain-specific errors**

   ```tsx
   handleError(error, {
     409: () => alert("Email already exists"),
     422: () => alert("Validation failed"),
   });
   ```

5. **Log errors for debugging**
   - Global interceptor logs to console
   - Add middleware for production error tracking

## Common Scenarios

### Scenario 1: Authenticate and Start Making Requests

All 401 responses automatically redirect to login via interceptor.

### Scenario 2: Admin-Only Operation

403 response shows "Access Denied" alert and rejects promise.

```tsx
try {
  await deleteUser(id); // Only admin
} catch (error) {
  if (error.response?.status === 403) {
    // Handled by global interceptor
    // Component receives rejected promise
  }
}
```

### Scenario 3: Form Validation Error

422 status with validation details:

```tsx
try {
  await registerUser(data);
} catch (error) {
  const errorInfo = handleError(error);

  if (error.response?.status === 422) {
    // Show field-level errors
    setFieldErrors(error.response.data.errors);
  }
}
```

### Scenario 4: Network/Server Error

500 or network error shows retry option:

```tsx
{
  error && (
    <div>
      <p>{error}</p>
      <button onClick={retryFunction}>Retry</button>
    </div>
  );
}
```

## Error Logging for Production

Consider adding error tracking:

```javascript
// Add to authInterceptor.js
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Send to error tracking service
    if (process.env.NODE_ENV === "production") {
      trackError({
        status: error.response?.status,
        message: error.message,
        url: error.config?.url,
        method: error.config?.method,
      });
    }
    return Promise.reject(error);
  },
);
```

## Files

- ✅ `authInterceptor.js` - Global response interceptor
- ✅ `useApiError.ts` - Hook for component error handling
- ✅ `ErrorHandlingExamples.tsx` - 4 real-world examples
- ✅ This guide

## Quick Checklist

- [ ] All API calls in try-catch blocks
- [ ] Use `handleError()` for user messages
- [ ] Show error UI to users (not raw errors)
- [ ] Handle 401/403 appropriately
- [ ] Implement retry logic where needed
- [ ] Test error scenarios in development
- [ ] Log errors for debugging
