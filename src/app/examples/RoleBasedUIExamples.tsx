import { useUserRole } from "../hooks/useUserRole";

/**
 * Example 1: Conditional Rendering Based on Role
 * Show different UI for admin vs student
 */
export function DashboardExample() {
  const { user, isAdmin, isStudent } = useUserRole();

  if (!user) {
    return <div>Please log in</div>;
  }

  return (
    <div>
      <h1>Welcome, {user.name}</h1>
      <p>Role: {user.role}</p>

      {isAdmin && (
        <div className="p-4 bg-blue-100 rounded">
          <h2>Admin Panel</h2>
          <ul>
            <li>Manage Users</li>
            <li>Manage Assignments</li>
            <li>Manage Announcements</li>
          </ul>
        </div>
      )}

      {isStudent && (
        <div className="p-4 bg-green-100 rounded">
          <h2>Student Dashboard</h2>
          <ul>
            <li>View Assignments</li>
            <li>Submit Assignments</li>
            <li>View Profile</li>
          </ul>
        </div>
      )}
    </div>
  );
}

/**
 * Example 2: Show/Hide Specific Features
 */
export function NavigationExample() {
  const { isAdmin } = useUserRole();

  return (
    <nav className="flex gap-4">
      <a href="/dashboard">Dashboard</a>
      <a href="/profile">Profile</a>

      {/* Only show admin link if user is admin */}
      {isAdmin && <a href="/admin/students">Manage Students</a>}
      {isAdmin && <a href="/admin/assignments">Manage Assignments</a>}
    </nav>
  );
}

/**
 * Example 3: Get User Data Directly
 */
export function UserCardExample() {
  const { user, userRole } = useUserRole();

  if (!user) return null;

  const badge = userRole === "admin" ? "🔑 Administrator" : "👤 Student";

  return (
    <div className="p-4 border rounded">
      <p>{badge}</p>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      {user.isShortlisted && <p>✓ Shortlisted</p>}
    </div>
  );
}
