import React, { createContext, useContext, useState, useEffect } from "react";
import { getAssignments, submitAssignment } from "../../api/assignmentApi";
import { getAnnouncements } from "../../api/announcementApi";
import { getProfile } from "../../api/userApi";
import { getStudents, approveUser, rejectUser } from "../../api/adminApi";

type UserRole = "student" | "admin";

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  isShortlisted?: boolean;
  // Additional fields from backend
  fullName?: string;
  applicationStatus?: string;
  profileCompletion?: number;
  createdAt?: string;
  phone?: string;
  github?: string;
  linkedin?: string;
  about?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  students: StudentData[];
  updateStudentStatus: (id: number, status: string) => Promise<void>;
  addStudent: (student: Omit<StudentData, "id">) => void;
  addStudents: (students: Omit<StudentData, "id">[]) => void;
  refetchStudents: () => Promise<void>;
  assignments: AssignmentData[];
  addAssignment: (assignment: Omit<AssignmentData, "id">) => void;
  refetchAssignments: () => Promise<void>;
  announcements: AnnouncementData[];
  addAnnouncement: (announcement: Omit<AnnouncementData, "id">) => void;
  refetchAnnouncements: () => Promise<void>;
  loadingAssignments: boolean;
  loadingAnnouncements: boolean;
  loadingStudents: boolean;
}

export interface StudentData {
  id: number;
  name: string;
  email: string;
  branch: string;
  year: string;
  status: string;
  profileCompletion: number;
  appliedDate: string;
  phone: string;
  github: string;
  linkedin: string;
  about: string;
  resume: string;
}

export interface AssignmentData {
  id?: string | number;
  _id?: string;
  title: string;
  description: string;
  deadline: string;
  category: string;
  status?: string;
  createdBy?: string;
  createdAt?: string;
}

export interface AnnouncementData {
  id?: string | number;
  _id?: string;
  title: string;
  message?: string;
  description?: string;
  date?: string;
  time?: string;
  type?: string;
  important?: boolean;
  createdAt?: string;
}

const initialStudents: StudentData[] = [];

const initialAssignments: AssignmentData[] = [];

const initialAnnouncements: AnnouncementData[] = [];

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [students, setStudents] = useState<StudentData[]>(initialStudents);
  const [assignments, setAssignments] =
    useState<AssignmentData[]>(initialAssignments);
  const [announcements, setAnnouncements] =
    useState<AnnouncementData[]>(initialAnnouncements);
  const [loadingAssignments, setLoadingAssignments] = useState(true);
  const [loadingAnnouncements, setLoadingAnnouncements] = useState(true);
  const [loadingStudents, setLoadingStudents] = useState(true);

  // Initialize user from localStorage on app load
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userStr = localStorage.getItem("user");

    if (token && userStr) {
      try {
        const userData = JSON.parse(userStr);
        setUser(userData);
        console.log("User loaded from localStorage:", userData);
      } catch (error) {
        console.error("Failed to parse user from localStorage:", error);
        localStorage.removeItem("user");
      }
    }
  }, []);

  // Fetch assignments from backend when user is authenticated
  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        setLoadingAssignments(true);
        const token = localStorage.getItem("token");
        if (!token) {
          console.log("No token found, using initial assignments");
          return;
        }

        const response = await getAssignments();
        if (
          response.data?.success &&
          Array.isArray(response.data.assignments)
        ) {
          console.log(
            "Assignments fetched from backend:",
            response.data.assignments,
          );
          setAssignments(response.data.assignments);
        }
      } catch (error) {
        console.error("Failed to fetch assignments:", error);
        // Keep initial assignments on error
      } finally {
        setLoadingAssignments(false);
      }
    };

    fetchAssignments();
  }, []);

  // Fetch announcements from backend when user is authenticated
  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        setLoadingAnnouncements(true);
        const token = localStorage.getItem("token");
        if (!token) {
          console.log("No token found, using initial announcements");
          return;
        }

        const response = await getAnnouncements();
        if (
          response.data?.success &&
          Array.isArray(response.data.announcements)
        ) {
          console.log(
            "Announcements fetched from backend:",
            response.data.announcements,
          );
          setAnnouncements(response.data.announcements);
        }
      } catch (error) {
        console.error("Failed to fetch announcements:", error);
        // Keep initial announcements on error
      } finally {
        setLoadingAnnouncements(false);
      }
    };

    fetchAnnouncements();
  }, []);

  // Fetch students from backend when user is authenticated (admin only)
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setLoadingStudents(true);
        const token = localStorage.getItem("token");
        const userStr = localStorage.getItem("user");

        // Only fetch students if user is admin
        if (!token || !userStr) {
          console.log("No token or user found, skipping students fetch");
          setLoadingStudents(false);
          return;
        }

        try {
          const userData = JSON.parse(userStr);
          if (userData.role !== "admin") {
            console.log("User is not admin, skipping students fetch");
            setLoadingStudents(false);
            return;
          }
        } catch (e) {
          console.log("Could not parse user role, skipping students fetch");
          setLoadingStudents(false);
          return;
        }

        const response = await getStudents();
        let parsedStudents: StudentData[] = [];

        if (response.data?.success && Array.isArray(response.data.users)) {
          parsedStudents = response.data.users.map((user: any) => ({
            id: user._id || user.id || 0,
            name:
              user.fullName ||
              user.name ||
              user.email?.split("@")[0] ||
              "Unknown",
            email: user.email || "",
            branch: user.branch || "N/A",
            year: user.year || "N/A",
            status: user.applicationStatus || user.status || "Pending",
            profileCompletion: user.profileCompletion || 0,
            appliedDate: user.appliedDate || user.createdAt || "N/A",
            phone: user.phone || "",
            github: user.github || "",
            linkedin: user.linkedin || "",
            about: user.about || "",
            resume: user.resume || "",
          }));
        } else if (Array.isArray(response.data)) {
          parsedStudents = response.data.map((user: any) => ({
            id: user._id || user.id || 0,
            name:
              user.fullName ||
              user.name ||
              user.email?.split("@")[0] ||
              "Unknown",
            email: user.email || "",
            branch: user.branch || "N/A",
            year: user.year || "N/A",
            status: user.applicationStatus || user.status || "Pending",
            profileCompletion: user.profileCompletion || 0,
            appliedDate: user.appliedDate || user.createdAt || "N/A",
            phone: user.phone || "",
            github: user.github || "",
            linkedin: user.linkedin || "",
            about: user.about || "",
            resume: user.resume || "",
          }));
        }

        console.log("Students fetched from backend:", parsedStudents);
        setStudents(parsedStudents);
      } catch (error) {
        console.error("Failed to fetch students:", error);
        // Keep initial students on error
      } finally {
        setLoadingStudents(false);
      }
    };

    fetchStudents();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const token = localStorage.getItem("token");
      const userStr = localStorage.getItem("user");

      if (token && userStr) {
        const userData = JSON.parse(userStr);
        setUser(userData);
        console.log("User logged in:", userData);
      } else {
        console.error("No token or user data found in localStorage");
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const logout = () => {
    // Clear user state
    setUser(null);

    // Clear all user-related data
    setStudents([]);
    setAssignments([]);
    setAnnouncements([]);

    // Clear localStorage completely
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.clear(); // Clear all remaining user data
  };

  const refetchAssignments = async () => {
    try {
      const response = await getAssignments();
      if (response.data?.success && Array.isArray(response.data.assignments)) {
        console.log(
          "Assignments refreshed from backend:",
          response.data.assignments,
        );
        setAssignments(response.data.assignments);
      }
    } catch (error) {
      console.error("Failed to refetch assignments:", error);
    }
  };

  const refetchAnnouncements = async () => {
    try {
      const response = await getAnnouncements();
      if (
        response.data?.success &&
        Array.isArray(response.data.announcements)
      ) {
        console.log(
          "Announcements refreshed from backend:",
          response.data.announcements,
        );
        setAnnouncements(response.data.announcements);
      }
    } catch (error) {
      console.error("Failed to refetch announcements:", error);
    }
  };

  const refetchStudents = async () => {
    try {
      const response = await getStudents();
      let parsedStudents: StudentData[] = [];

      if (response.data?.success && Array.isArray(response.data.users)) {
        parsedStudents = response.data.users.map((user: any) => ({
          id: user._id || user.id || 0,
          name:
            user.fullName ||
            user.name ||
            user.email?.split("@")[0] ||
            "Unknown",
          email: user.email || "",
          branch: user.branch || "N/A",
          year: user.year || "N/A",
          status: user.applicationStatus || user.status || "Pending",
          profileCompletion: user.profileCompletion || 0,
          appliedDate: user.appliedDate || user.createdAt || "N/A",
          phone: user.phone || "",
          github: user.github || "",
          linkedin: user.linkedin || "",
          about: user.about || "",
          resume: user.resume || "",
        }));
      } else if (Array.isArray(response.data)) {
        parsedStudents = response.data.map((user: any) => ({
          id: user._id || user.id || 0,
          name:
            user.fullName ||
            user.name ||
            user.email?.split("@")[0] ||
            "Unknown",
          email: user.email || "",
          branch: user.branch || "N/A",
          year: user.year || "N/A",
          status: user.applicationStatus || user.status || "Pending",
          profileCompletion: user.profileCompletion || 0,
          appliedDate: user.appliedDate || user.createdAt || "N/A",
          phone: user.phone || "",
          github: user.github || "",
          linkedin: user.linkedin || "",
          about: user.about || "",
          resume: user.resume || "",
        }));
      }

      console.log("Students refreshed from backend:", parsedStudents);
      setStudents(parsedStudents);
    } catch (error) {
      console.error("Failed to refetch students:", error);
    }
  };

  const updateStudentStatus = async (id: number, status: string) => {
    try {
      // Update local state optimistically
      setStudents((prev) =>
        prev.map((s) => (s.id === id ? { ...s, status } : s)),
      );

      // Call the appropriate API endpoint
      if (status === "Shortlisted") {
        await approveUser(id);
        console.log(`Student ${id} approved (shortlisted)`);
      } else if (status === "Rejected") {
        await rejectUser(id);
        console.log(`Student ${id} rejected`);
      }

      // Refetch students to ensure consistency with backend
      await refetchStudents();
    } catch (error) {
      console.error("Error updating student status:", error);
      // Revert local state on error
      await refetchStudents();
      throw error;
    }
  };

  const addStudent = (student: Omit<StudentData, "id">) => {
    setStudents((prev) => [
      { ...student, id: Math.max(...prev.map((s) => s.id), 0) + 1 },
      ...prev,
    ]);
  };

  const addStudents = (studentsToAdd: Omit<StudentData, "id">[]) => {
    setStudents((prev) => {
      let maxId = Math.max(...prev.map((s) => s.id), 0);
      const newStudents = studentsToAdd.map((student) => ({
        ...student,
        id: ++maxId,
      }));
      return [...newStudents, ...prev];
    });
  };

  const addAssignment = (assignment: Omit<AssignmentData, "id">) => {
    setAssignments((prev) => {
      const maxId = prev.reduce((max, a) => {
        const id = typeof a.id === "number" ? a.id : 0;
        return Math.max(max, id);
      }, 0);
      return [{ ...assignment, id: maxId + 1 }, ...prev];
    });
  };

  const addAnnouncement = (announcement: Omit<AnnouncementData, "id">) => {
    setAnnouncements((prev) => {
      const maxId = prev.reduce((max, a) => {
        const id = typeof a.id === "number" ? a.id : 0;
        return Math.max(max, id);
      }, 0);
      return [{ ...announcement, id: maxId + 1 }, ...prev];
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!user,
        students,
        updateStudentStatus,
        addStudent,
        addStudents,
        refetchStudents,
        assignments,
        addAssignment,
        refetchAssignments,
        announcements,
        addAnnouncement,
        refetchAnnouncements,
        loadingAssignments,
        loadingAnnouncements,
        loadingStudents,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
