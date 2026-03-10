import { useState, useEffect } from "react";
import {
  getProfile,
  updateProfile,
  getApplicationStatus,
} from "../../api/userApi";
import { useApiError } from "../hooks/useApiError";

/**
 * Example 1: Simple API call on component mount
 */
export function LoadProfileExample() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { handleError } = useApiError();

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      setLoading(true);
      const res = await getProfile();
      console.log("Profile data:", res.data.user);
      setProfile(res.data.user);
      setError(null);
    } catch (err: any) {
      const errorInfo = handleError(err);
      setError(errorInfo?.message || "Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="p-4">Loading profile...</div>;
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded">
        <p className="text-red-700">{error}</p>
        <button
          onClick={loadProfile}
          className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white border rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Your Profile</h2>
      <div className="space-y-3">
        <div>
          <p className="text-gray-600">Name</p>
          <p className="text-lg font-semibold">{profile?.name}</p>
        </div>
        <div>
          <p className="text-gray-600">Email</p>
          <p className="text-lg">{profile?.email}</p>
        </div>
        <div>
          <p className="text-gray-600">ID</p>
          <p className="text-sm text-gray-500">{profile?.id}</p>
        </div>
      </div>
    </div>
  );
}

/**
 * Example 2: Update profile with form submission
 */
export function UpdateProfileFormExample() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    about: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const { handleError } = useApiError();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const res = await updateProfile(formData);
      console.log("Update response:", res.data);
      setSuccess(true);
      setError(null);

      // Optionally reset form
      setTimeout(() => setSuccess(false), 3000);
    } catch (err: any) {
      const errorInfo = handleError(err);
      setError(errorInfo?.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-6 bg-white border rounded-lg"
    >
      <h2 className="text-2xl font-bold">Update Profile</h2>

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded text-red-700">
          {error}
        </div>
      )}

      {success && (
        <div className="p-3 bg-green-50 border border-green-200 rounded text-green-700">
          ✓ Profile updated successfully!
        </div>
      )}

      <div>
        <label className="block text-sm font-medium mb-2">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Your full name"
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="your@email.com"
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">About</label>
        <textarea
          name="about"
          value={formData.about}
          onChange={handleChange}
          placeholder="Tell us about yourself"
          rows={4}
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full px-4 py-2 bg-cyan-600 text-white rounded hover:bg-cyan-700 disabled:opacity-50"
      >
        {loading ? "Updating..." : "Update Profile"}
      </button>
    </form>
  );
}

/**
 * Example 3: Check application status on load
 */
export function CheckApplicationStatusExample() {
  const [status, setStatus] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { handleError } = useApiError();

  useEffect(() => {
    checkStatus();
  }, []);

  const checkStatus = async () => {
    try {
      const res = await getApplicationStatus();
      console.log("Application status:", res.data.applicationStatus);
      setStatus(res.data);
    } catch (err: any) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Checking status...</div>;

  const statusColors = {
    shortlisted: "bg-green-100 text-green-800",
    pending: "bg-yellow-100 text-yellow-800",
    rejected: "bg-red-100 text-red-800",
  };

  const statusColor =
    statusColors[status?.applicationStatus as keyof typeof statusColors] ||
    "bg-gray-100";

  return (
    <div className="p-6 bg-white border rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Application Status</h2>
      <div
        className={`px-4 py-2 rounded inline-block font-semibold ${statusColor}`}
      >
        {status?.applicationStatus?.toUpperCase()}
      </div>
    </div>
  );
}

/**
 * Example 4: Real-world dashboard loading multiple data
 */
export function DashboardWithMultipleAPICalls() {
  const [profile, setProfile] = useState<any>(null);
  const [status, setStatus] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { handleError } = useApiError();

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Load profile
      const profileRes = await getProfile();
      setProfile(profileRes.data.user);
      console.log("Loaded profile:", profileRes.data.user);

      // Check status
      const statusRes = await getApplicationStatus();
      setStatus(statusRes.data);
      console.log("Loaded status:", statusRes.data.applicationStatus);
    } catch (err: any) {
      const errorInfo = handleError(err);
      setError(errorInfo?.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-8 text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-500 mb-4"></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-red-50 border border-red-200 rounded">
        <p className="text-red-700 mb-4">{error}</p>
        <button
          onClick={loadDashboardData}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="p-6 bg-white border rounded-lg">
        <h1 className="text-3xl font-bold mb-2">Welcome, {profile?.name}!</h1>
        <p className="text-gray-600">{profile?.email}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 bg-white border rounded-lg">
          <h2 className="text-xl font-bold mb-4">Profile Information</h2>
          <div className="space-y-2">
            <p>
              <span className="text-gray-600">Name:</span>
              <span className="font-semibold ml-2">{profile?.name}</span>
            </p>
            <p>
              <span className="text-gray-600">Email:</span>
              <span className="font-semibold ml-2">{profile?.email}</span>
            </p>
          </div>
        </div>

        <div className="p-6 bg-white border rounded-lg">
          <h2 className="text-xl font-bold mb-4">Application Status</h2>
          <div
            className={`px-4 py-2 rounded inline-block font-semibold ${
              status?.applicationStatus === "shortlisted"
                ? "bg-green-100 text-green-800"
                : "bg-yellow-100 text-yellow-800"
            }`}
          >
            {status?.applicationStatus?.toUpperCase()}
          </div>
        </div>
      </div>

      <div className="p-6 bg-white border rounded-lg">
        <button
          onClick={loadDashboardData}
          className="px-4 py-2 bg-cyan-600 text-white rounded hover:bg-cyan-700"
        >
          Refresh Data
        </button>
      </div>
    </div>
  );
}
