import { DashboardSidebar } from "../components/DashboardSidebar";
import { Loader } from "../components/Loader";
import { useAuth } from "../context/AuthContext";
import {
  Bell,
  FileText,
  Layers,
  Send,
  ArrowRight,
  Calendar,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";

export function StudentDashboard() {
  const {
    user,
    assignments,
    announcements,
    loadingAssignments,
    loadingAnnouncements,
  } = useAuth();
  const [categoryFilter, setCategoryFilter] = useState("All");

  const categories = [
    "All",
    ...Array.from(new Set(assignments.map((a) => a.category))),
  ];

  const filteredAssignments =
    categoryFilter === "All"
      ? assignments
      : assignments.filter((a) => a.category === categoryFilter);

  const stats = [
    {
      label: "Announcements",
      value: announcements.length,
      color: "from-blue-600 to-blue-800",
    },
    {
      label: "Assignments",
      value: assignments.length,
      color: "from-purple-600 to-purple-800",
    },
    {
      label: "Categories",
      value: categories.length - 1,
      color: "from-teal-600 to-teal-800",
    },
    { label: "Submissions", value: 5, color: "from-orange-600 to-orange-800" },
  ];

  return (
    <div className="min-h-screen flex">
      <DashboardSidebar />

      <main className="flex-1 lg:ml-60 pt-14 lg:pt-0">
        <div className="max-w-7xl mx-auto p-4 sm:p-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
            <div>
              <h1 className="text-xl sm:text-2xl font-semibold text-foreground flex items-center gap-2">
                <span>👋</span> Welcome, {user?.name?.toUpperCase()}
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                {user?.email}
              </p>
            </div>
            <div className="flex items-center gap-4 sm:gap-6">
              <div className="text-left sm:text-right">
                <p className="text-xs text-muted-foreground mb-1">Status</p>
                <span
                  className={`px-3 py-1 rounded text-xs font-medium text-white ${
                    user?.applicationStatus === "shortlisted"
                      ? "bg-green-500"
                      : user?.applicationStatus === "rejected"
                        ? "bg-red-500"
                        : "bg-yellow-500"
                  }`}
                >
                  {user?.applicationStatus?.toUpperCase() || "PENDING"}
                </span>
              </div>
              <div className="text-left sm:text-right">
                <p className="text-xs text-muted-foreground mb-1">
                  Profile Completion
                </p>
                <p className="text-xl font-semibold text-foreground">
                  {user?.profileCompletion || 0}%
                </p>
                <div className="w-20 h-1 bg-secondary rounded-full mt-1">
                  <div
                    className="h-full bg-foreground rounded-full"
                    style={{ width: `${user?.profileCompletion || 0}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className={`p-5 rounded-lg bg-gradient-to-br ${stat.color} text-white`}
              >
                <p className="text-3xl font-semibold">{stat.value}</p>
                <p className="text-sm opacity-80 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Main Content: Assignments + Announcements */}
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Assignments Panel */}
            <div className="flex-1 min-w-0">
              <div className="bg-card border border-border rounded-lg overflow-hidden">
                {/* Terminal-style header */}
                <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-secondary/30">
                  <div className="flex gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-red-500" />
                    <span className="w-3 h-3 rounded-full bg-yellow-500" />
                    <span className="w-3 h-3 rounded-full bg-green-500" />
                  </div>
                  <div className="flex items-center gap-2 ml-2">
                    <FileText className="w-4 h-4 text-primary" />
                    <span className="font-semibold text-foreground text-sm">
                      Assignments
                    </span>
                  </div>
                </div>

                {/* Filter */}
                <div className="px-4 py-3 border-b border-border">
                  <div className="flex items-center gap-2">
                    <Layers className="w-4 h-4 text-muted-foreground" />
                    <select
                      value={categoryFilter}
                      onChange={(e) => setCategoryFilter(e.target.value)}
                      className="px-3 py-1.5 bg-background border border-border rounded text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                    >
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Assignment Cards Grid */}
                {loadingAssignments ? (
                  <div className="p-4">
                    <Loader />
                  </div>
                ) : (
                  <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[540px] overflow-y-auto">
                    {filteredAssignments.map((assignment, index) => (
                      <div
                        key={assignment._id || assignment.id || index}
                        className="p-4 bg-background border border-border rounded-lg hover:border-primary/40 transition-colors"
                      >
                        <h3 className="font-semibold text-foreground mb-2 text-sm">
                          {assignment.title}
                        </h3>
                        <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                          {assignment.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1.5 text-xs text-yellow-500">
                            <Calendar className="w-3.5 h-3.5" />
                            <span>Due: {assignment.deadline}</span>
                          </div>
                          <Link
                            to="/dashboard/final-submission"
                            className="flex items-center gap-1 text-xs text-primary hover:underline"
                          >
                            View <ArrowRight className="w-3 h-3" />
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Announcements Panel */}
            <div className="w-full lg:w-80 lg:shrink-0">
              <div className="bg-card border border-border rounded-lg overflow-hidden">
                {/* Terminal-style header */}
                <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-secondary/30">
                  <div className="flex gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-red-500" />
                    <span className="w-3 h-3 rounded-full bg-yellow-500" />
                    <span className="w-3 h-3 rounded-full bg-green-500" />
                  </div>
                  <div className="flex items-center gap-2 ml-2">
                    <Bell className="w-4 h-4 text-primary" />
                    <span className="font-semibold text-foreground text-sm">
                      Announcements
                    </span>
                  </div>
                </div>

                {/* Announcement Items */}
                {loadingAnnouncements ? (
                  <div className="p-4">
                    <Loader />
                  </div>
                ) : (
                  <div className="divide-y divide-border max-h-[540px] overflow-y-auto">
                    {announcements.map((announcement, index) => (
                      <div
                        key={announcement._id || announcement.id || index}
                        className="p-4 hover:bg-accent/30 transition-colors"
                      >
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <h4 className="font-semibold text-foreground text-sm flex items-center gap-1.5">
                            <span>●</span> {announcement.title}
                          </h4>
                          {announcement.important && (
                            <span className="shrink-0 px-2 py-0.5 rounded text-[10px] font-medium bg-red-500 text-white">
                              Important
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                          {announcement.message}
                        </p>
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <Calendar className="w-3 h-3" />
                          <span>{announcement.date}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
