import { DashboardSidebar } from "../components/DashboardSidebar";
import { useAuth } from "../context/AuthContext";
import { submitAssignment, getSubmissions } from "../../api/assignmentApi";
import {
  FileCheck,
  Github,
  Link as LinkIcon,
  FileText,
  Clock,
  CheckCircle2,
  Send,
  Calendar,
} from "lucide-react";
import { useState, useEffect } from "react";

interface Submission {
  assignmentId: string | number;
  assignmentTitle: string;
  githubLink: string;
  hostedLink: string;
  submittedAt: string;
  status: "submitted" | "pending";
}

export function StudentFinalSubmission() {
  const { assignments } = useAuth();

  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [selectedAssignment, setSelectedAssignment] = useState<
    string | number | null
  >(null);
  const [githubLink, setGithubLink] = useState("");
  const [hostedLink, setHostedLink] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch submissions from backend on component mount
  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const response = await getSubmissions();
        const data = response.data || response;
        console.log("Fetched submissions from backend:", data);

        // Format backend response to match Submission interface
        const formattedSubmissions: Submission[] = (
          Array.isArray(data) ? data : []
        ).map((sub: any) => {
          const assignmentId = String(
            sub.assignmentId || sub.assignment?._id || sub.assignment?.id || "",
          );
          console.log("Formatting submission with ID:", assignmentId, sub);
          return {
            assignmentId,
            assignmentTitle: sub.assignmentTitle || sub.assignment?.title || "",
            githubLink: sub.githubLink || "",
            hostedLink: sub.hostedLink || "",
            submittedAt: sub.submittedAt
              ? new Date(sub.submittedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
              : "",
            status: "submitted",
          };
        });

        console.log("Final formatted submissions:", formattedSubmissions);
        setSubmissions(formattedSubmissions);
      } catch (error: any) {
        console.warn("Failed to fetch submissions:", error);
        // Silently fail - submissions will be empty
      }
    };

    fetchSubmissions();
  }, []);

  const unsubmittedAssignments = assignments.filter(
    (a) =>
      !submissions.some(
        (s) => String(s.assignmentId) === String(a._id || a.id),
      ),
  );

  const handleSubmit = async () => {
    if (!selectedAssignment || !githubLink) {
      alert("Please select an assignment and provide a GitHub link");
      return;
    }
    const assignment = assignments.find(
      (a) => String(a._id || a.id) === String(selectedAssignment),
    );
    if (!assignment) {
      alert("Assignment not found");
      return;
    }

    try {
      setIsSubmitting(true);

      // Call API to save submission
      const submissionData = {
        githubLink,
        hostedLink,
      };

      console.log("Submitting assignment:", selectedAssignment, submissionData);
      const response = await submitAssignment(
        String(selectedAssignment),
        submissionData,
      );
      console.log("Submission response:", response);

      // Fetch fresh submissions from backend to sync with database
      const freshResponse = await getSubmissions();
      const freshData = freshResponse.data || freshResponse;

      const formattedSubmissions: Submission[] = (
        Array.isArray(freshData) ? freshData : []
      ).map((sub: any) => ({
        assignmentId: sub.assignmentId || sub.assignment?._id || "",
        assignmentTitle: sub.assignmentTitle || sub.assignment?.title || "",
        githubLink: sub.githubLink || "",
        hostedLink: sub.hostedLink || "",
        submittedAt: sub.submittedAt
          ? new Date(sub.submittedAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })
          : "",
        status: "submitted",
      }));

      // Update state with fresh data from backend
      setSubmissions(formattedSubmissions);

      setSelectedAssignment(null);
      setGithubLink("");
      setHostedLink("");
      setShowForm(false);
      alert("Assignment submitted successfully!");
    } catch (error: any) {
      console.error("Failed to submit assignment:", error);
      const status = error.response?.status;
      let errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to submit assignment";

      // Handle 409 Conflict - assignment already submitted
      if (status === 409) {
        errorMessage =
          "This assignment has already been submitted. You cannot submit it again.";
        // Refresh submissions to show current state
        try {
          const freshResponse = await getSubmissions();
          const freshData = freshResponse.data || freshResponse;
          const formattedSubmissions: Submission[] = (
            Array.isArray(freshData) ? freshData : []
          ).map((sub: any) => ({
            assignmentId: String(
              sub.assignmentId ||
                sub.assignment?._id ||
                sub.assignment?.id ||
                "",
            ),
            assignmentTitle: sub.assignmentTitle || sub.assignment?.title || "",
            githubLink: sub.githubLink || "",
            hostedLink: sub.hostedLink || "",
            submittedAt: sub.submittedAt
              ? new Date(sub.submittedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
              : "",
            status: "submitted",
          }));
          setSubmissions(formattedSubmissions);
        } catch (e) {
          console.warn("Failed to refresh submissions:", e);
        }
      }

      alert(`Error: ${errorMessage}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      <DashboardSidebar />

      <main className="flex-1 lg:ml-60 pt-14 lg:pt-0">
        <div className="max-w-5xl mx-auto p-4 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-3">
              <FileCheck className="w-8 h-8 text-primary" />
              <div>
                <h1 className="text-3xl font-semibold text-foreground">
                  Final Submission
                </h1>
                <p className="text-sm text-muted-foreground mt-1">
                  Submit your assignments and track your submissions
                </p>
              </div>
            </div>
            {unsubmittedAssignments.length > 0 && (
              <button
                onClick={() => setShowForm(!showForm)}
                className="flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
              >
                <Send className="w-4 h-4" />
                New Submission
              </button>
            )}
          </div>

          {/* New Submission Form */}
          {showForm && (
            <div className="mb-8 p-6 bg-card border border-border rounded-lg">
              <h2 className="text-lg font-semibold mb-4 text-foreground">
                Submit Assignment
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm mb-2 text-foreground">
                    Select Assignment
                  </label>
                  <select
                    value={selectedAssignment || ""}
                    onChange={(e) => setSelectedAssignment(e.target.value)}
                    className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                  >
                    <option value="">Choose an assignment...</option>
                    {unsubmittedAssignments.map((a) => (
                      <option key={a._id || a.id} value={String(a._id || a.id)}>
                        {a.title}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm mb-2 text-foreground">
                    <Github className="w-4 h-4 inline mr-2" />
                    GitHub Repository Link *
                  </label>
                  <input
                    type="url"
                    value={githubLink}
                    onChange={(e) => setGithubLink(e.target.value)}
                    placeholder="https://github.com/username/repo"
                    className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2 text-foreground">
                    <LinkIcon className="w-4 h-4 inline mr-2" />
                    Hosted Link (Optional)
                  </label>
                  <input
                    type="url"
                    value={hostedLink}
                    onChange={(e) => setHostedLink(e.target.value)}
                    placeholder="https://your-app.vercel.app"
                    className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                  />
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={handleSubmit}
                    disabled={
                      !selectedAssignment || !githubLink || isSubmitting
                    }
                    className="px-6 py-2.5 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Submitting..." : "Submit"}
                  </button>
                  <button
                    onClick={() => setShowForm(false)}
                    disabled={isSubmitting}
                    className="px-6 py-2.5 border border-border rounded-lg hover:bg-accent transition-colors text-foreground disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* All Assignments with Submission Status */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-foreground mb-2">
              All Assignments
            </h2>
            {assignments.map((assignment, index) => {
              const submission = submissions.find(
                (s) =>
                  String(s.assignmentId) ===
                  String(assignment._id || assignment.id),
              );
              return (
                <div
                  key={assignment._id || assignment.id || index}
                  className="p-5 bg-card border border-border rounded-lg"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="font-semibold text-foreground">
                          {assignment.title}
                        </h3>
                        <span className="px-2 py-0.5 rounded text-xs bg-secondary text-muted-foreground">
                          {assignment.category}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {assignment.description}
                      </p>
                    </div>
                    {submission ? (
                      <span className="flex items-center gap-1.5 px-3 py-1 rounded text-xs font-medium bg-green-500/10 text-green-500 border border-green-500/20 shrink-0">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Submitted
                      </span>
                    ) : (
                      <span className="flex items-center gap-1.5 px-3 py-1 rounded text-xs font-medium bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 shrink-0">
                        <Clock className="w-3.5 h-3.5" />
                        Pending
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-3">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Due: {assignment.deadline}</span>
                  </div>

                  {submission && (
                    <div className="mt-3 pt-3 border-t border-border">
                      <p className="text-xs text-muted-foreground mb-2">
                        Submitted on {submission.submittedAt}
                      </p>
                      <div className="flex flex-wrap gap-3">
                        <a
                          href={submission.githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 text-xs text-primary hover:underline"
                        >
                          <Github className="w-3.5 h-3.5" />
                          GitHub Repo
                        </a>
                        {submission.hostedLink && (
                          <a
                            href={submission.hostedLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 text-xs text-primary hover:underline"
                          >
                            <LinkIcon className="w-3.5 h-3.5" />
                            Live Demo
                          </a>
                        )}
                      </div>
                    </div>
                  )}

                  {!submission && (
                    <button
                      onClick={() => {
                        setSelectedAssignment(assignment._id || assignment.id);
                        setShowForm(true);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      className="mt-2 px-4 py-1.5 bg-primary text-primary-foreground rounded hover:opacity-90 transition-opacity text-sm"
                    >
                      Submit Now
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
