import {
  createStudent,
  createMultipleStudents,
  getStudents,
} from "../../api/adminApi";

/**
 * Example: Add a single student to the database
 */
export const addSingleStudentExample = async () => {
  try {
    const studentData = {
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
    };

    const response = await createStudent(studentData);
    console.log("Student added successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error adding student:", error);
    throw error;
  }
};

/**
 * Example: Add multiple students to the database at once
 */
export const addMultipleStudentsExample = async () => {
  try {
    const studentsData = [
      {
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

    const response = await createMultipleStudents(studentsData);
    console.log("All students added successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error adding multiple students:", error);
    throw error;
  }
};

/**
 * Example: Fetch all students from the database
 */
export const fetchAllStudentsExample = async () => {
  try {
    const response = await getStudents();
    console.log("All students:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching students:", error);
    throw error;
  }
};

/**
 * Utility function: Initialize database with all students
 * Call this once to populate the database with initial student data
 */
export const initializeStudentsInDatabase = async () => {
  try {
    console.log("Starting to add all students to database...");
    const result = await addMultipleStudentsExample();
    console.log("Successfully initialized database with students:", result);
    return result;
  } catch (error) {
    console.error("Failed to initialize students in database:", error);
    throw error;
  }
};
