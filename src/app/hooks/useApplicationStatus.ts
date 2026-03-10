import { useState, useEffect } from "react";
import { getApplicationStatus } from "../../api/userApi";

export type ApplicationStatus =
  | "shortlisted"
  | "pending"
  | "rejected"
  | "unknown";

interface ApplicationStatusData {
  applicationStatus: ApplicationStatus;
  appliedDate?: string;
  feedback?: string;
  interviewDate?: string;
}

export function useApplicationStatus() {
  const [status, setStatus] = useState<ApplicationStatus>("unknown");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<ApplicationStatusData | null>(null);

  useEffect(() => {
    fetchApplicationStatus();
  }, []);

  const fetchApplicationStatus = async () => {
    try {
      setLoading(true);
      const response = await getApplicationStatus();

      const applicationStatus = response.data?.applicationStatus || "unknown";
      setStatus(applicationStatus);
      setData(response.data);
      setError(null);
    } catch (err) {
      console.error("Failed to fetch application status:", err);
      setStatus("unknown");
      setError(err instanceof Error ? err.message : "Failed to fetch status");
    } finally {
      setLoading(false);
    }
  };

  return {
    status,
    loading,
    error,
    data,
    isShortlisted: status === "shortlisted",
    canDoAssignments: status === "shortlisted",
    refetch: fetchApplicationStatus,
  };
}
