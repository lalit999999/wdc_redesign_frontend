import { useApplicationStatus } from "../hooks/useApplicationStatus";

interface AssignmentGateProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

/**
 * Gate component to show assignments only if user is shortlisted
 * Shows appropriate message if user is not shortlisted
 */
export function AssignmentGate({ children, fallback }: AssignmentGateProps) {
  const { canDoAssignments, status, loading, error } = useApplicationStatus();

  if (loading) {
    return (
      <div className="p-8 text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-500 mb-4"></div>
        <p className="text-muted-foreground">Checking application status...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg">
        <p className="text-red-600 dark:text-red-400">
          Error checking status. Please try again later.
        </p>
      </div>
    );
  }

  if (!canDoAssignments) {
    return (
      fallback || (
        <div className="p-8 bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-800 rounded-lg">
          <h3 className="text-lg font-semibold text-yellow-900 dark:text-yellow-100 mb-2">
            Assignments Not Available
          </h3>
          <p className="text-yellow-800 dark:text-yellow-200">
            {status === "pending" &&
              "Your application is still under review. You'll be able to access assignments once you're shortlisted."}
            {status === "rejected" &&
              "Unfortunately, your application was not selected. Better luck next time!"}
            {status === "unknown" &&
              "We couldn't determine your application status. Please contact support."}
          </p>
        </div>
      )
    );
  }

  return <>{children}</>;
}
