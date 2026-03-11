import { DashboardSidebar } from "../components/DashboardSidebar";
import { Plus, X, Calendar, AlertTriangle } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { createAnnouncement } from "../../api/adminApi";

export function AdminAnnouncements() {
  const { announcements, addAnnouncement } = useAuth();
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [type, setType] = useState("info");
  const [important, setImportant] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCreate = async () => {
    if (!title || !message) {
      setError("Title and message are required");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const now = new Date();
      const dateStr = now.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
      const timeStr = now.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
      const newAnnouncement = {
        title,
        message,
        date: dateStr,
        time: timeStr,
        type,
        important,
      };
      await createAnnouncement(newAnnouncement);
      addAnnouncement(newAnnouncement);
      setTitle("");
      setMessage("");
      setType("info");
      setImportant(false);
      setShowForm(false);
      setError("");
    } catch (error) {
      console.error("Error creating announcement:", error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to create announcement";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const getTypeColor = (t: string) => {
    switch (t) {
      case "success":
        return "border-l-green-500 bg-green-500/5";
      case "warning":
        return "border-l-yellow-500 bg-yellow-500/5";
      default:
        return "border-l-blue-500 bg-blue-500/5";
    }
  };

  return (
    <div className="min-h-screen flex">
      <DashboardSidebar />

      <main className="flex-1 lg:ml-60 pt-14 lg:pt-0">
        <div className="max-w-6xl mx-auto p-4 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <h1 className="text-3xl font-semibold text-foreground">
              Manage Announcements
            </h1>
            <button
              onClick={() => setShowForm(!showForm)}
              className="flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
            >
              {showForm ? (
                <X className="w-5 h-5" />
              ) : (
                <Plus className="w-5 h-5" />
              )}
              {showForm ? "Cancel" : "Create Announcement"}
            </button>
          </div>

          {/* Create Form */}
          {showForm && (
            <div className="mb-8 p-6 bg-card border border-border rounded-lg">
              <h2 className="text-lg font-semibold mb-4 text-foreground">
                New Announcement
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm mb-2 text-foreground">
                    Title
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Announcement title..."
                    className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2 text-foreground">
                    Message
                  </label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={4}
                    placeholder="Write your announcement..."
                    className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground resize-none"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm mb-2 text-foreground">
                      Type
                    </label>
                    <select
                      value={type}
                      onChange={(e) => setType(e.target.value)}
                      className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                    >
                      <option value="info">Information</option>
                      <option value="success">Success</option>
                      <option value="warning">Warning</option>
                    </select>
                  </div>
                  <div className="flex items-end">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={important}
                        onChange={(e) => setImportant(e.target.checked)}
                        className="w-4 h-4 rounded border-border"
                      />
                      <span className="text-sm text-foreground flex items-center gap-1.5">
                        <AlertTriangle className="w-4 h-4 text-yellow-500" />
                        Mark as Important
                      </span>
                    </label>
                  </div>
                </div>
                <button
                  onClick={handleCreate}
                  disabled={!title || !message || loading}
                  className="px-6 py-2.5 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Publishing..." : "Publish Announcement"}
                </button>
                {error && (
                  <div className="mt-3 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                    <p className="text-sm text-red-600">{error}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Announcements List */}
          <div className="space-y-4">
            {announcements.map((announcement) => (
              <div
                key={announcement.id}
                className={`p-6 bg-card border border-border border-l-4 rounded-lg ${getTypeColor(announcement.type)}`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg font-semibold text-foreground">
                      {announcement.title}
                    </h3>
                    {announcement.important && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-red-500 text-white">
                        Important
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-muted-foreground text-right flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>
                      {announcement.date} • {announcement.time}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  {announcement.message}
                </p>
              </div>
            ))}
          </div>

          {announcements.length === 0 && (
            <div className="p-12 bg-card border border-border rounded-lg text-center">
              <p className="text-muted-foreground">
                No announcements yet. Click "Create Announcement" to get
                started.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
