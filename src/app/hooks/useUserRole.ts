import { useAuth } from "./AuthContext";

export function useUserRole() {
  const { user } = useAuth();

  return {
    user,
    isAdmin: user?.role === "admin",
    isStudent: user?.role === "student",
    isAuthenticated: !!user,
    userRole: user?.role || null,
  };
}
