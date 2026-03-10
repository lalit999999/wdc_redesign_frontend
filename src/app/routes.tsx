import { createBrowserRouter, Outlet } from "react-router";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";
import { Home } from "./pages/Home";
import { Team } from "./pages/Team";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { AuthCallback } from "./pages/AuthCallback";
import { StudentDashboard } from "./pages/StudentDashboard";
import { StudentProfile } from "./pages/StudentProfile";
import { StudentFinalSubmission } from "./pages/StudentFinalSubmission";
import { AdminDashboard } from "./pages/AdminDashboard";
import { AdminStudents } from "./pages/AdminStudents";
import { AdminStudentProfile } from "./pages/AdminStudentProfile";
import { AdminAssignments } from "./pages/AdminAssignments";
import { AdminAnnouncements } from "./pages/AdminAnnouncements";
import { AdminSubmissions } from "./pages/AdminSubmissions";
import { NotFound } from "./pages/NotFound";

function RootLayout() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Outlet />
      </AuthProvider>
    </ThemeProvider>
  );
}

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: Home },
      { path: "team", Component: Team },
      { path: "auth-callback", Component: AuthCallback },
      { path: "login", Component: Login },
      { path: "register", Component: Register },
      { path: "dashboard", Component: StudentDashboard },
      { path: "dashboard/profile", Component: StudentProfile },
      { path: "dashboard/final-submission", Component: StudentFinalSubmission },
      { path: "admin", Component: AdminDashboard },
      { path: "admin/students", Component: AdminStudents },
      { path: "admin/students/:id", Component: AdminStudentProfile },
      { path: "admin/assignments", Component: AdminAssignments },
      { path: "admin/announcements", Component: AdminAnnouncements },
      { path: "admin/submissions", Component: AdminSubmissions },
      { path: "*", Component: NotFound },
    ],
  },
]);
