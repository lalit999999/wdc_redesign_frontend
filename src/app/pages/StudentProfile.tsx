import { DashboardSidebar } from "../components/DashboardSidebar";
import { Github, Linkedin, Mail, Phone } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { updateProfile } from "../../api/userApi";
import { useApiError } from "../hooks/useApiError";

export function StudentProfile() {
  const { user } = useAuth();
  const { handleError } = useApiError();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    github: "",
    linkedin: "",
    phone: "",
    about: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Get user data from localStorage in case AuthContext doesn't have it
  const getUserData = () => {
    if (user?.name && user?.email) {
      return {
        fullName: user.name,
        email: user.email,
        ...user,
      };
    }

    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      return JSON.parse(storedUser);
    }

    return null;
  };

  useEffect(() => {
    const userData = getUserData();
    if (userData) {
      setFormData({
        fullName: userData.fullName || userData.name || "",
        email: userData.email || "",
        github: userData.github || "",
        linkedin: userData.linkedin || "",
        phone: userData.phone || "",
        about: userData.about || "",
      });
    }
  }, [user]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // Map frontend field names to backend field names
      const updateData = {
        fullName: formData.fullName,
        mobileNumber: formData.phone,
        githubLink: formData.github,
        linkedinLink: formData.linkedin,
        about: formData.about,
      };

      const response = await updateProfile(updateData);
      console.log("Profile updated:", response.data);

      // Also update localStorage
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const user = JSON.parse(storedUser);
        const updated = {
          ...user,
          fullName: formData.fullName,
          phone: formData.phone,
          github: formData.github,
          linkedin: formData.linkedin,
          mobileNumber: formData.phone,
          githubLink: formData.github,
          linkedinLink: formData.linkedin,
          about: formData.about,
        };
        localStorage.setItem("user", JSON.stringify(updated));
      }

      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000); // Hide success message after 3 seconds
    } catch (err: any) {
      const errorInfo = handleError(err);
      setError(errorInfo?.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      <DashboardSidebar />

      <main className="flex-1 lg:ml-60 pt-14 lg:pt-0">
        <div className="max-w-4xl mx-auto p-4 sm:p-8">
          <h1 className="text-3xl font-semibold mb-8 text-foreground">
            My Profile
          </h1>

          <div className="space-y-6">
            <div className="p-6 bg-card border border-border rounded-lg">
              <h2 className="text-lg font-semibold mb-4 text-foreground">
                Personal Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-2 text-foreground">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2 text-foreground">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                  />
                </div>
              </div>
            </div>

            <div className="p-6 bg-card border border-border rounded-lg">
              <h2 className="text-lg font-semibold mb-4 text-foreground">
                Contact Information
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm mb-2 text-foreground">
                    <Phone className="w-4 h-4 inline mr-2" />
                    Mobile Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 9876543210"
                    className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                  />
                </div>
              </div>
            </div>

            <div className="p-6 bg-card border border-border rounded-lg">
              <h2 className="text-lg font-semibold mb-4 text-foreground">
                Social Links
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm mb-2 text-foreground">
                    <Github className="w-4 h-4 inline mr-2" />
                    GitHub Profile
                  </label>
                  <input
                    type="url"
                    name="github"
                    value={formData.github}
                    onChange={handleChange}
                    placeholder="https://github.com/username"
                    className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2 text-foreground">
                    <Linkedin className="w-4 h-4 inline mr-2" />
                    LinkedIn Profile
                  </label>
                  <input
                    type="url"
                    name="linkedin"
                    value={formData.linkedin}
                    onChange={handleChange}
                    placeholder="https://linkedin.com/in/username"
                    className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                  />
                </div>
              </div>
            </div>

            <div className="p-6 bg-card border border-border rounded-lg">
              <h2 className="text-lg font-semibold mb-4 text-foreground">
                About
              </h2>
              <textarea
                name="about"
                value={formData.about}
                onChange={handleChange}
                rows={6}
                placeholder="Tell us about yourself, your skills, and why you want to join WDC..."
                className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground resize-none"
              />
            </div>

            <div className="flex flex-col gap-4">
              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                  {error}
                </div>
              )}

              {success && (
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-700">
                  ✓ Profile updated successfully!
                </div>
              )}

              <div className="flex justify-end">
                <button
                  onClick={handleSave}
                  disabled={loading}
                  className="px-6 py-2.5 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                >
                  {loading ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
