import { useApplicationStatus } from "../hooks/useApplicationStatus";
import { AssignmentGate } from "../components/AssignmentGate";

/**
 * Example 1: Check status and show conditional UI
 */
export function ApplicationStatusExample() {
  const { status, data, isShortlisted } = useApplicationStatus();

  return (
    <div className="p-6 bg-gray-50 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Your Application Status</h2>

      <div className="space-y-4">
        <div className="p-4 bg-white border rounded">
          <p className="text-gray-600">Current Status</p>
          <p className="text-2xl font-bold mt-1">
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </p>
        </div>

        {data?.appliedDate && (
          <div className="p-4 bg-white border rounded">
            <p className="text-gray-600">Applied Date</p>
            <p className="text-lg font-semibold mt-1">{data.appliedDate}</p>
          </div>
        )}

        {data?.interviewDate && (
          <div className="p-4 bg-white border rounded">
            <p className="text-gray-600">Interview Date</p>
            <p className="text-lg font-semibold mt-1">{data.interviewDate}</p>
          </div>
        )}

        {data?.feedback && (
          <div className="p-4 bg-blue-50 border border-blue-200 rounded">
            <p className="text-gray-600">Feedback</p>
            <p className="mt-1">{data.feedback}</p>
          </div>
        )}

        {isShortlisted && (
          <div className="p-4 bg-green-50 border border-green-200 rounded">
            <p className="text-green-700 font-semibold">
              ✓ You're shortlisted! You can now access assignments.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * Example 2: Gate assignments behind status check
 */
export function StudentAssignmentsWithGate() {
  return (
    <AssignmentGate>
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Your Assignments</h2>
        <p className="text-gray-600">
          You have 3 active assignments to complete.
        </p>
        {/* List of assignments here */}
      </div>
    </AssignmentGate>
  );
}

/**
 * Example 3: Conditional navigation based on status
 */
export function NavigationWithStatus() {
  const { isShortlisted } = useApplicationStatus();

  return (
    <nav className="flex flex-col gap-2">
      <a href="/dashboard" className="p-2 hover:bg-gray-100 rounded">
        Dashboard
      </a>
      <a href="/dashboard/profile" className="p-2 hover:bg-gray-100 rounded">
        Profile
      </a>

      {/* Only show assignments link if shortlisted */}
      {isShortlisted && (
        <a
          href="/dashboard/assignments"
          className="p-2 hover:bg-gray-100 rounded bg-green-50"
        >
          📝 Assignments (Available)
        </a>
      )}

      {!isShortlisted && (
        <a
          href="#"
          className="p-2 rounded text-gray-400 cursor-not-allowed"
          title="Available after shortlisting"
        >
          📝 Assignments (Locked)
        </a>
      )}
    </nav>
  );
}

/**
 * Example 4: Conditional badge/indicator
 */
export function ApplicationStatusBadge() {
  const { status, isShortlisted } = useApplicationStatus();

  const statusColors = {
    shortlisted: "bg-green-100 text-green-800",
    pending: "bg-yellow-100 text-yellow-800",
    rejected: "bg-red-100 text-red-800",
    unknown: "bg-gray-100 text-gray-800",
  };

  const statusEmoji = {
    shortlisted: "✓",
    pending: "⏳",
    rejected: "✗",
    unknown: "?",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-sm font-semibold ${statusColors[status]}`}
    >
      {statusEmoji[status]} {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}
