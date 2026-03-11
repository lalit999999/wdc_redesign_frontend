import { DashboardSidebar } from "../components/DashboardSidebar";
import { Loader } from "../components/Loader";
import { useAuth } from "../context/AuthContext";
import { Bell } from "lucide-react";

export function StudentAnnouncements() {
  const { announcements, loadingAnnouncements } = useAuth();

  const getTypeColor = (type: string) => {
    switch (type) {
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
        <div className="max-w-4xl mx-auto p-4 sm:p-8">
          <div className="flex items-center gap-3 mb-8">
            <Bell className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-semibold text-foreground">
              Announcements
            </h1>
          </div>

          {loadingAnnouncements ? (
            <Loader />
          ) : (
            <div className="space-y-4">
              {announcements.map((announcement, index) => (
                <div
                  key={announcement._id || announcement.id || index}
                  className={`p-6 bg-card border border-border border-l-4 rounded-lg ${getTypeColor(announcement.type)}`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-semibold text-foreground">
                      {announcement.title}
                    </h3>
                    <div className="text-xs text-muted-foreground text-right">
                      <div>{announcement.date}</div>
                      <div>{announcement.time}</div>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {announcement.message}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
