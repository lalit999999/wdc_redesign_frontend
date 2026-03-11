import { DashboardSidebar } from "../components/DashboardSidebar";
import { Loader } from "../components/Loader";
import { Search, Filter } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router";

export function AdminStudents() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const { students, updateStudentStatus, loadingStudents } = useAuth();
  const navigate = useNavigate();

  const getStatusColor = (status: string) => {
    const lowerStatus = status.toLowerCase();
    switch (lowerStatus) {
      case "shortlisted":
        return "bg-green-500/10 text-green-500 border-green-500/20";
      case "rejected":
        return "bg-red-500/10 text-red-500 border-red-500/20";
      default:
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
    }
  };

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter =
      filterStatus === "all" || student.status.toLowerCase() === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen flex">
      <DashboardSidebar />

      <main className="flex-1 lg:ml-60 pt-14 lg:pt-0">
        <div className="max-w-7xl mx-auto p-4 sm:p-8">
          <h1 className="text-3xl font-semibold mb-8 text-foreground">
            Student Applications
          </h1>

          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search by name or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-muted-foreground" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2.5 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="shortlisted">Shortlisted</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>

          {/* Students Table */}
          {loadingStudents ? (
            <Loader />
          ) : (
            <>
              <div className="bg-card border border-border rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-secondary/50 border-b border-border">
                      <tr>
                        <th className="text-left px-6 py-3 text-sm font-semibold text-foreground">
                          Name
                        </th>
                        <th className="text-left px-6 py-3 text-sm font-semibold text-foreground">
                          Email
                        </th>
                        <th className="text-left px-6 py-3 text-sm font-semibold text-foreground">
                          Branch
                        </th>
                        <th className="text-left px-6 py-3 text-sm font-semibold text-foreground">
                          Year
                        </th>
                        <th className="text-left px-6 py-3 text-sm font-semibold text-foreground">
                          Status
                        </th>
                        <th className="text-left px-6 py-3 text-sm font-semibold text-foreground">
                          Profile
                        </th>
                        <th className="text-right px-6 py-3 text-sm font-semibold text-foreground">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {filteredStudents.map((student, index) => (
                        <tr
                          key={student._id || student.id || index}
                          className="hover:bg-accent/50 transition-colors"
                        >
                          <td className="px-6 py-4">
                            <div className="font-medium text-foreground">
                              {student.name}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-muted-foreground">
                              {student.email}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-foreground">
                              {student.branch}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-foreground">
                              {student.year}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className={`px-2.5 py-1 rounded text-xs font-medium border ${getStatusColor(student.status)}`}
                            >
                              {student.status}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-foreground">
                              {student.profileCompletion}%
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center justify-end gap-2 flex-wrap">
                              {student.status.toLowerCase() !==
                                "shortlisted" && (
                                <button
                                  onClick={async () => {
                                    try {
                                      await updateStudentStatus(
                                        student.id,
                                        "Shortlisted",
                                      );
                                    } catch (error) {
                                      console.error(
                                        "Failed to shortlist student:",
                                        error,
                                      );
                                      alert("Failed to shortlist student");
                                    }
                                  }}
                                  className="px-3 py-1.5 bg-green-500/10 text-green-500 rounded hover:bg-green-500/20 transition-colors text-sm whitespace-nowrap"
                                >
                                  Shortlist
                                </button>
                              )}
                              {student.status.toLowerCase() !== "rejected" && (
                                <button
                                  onClick={async () => {
                                    try {
                                      await updateStudentStatus(
                                        student.id,
                                        "Rejected",
                                      );
                                    } catch (error) {
                                      console.error(
                                        "Failed to reject student:",
                                        error,
                                      );
                                      alert("Failed to reject student");
                                    }
                                  }}
                                  className="px-3 py-1.5 bg-red-500/10 text-red-500 rounded hover:bg-red-500/20 transition-colors text-sm whitespace-nowrap"
                                >
                                  Reject
                                </button>
                              )}
                              <button
                                onClick={() =>
                                  navigate(`/admin/students/${student.id}`)
                                }
                                className="px-3 py-1.5 border border-border rounded hover:bg-accent transition-colors text-sm text-foreground whitespace-nowrap"
                              >
                                View Profile
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {filteredStudents.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">
                    No students found matching your criteria
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
}
