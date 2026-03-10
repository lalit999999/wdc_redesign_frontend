import React, { createContext, useContext, useState, useEffect } from "react";

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
  updateStudentStatus: (id: number, status: string) => void;
  assignments: AssignmentData[];
  addAssignment: (assignment: Omit<AssignmentData, "id">) => void;
  announcements: AnnouncementData[];
  addAnnouncement: (announcement: Omit<AnnouncementData, "id">) => void;
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
  id: number;
  title: string;
  description: string;
  deadline: string;
  category: string;
  status: string;
}

export interface AnnouncementData {
  id: number;
  title: string;
  message: string;
  date: string;
  time: string;
  type: string;
  important: boolean;
}

const initialStudents: StudentData[] = [
  {
    id: 1,
    name: "Amit Kumar",
    email: "amit.kumar@nitp.ac.in",
    branch: "CSE",
    year: "2nd Year",
    status: "Pending",
    profileCompletion: 85,
    appliedDate: "March 9, 2026",
    phone: "+91 9876543210",
    github: "https://github.com/amitkumar",
    linkedin: "https://linkedin.com/in/amitkumar",
    about: "Passionate web developer with experience in React and Node.js",
    resume: "resume_amit.pdf",
  },
  {
    id: 2,
    name: "Neha Singh",
    email: "neha.singh@nitp.ac.in",
    branch: "ECE",
    year: "1st Year",
    status: "Shortlisted",
    profileCompletion: 100,
    appliedDate: "March 8, 2026",
    phone: "+91 9876543211",
    github: "https://github.com/nehasingh",
    linkedin: "https://linkedin.com/in/nehasingh",
    about: "Full-stack developer interested in cloud computing and DevOps",
    resume: "resume_neha.pdf",
  },
  {
    id: 3,
    name: "Rohit Sharma",
    email: "rohit.sharma@nitp.ac.in",
    branch: "CSE",
    year: "2nd Year",
    status: "Pending",
    profileCompletion: 70,
    appliedDate: "March 8, 2026",
    phone: "+91 9876543212",
    github: "https://github.com/rohitsharma",
    linkedin: "https://linkedin.com/in/rohitsharma",
    about: "Backend developer focusing on microservices architecture",
    resume: "resume_rohit.pdf",
  },
  {
    id: 4,
    name: "Pooja Patel",
    email: "pooja.patel@nitp.ac.in",
    branch: "IT",
    year: "1st Year",
    status: "Shortlisted",
    profileCompletion: 95,
    appliedDate: "March 7, 2026",
    phone: "+91 9876543213",
    github: "https://github.com/poojapatel",
    linkedin: "https://linkedin.com/in/poojapatel",
    about: "UI/UX enthusiast with strong frontend development skills",
    resume: "resume_pooja.pdf",
  },
  {
    id: 5,
    name: "Karthik Reddy",
    email: "karthik.reddy@nitp.ac.in",
    branch: "CSE",
    year: "2nd Year",
    status: "Rejected",
    profileCompletion: 60,
    appliedDate: "March 7, 2026",
    phone: "+91 9876543214",
    github: "https://github.com/karthikreddy",
    linkedin: "https://linkedin.com/in/karthikreddy",
    about: "Interested in web technologies and open source contributions",
    resume: "resume_karthik.pdf",
  },
];

const initialAssignments: AssignmentData[] = [
  {
    id: 1,
    title: "AWS Deployment",
    description:
      "Action: Send a confirmation note regarding your preparation for this task.",
    deadline: "12th Mar 2026",
    category: "DevOps",
    status: "active",
  },
  {
    id: 2,
    title: "Schema Redesign",
    description:
      "Schema Redesign: Analyze the Faculty API data and design a robust MySQL schema. • Requirements: Normalize to 3NF (Third Normal Form) and ensure proper Indexing/Foreign Keys.",
    deadline: "12th Mar 2026",
    category: "Database",
    status: "active",
  },
  {
    id: 3,
    title: "Admin Panel UI",
    description:
      "Prototype distinct views for Faculty vs. Super Admin based on the Full Stack requirements.",
    deadline: "12th Mar 2026",
    category: "Frontend",
    status: "active",
  },
  {
    id: 4,
    title: "Prototypes",
    description:
      "Redesign the NIT Patna Home Page. Redesign the Department layout and inner pages (Faculty list, Labs).",
    deadline: "12th Mar 2023",
    category: "Design",
    status: "active",
  },
  {
    id: 5,
    title: "Admin Panel (Role-Based Access Control)",
    description:
      "Create a secure Admin Panel with distinct roles: 1. Faculty (Role: Can manage/update their own profile only. 2. Super Admin Role: Full access to all modules. Required Modules: Manage Faculty...",
    deadline: "12th Mar 2026",
    category: "Backend",
    status: "active",
  },
  {
    id: 6,
    title: "WDC Platform Redesign",
    description:
      "Redesign the existing WDC platform interface (Backend + Frontend).",
    deadline: "12th Mar 2025",
    category: "Full Stack",
    status: "active",
  },
];

const initialAnnouncements: AnnouncementData[] = [
  {
    id: 1,
    title: "Regarding Final Assignment...",
    message:
      "You may submit any number of assignments, and we will consider your complete profile. The deadline for final...",
    date: "7th Feb 2026",
    time: "10:30 AM",
    type: "info",
    important: true,
  },
  {
    id: 2,
    title: "🚨 Profile Review Update 🚨",
    message:
      "Core Members have started reviewing profiles. Please make sure you have completed the following: 📋 Complete your...",
    date: "27th Jan 2026",
    time: "3:45 PM",
    type: "warning",
    important: true,
  },
  {
    id: 3,
    title: "Enable View Access for Resume...",
    message:
      "We request viewership access to be enabled for all @nitp.ac.in email IDs for the Resume Drive created for We...",
    date: "22nd Jan 2026",
    time: "9:00 AM",
    type: "info",
    important: true,
  },
  {
    id: 4,
    title: "WDC Induction Timeline – 2026",
    message:
      "Phase 1: User Registration 🔥 Sign Up Window: 22 January 2026 – 28 January 2026 Candidates must register on th...",
    date: "20th Jan 2026",
    time: "8:00 AM",
    type: "info",
    important: true,
  },
];

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [students, setStudents] = useState<StudentData[]>(initialStudents);
  const [assignments, setAssignments] =
    useState<AssignmentData[]>(initialAssignments);
  const [announcements, setAnnouncements] =
    useState<AnnouncementData[]>(initialAnnouncements);

  // Initialize user from localStorage on app load
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const rawUser = JSON.parse(storedUser);
        // Normalize user data from backend (convert _id to id, fullName to name)
        const normalizedUser: User = {
          id: rawUser._id || rawUser.id || "",
          name:
            rawUser.fullName ||
            rawUser.name ||
            rawUser.email?.split("@")[0] ||
            "",
          email: rawUser.email || "",
          role: rawUser.role || "student",
          isShortlisted: rawUser.applicationStatus === "shortlisted",
          fullName: rawUser.fullName || rawUser.name,
          applicationStatus: rawUser.applicationStatus,
          profileCompletion: rawUser.profileCompletion,
          createdAt: rawUser.createdAt,
          phone: rawUser.phone,
          github: rawUser.github,
          linkedin: rawUser.linkedin,
          about: rawUser.about,
        };
        setUser(normalizedUser);
      } catch (error) {
        console.error("Failed to parse stored user:", error);
        localStorage.removeItem("user");
      }
    }
  }, []);

  const login = async (email: string, password: string) => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    if (email.includes("admin")) {
      setUser({
        id: "1",
        name: "Admin User",
        email,
        role: "admin",
      });
    } else {
      setUser({
        id: "2",
        name: email
          .split("@")[0]
          .replace(/\./g, " ")
          .replace(/\b\w/g, (c) => c.toUpperCase()),
        email,
        role: "student",
        isShortlisted: true,
      });
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  const updateStudentStatus = (id: number, status: string) => {
    setStudents((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status } : s)),
    );
  };

  const addAssignment = (assignment: Omit<AssignmentData, "id">) => {
    setAssignments((prev) => [
      { ...assignment, id: Math.max(...prev.map((a) => a.id), 0) + 1 },
      ...prev,
    ]);
  };

  const addAnnouncement = (announcement: Omit<AnnouncementData, "id">) => {
    setAnnouncements((prev) => [
      { ...announcement, id: Math.max(...prev.map((a) => a.id), 0) + 1 },
      ...prev,
    ]);
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
        assignments,
        addAssignment,
        announcements,
        addAnnouncement,
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
