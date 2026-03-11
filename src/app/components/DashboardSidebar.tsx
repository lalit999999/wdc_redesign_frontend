import { Link, useLocation, useNavigate } from "react-router";
import {
  Home,
  User,
  FileText,
  Bell,
  LogOut,
  Users,
  ClipboardList,
  MessageSquare,
  FileCheck,
  Menu,
  X,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";

export function DashboardSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Get role from context or fallback to localStorage to handle race conditions
  const getUserRole = () => {
    console.log(user);

    if (user?.role) {
      return user.role;
    }
    try {
      const userStr = localStorage.getItem("user");
      if (userStr) {
        const userData = JSON.parse(userStr);
        return userData.role;
      }
    } catch (error) {
      console.error("Failed to parse user from localStorage:", error);
    }
    return "student";
  };

  const userRole = getUserRole();

  const handleProfileClick = () => {
    if (userRole === "admin") {
      navigate(`/admin/students/${user._id}`);
    } else {
      navigate("/dashboard/profile");
    }
  };

  const isActive = (path: string) => location.pathname === path;

  // Close sidebar on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const studentLinks = [
    { path: "/dashboard", label: "Home", icon: Home },
    { path: "/dashboard/profile", label: "Profile", icon: User },
    {
      path: "/dashboard/final-submission",
      label: "Final Submission",
      icon: FileCheck,
    },
  ];

  const adminLinks = [
    { path: "/admin", label: "Dashboard", icon: Home },
    { path: "/admin/students", label: "Students", icon: Users },
    { path: "/admin/assignments", label: "Assignments", icon: ClipboardList },
    {
      path: "/admin/announcements",
      label: "Announcements",
      icon: MessageSquare,
    },
    { path: "/admin/submissions", label: "Submissions", icon: FileCheck },
  ];

  const links = userRole === "admin" ? adminLinks : studentLinks;

  const sidebarContent = (
    <>
      <div className="h-16 flex items-center px-6 border-b border-sidebar-border">
        <Link
          to={userRole === "admin" ? "/admin" : "/dashboard"}
          className="flex items-center gap-2 text-sidebar-foreground hover:opacity-80 transition-opacity"
        >
          <img
            src="https://res.cloudinary.com/dsmyka9cr/image/upload/v1770575382/nitplogo_je6ekp.png"
            alt="NITP Logo"
            className="w-8 h-8 object-contain"
          />
          <div>
            <span className="font-semibold block leading-tight">WDC</span>
            <span className="text-xs text-muted-foreground">
              Induction Portal
            </span>
          </div>
        </Link>
        {/* Close button for mobile */}
        <button
          onClick={() => setMobileOpen(false)}
          className="ml-auto lg:hidden p-1 rounded hover:bg-sidebar-accent/50 transition-colors"
          aria-label="Close sidebar"
        >
          <X className="w-5 h-5 text-sidebar-foreground" />
        </button>
      </div>

      <nav className="flex-1 py-6 px-3">
        <div className="space-y-1">
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`
                  flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-sm
                  ${
                    isActive(link.path)
                      ? "bg-sidebar-accent text-sidebar-accent-foreground"
                      : "text-sidebar-foreground hover:bg-sidebar-accent/50"
                  }
                `}
              >
                <Icon className="w-5 h-5" />
                {link.label}
              </Link>
            );
          })}
        </div>

        <div className="mt-6 pt-6 border-t border-sidebar-border">
          <button
            onClick={() => {
              logout();
              navigate("/login");
            }}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-red-400 hover:bg-red-500/10 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Log Out
          </button>
        </div>
      </nav>

      {/* User info at bottom */}
      <div className="p-3 border-t border-sidebar-border">
        <button
          onClick={handleProfileClick}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-sidebar-accent/50 transition-colors text-left"
        >
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs text-primary font-medium flex-shrink-0">
            {user?.fullName?.charAt(0) || "U"}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-sidebar-foreground truncate">
              {user?.fullName}
            </p>
            <p className="text-xs text-muted-foreground truncate">
              {user?.email}
            </p>
          </div>
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile top bar */}
      <div className="fixed top-0 left-0 right-0 z-40 h-14 bg-sidebar border-b border-sidebar-border flex items-center px-4 lg:hidden">
        <button
          onClick={() => setMobileOpen(true)}
          className="p-2 rounded-lg hover:bg-sidebar-accent/50 transition-colors"
          aria-label="Open menu"
        >
          <Menu className="w-5 h-5 text-sidebar-foreground" />
        </button>
        <Link
          to="/"
          className="flex items-center gap-2 ml-3 text-sidebar-foreground"
        >
          <img
            src="https://res.cloudinary.com/dsmyka9cr/image/upload/v1770575382/nitplogo_je6ekp.png"
            alt="NITP Logo"
            className="w-5 h-5 object-contain"
          />
          <span className="font-semibold text-sm">WDC Portal</span>
        </Link>
      </div>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/50 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar - desktop: fixed left, mobile: slide-in overlay */}
      <aside
        className={`
          fixed left-0 top-0 bottom-0 w-60 border-r border-sidebar-border bg-sidebar flex flex-col z-50
          transition-transform duration-300 ease-in-out
          lg:translate-x-0
          ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {sidebarContent}
      </aside>
    </>
  );
}
