# Application Status Checking Guide

## Overview

Control access to assignments based on application status (shortlisted/pending/rejected). Backend returns status which gates student features.

## Architecture

### 1. **useApplicationStatus Hook** (`src/app/hooks/useApplicationStatus.ts`)

Fetches and manages application status from the backend.

```tsx
const { status, isShortlisted, canDoAssignments, loading, error, data } =
  useApplicationStatus();
```

**Returns:**

- `status` - "shortlisted" | "pending" | "rejected" | "unknown"
- `isShortlisted` - Boolean: true if status === "shortlisted"
- `canDoAssignments` - Boolean: true if shortlisted
- `loading` - Boolean: true while fetching
- `error` - String | null
- `data` - Full response data with dates, feedback, etc.
- `refetch()` - Function to re-fetch status

### 2. **AssignmentGate Component** (`src/app/components/AssignmentGate.tsx`)

Wraps assignment UI and shows message if not shortlisted.

```tsx
<AssignmentGate>
  <AssignmentsList /> {/* Only shows if shortlisted */}
</AssignmentGate>
```

## Usage Examples

### Example 1: Simple Status Check

```tsx
import { useApplicationStatus } from "../hooks/useApplicationStatus";

export function Dashboard() {
  const { status, isShortlisted } = useApplicationStatus();

  return (
    <div>
      <h1>Your Status: {status}</h1>
      {isShortlisted ? (
        <p>✓ You can access assignments now!</p>
      ) : (
        <p>Your application is under review.</p>
      )}
    </div>
  );
}
```

### Example 2: Gate Assignments

```tsx
import { AssignmentGate } from "../components/AssignmentGate";

export function StudentAssignments() {
  return (
    <AssignmentGate>
      <div>
        <h1>Your Assignments</h1>
        {/* Your assignment list here */}
      </div>
    </AssignmentGate>
  );
}
```

### Example 3: Show Status in Navigation

```tsx
export function Navbar() {
  const { status, isShortlisted } = useApplicationStatus();

  return (
    <nav>
      <a href="/dashboard">Dashboard</a>
      <a href="/profile">Profile</a>

      {isShortlisted ? (
        <a href="/assignments" className="text-green-600">
          ✓ Assignments
        </a>
      ) : (
        <a href="#" className="text-gray-400 cursor-not-allowed">
          Assignments (Locked)
        </a>
      )}
    </nav>
  );
}
```

### Example 4: Show All Status Details

```tsx
export function ApplicationStatusCard() {
  const { status, data, isShortlisted } = useApplicationStatus();

  return (
    <div className="p-6 border rounded-lg">
      <h2>Application Status</h2>

      <p>
        Status: <strong>{status}</strong>
      </p>

      {data?.appliedDate && <p>Applied: {data.appliedDate}</p>}
      {data?.interviewDate && <p>Interview: {data.interviewDate}</p>}
      {data?.feedback && <p>Feedback: {data.feedback}</p>}

      {isShortlisted && (
        <span className="bg-green-100 text-green-800 px-3 py-1 rounded mt-4">
          You're shortlisted!
        </span>
      )}
    </div>
  );
}
```

## Backend API Integration

### API Function (`src/api/userApi.js`)

```javascript
export const getApplicationStatus = () => {
  return api.get("/users/application-status");
};
```

### Expected Backend Response

```json
{
  "applicationStatus": "shortlisted",
  "appliedDate": "March 9, 2026",
  "interviewDate": "March 15, 2026",
  "feedback": "Great profile! Looking forward to your work."
}
```

## Status Values

| Status        | Meaning                       | Can Access Assignments |
| ------------- | ----------------------------- | ---------------------- |
| `shortlisted` | User passed initial review    | ✅ Yes                 |
| `pending`     | Application under review      | ❌ No                  |
| `rejected`    | Application not selected      | ❌ No                  |
| `unknown`     | Status couldn't be determined | ❌ No                  |

## Implementation in StudentDashboard

```tsx
import { useApplicationStatus } from "../hooks/useApplicationStatus";
import { AssignmentGate } from "../components/AssignmentGate";

export function StudentDashboard() {
  const { status, data, loading } = useApplicationStatus();

  if (loading) {
    return <div>Loading status...</div>;
  }

  return (
    <div>
      <h1>Student Dashboard</h1>

      {/* Always show status */}
      <div className="p-4 bg-blue-50 rounded">
        <h3>Application Status: {status}</h3>
      </div>

      {/* Gate assignments behind status */}
      <AssignmentGate
        fallback={
          <div className="p-4 bg-yellow-50 rounded mt-4">
            <h3>Assignments Locked</h3>
            <p>
              {status === "pending" && "Your application is under review..."}
              {status === "rejected" && "Your application was not selected."}
            </p>
          </div>
        }
      >
        <div className="mt-4">
          <h2>Your Assignments</h2>
          {/* Assignment list */}
        </div>
      </AssignmentGate>

      {/* Show interview date if available */}
      {data?.interviewDate && (
        <div className="p-4 bg-purple-50 rounded mt-4">
          <p>Interview scheduled: {data.interviewDate}</p>
        </div>
      )}
    </div>
  );
}
```

## Automatic Status Checking

The hook runs `useEffect` on component mount to fetch status automatically. No manual setup needed!

```tsx
export function MyComponent() {
  // Status is fetched automatically when component mounts
  const { status } = useApplicationStatus();

  return <div>Status: {status}</div>;
}
```

## Refectching Status

```tsx
const { status, refetch } = useApplicationStatus();

const handleRefresh = () => {
  refetch(); // Re-fetch status from backend
};

return <button onClick={handleRefresh}>Refresh Status</button>;
```

## Error Handling

```tsx
const { status, error, loading } = useApplicationStatus();

if (loading) return <div>Loading...</div>;
if (error) return <div>Error: {error}</div>;

return <div>Status: {status}</div>;
```

## Best Practices

1. **Use AssignmentGate for assignment features** - Don't show assignment UI to rejected users
2. **Show status in dashboard** - Users should see their application status prominently
3. **Handle all 4 statuses** - pending, shortlisted, rejected, unknown
4. **Cache status in context** - Consider moving to AuthContext if fetched frequently
5. **Show helpful messages** - Tell users why assignments are locked

## Files

- ✅ `useApplicationStatus.ts` - Hook to check status
- ✅ `AssignmentGate.tsx` - Component to gate assignments
- ✅ `ApplicationStatusExamples.tsx` - 4 usage examples
- ✅ This guide

## Quick Checklist

- [ ] Backend endpoint returns `applicationStatus` field
- [ ] Use `useApplicationStatus()` to fetch
- [ ] Wrap assignments in `<AssignmentGate>`
- [ ] Show status in student dashboard
- [ ] Handle all 4 status values
- [ ] Show appropriate messages for each status
