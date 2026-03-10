import { DashboardSidebar } from '../components/DashboardSidebar';
import { useAuth } from '../context/AuthContext';
import { useNavigate, useParams } from 'react-router';
import { ArrowLeft, Github, Linkedin, Mail, Phone, FileText, User, Calendar, BookOpen } from 'lucide-react';

export function AdminStudentProfile() {
  const { students, updateStudentStatus } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();

  const student = students.find(s => s.id === Number(id));

  if (!student) {
    return (
      <div className="min-h-screen flex">
        <DashboardSidebar />
        <main className="flex-1 lg:ml-60 pt-14 lg:pt-0">
          <div className="max-w-4xl mx-auto p-4 sm:p-8">
            <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6">
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            <div className="text-center py-12">
              <p className="text-muted-foreground">Student not found</p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Shortlisted': return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'Rejected': return 'bg-red-500/10 text-red-500 border-red-500/20';
      default: return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
    }
  };

  return (
    <div className="min-h-screen flex">
      <DashboardSidebar />
      
      <main className="flex-1 lg:ml-60 pt-14 lg:pt-0">
        <div className="max-w-4xl mx-auto p-4 sm:p-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Students
          </button>

          {/* Header */}
          <div className="p-4 sm:p-6 bg-card border border-border rounded-lg mb-6">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center text-2xl text-primary font-semibold">
                  {student.name.charAt(0)}
                </div>
                <div>
                  <h1 className="text-2xl font-semibold text-foreground">{student.name}</h1>
                  <p className="text-muted-foreground">{student.email}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <span className={`px-2.5 py-1 rounded text-xs font-medium border ${getStatusColor(student.status)}`}>
                      {student.status}
                    </span>
                    <span className="text-sm text-muted-foreground">{student.branch} • {student.year}</span>
                  </div>
                </div>
              </div>
              <div className="text-left sm:text-right">
                <p className="text-sm text-muted-foreground">Profile Completion</p>
                <p className="text-3xl font-semibold text-primary">{student.profileCompletion}%</p>
              </div>
            </div>

            {/* Action Buttons */}
            {student.status === 'Pending' && (
              <div className="flex gap-3 mt-6 pt-4 border-t border-border">
                <button
                  onClick={() => updateStudentStatus(student.id, 'Shortlisted')}
                  className="px-6 py-2.5 bg-green-500/10 text-green-500 rounded-lg hover:bg-green-500/20 transition-colors font-medium"
                >
                  Shortlist Student
                </button>
                <button
                  onClick={() => updateStudentStatus(student.id, 'Rejected')}
                  className="px-6 py-2.5 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500/20 transition-colors font-medium"
                >
                  Reject Student
                </button>
              </div>
            )}
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="p-6 bg-card border border-border rounded-lg">
              <h2 className="text-lg font-semibold mb-4 text-foreground flex items-center gap-2">
                <User className="w-5 h-5 text-primary" /> Personal Info
              </h2>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-foreground">{student.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-foreground">{student.phone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <BookOpen className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-foreground">{student.branch} — {student.year}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-foreground">Applied: {student.appliedDate}</span>
                </div>
              </div>
            </div>

            <div className="p-6 bg-card border border-border rounded-lg">
              <h2 className="text-lg font-semibold mb-4 text-foreground flex items-center gap-2">
                <Github className="w-5 h-5 text-primary" /> Links
              </h2>
              <div className="space-y-3">
                <a href={student.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm text-primary hover:underline">
                  <Github className="w-4 h-4" />
                  {student.github}
                </a>
                <a href={student.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm text-primary hover:underline">
                  <Linkedin className="w-4 h-4" />
                  {student.linkedin}
                </a>
                <div className="flex items-center gap-3 text-sm text-foreground">
                  <FileText className="w-4 h-4 text-muted-foreground" />
                  {student.resume}
                </div>
              </div>
            </div>
          </div>

          {/* About */}
          <div className="p-6 bg-card border border-border rounded-lg">
            <h2 className="text-lg font-semibold mb-3 text-foreground">About</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">{student.about}</p>
          </div>
        </div>
      </main>
    </div>
  );
}