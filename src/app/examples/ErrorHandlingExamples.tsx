import { useState } from "react";
import { useApiError } from "../hooks/useApiError";
import { getProfile, updateProfile } from "../../api/userApi";

/**
 * Example 1: Basic error handling in form submission
 */
export function UpdateProfileFormExample() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const { handleError } = useApiError();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const formData = new FormData(e.currentTarget as HTMLFormElement);
      const data = Object.fromEntries(formData);

      await updateProfile(data);
      setSuccess(true);
      setError(null);
    } catch (err: any) {
      const errorInfo = handleError(err);
      setError(errorInfo?.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2>Update Profile</h2>

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded text-red-700">
          {error}
        </div>
      )}

      {success && (
        <div className="p-3 bg-green-50 border border-green-200 rounded text-green-700">
          Profile updated successfully!
        </div>
      )}

      <input type="text" name="name" placeholder="Full Name" required />
      <input type="email" name="email" placeholder="Email" required />

      <button
        type="submit"
        disabled={loading}
        className="px-4 py-2 bg-cyan-600 text-white rounded hover:bg-cyan-700 disabled:opacity-50"
      >
        {loading ? "Updating..." : "Update Profile"}
      </button>
    </form>
  );
}

/**
 * Example 2: Fetch data with error handling
 */
export function FetchDataExample() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { handleError } = useApiError();

  const fetchProfile = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await getProfile();
      setData(response.data);
    } catch (err: any) {
      const errorInfo = handleError(err);
      setError(errorInfo?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <button
        onClick={fetchProfile}
        disabled={loading}
        className="px-4 py-2 bg-cyan-600 text-white rounded"
      >
        {loading ? "Loading..." : "Load Profile"}
      </button>

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded">
          {error}
        </div>
      )}

      {data && (
        <div className="p-4 bg-gray-50 rounded">
          <p>Name: {data.name}</p>
          <p>Email: {data.email}</p>
        </div>
      )}
    </div>
  );
}

/**
 * Example 3: Custom error handling for specific status codes
 */
export function CustomErrorHandlingExample() {
  const { handleError } = useApiError();

  const handleCustomError = async () => {
    try {
      // API call would go here
    } catch (err: any) {
      const errorInfo = handleError(err, {
        403: () => {
          console.log("Custom 403 handler");
          alert("You need special permissions for this action");
        },
        404: () => {
          console.log("Custom 404 handler");
          alert("The item you're looking for doesn't exist");
        },
      });
    }
  };

  return (
    <button
      onClick={handleCustomError}
      className="px-4 py-2 bg-cyan-600 text-white rounded"
    >
      Try Custom Error Handling
    </button>
  );
}

/**
 * Example 4: Error boundary component
 */
export function ErrorBoundaryExample({
  children,
}: {
  children: React.ReactNode;
}) {
  const [error, setError] = useState<string | null>(null);
  const { handleError } = useApiError();

  const handleApiError = (err: any) => {
    const errorInfo = handleError(err);
    setError(errorInfo?.message);

    // Auto-hide error after 5 seconds
    setTimeout(() => setError(null), 5000);
  };

  return (
    <div>
      {error && (
        <div className="fixed top-4 right-4 p-4 bg-red-50 border border-red-200 rounded shadow">
          <p className="text-red-700">{error}</p>
        </div>
      )}
      {children}
    </div>
  );
}
