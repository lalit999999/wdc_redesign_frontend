import { DashboardSidebar } from '../components/DashboardSidebar';
import { Users, ClipboardList, MessageSquare, CheckCircle, XCircle, Clock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router';

export function AdminDashboard() {
  const { students, updateStudentStatus } = useAuth();
  const navigate = useNavigate();

  const stats = [
    { label: 'Total Applications', value: students.length.toString(), icon: Users, color: 'text-blue-500' },
    { label: 'Shortlisted', value: students.filter(s => s.status === 'Shortlisted').length.toString(), icon: CheckCircle, color: 'text-green-500' },
    { label: 'Pending Review', value: students.filter(s => s.status === 'Pending').length.toString(), icon: Clock, color: 'text-yellow-500' },
    { label: 'Rejected', value: students.filter(s => s.status === 'Rejected').length.toString(), icon: XCircle, color: 'text-red-500' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Shortlisted':
        return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'Rejected':
        return 'bg-red-500/10 text-red-500 border-red-500/20';
      default:
        return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
    }
  };

  return (
    <div className="min-h-screen flex">
      <DashboardSidebar />
      
      <main className="flex-1 lg:ml-60 pt-14 lg:pt-0">
        <div className="max-w-7xl mx-auto p-4 sm:p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-semibold mb-2 text-foreground">
              Admin Dashboard
            </h1>
            <p className="text-muted-foreground">
              Manage applications, assignments, and announcements
            </p>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div 
                  key={stat.label}
                  className="p-6 bg-card border border-border rounded-lg"
                >
                  <div className="flex items-center justify-between mb-2">
                    <Icon className={`w-8 h-8 ${stat.color}`} />
                    <span className="text-3xl font-semibold text-foreground">{stat.value}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              );
            })}
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <button
              onClick={() => navigate('/admin/assignments')}
              className="p-6 bg-card border border-border rounded-lg hover:shadow-lg transition-shadow text-left"
            >
              <ClipboardList className="w-8 h-8 text-primary mb-3" />
              <h3 className="font-semibold mb-1 text-foreground">Create Assignment</h3>
              <p className="text-sm text-muted-foreground">Add a new task for shortlisted students</p>
            </button>

            <button
              onClick={() => navigate('/admin/announcements')}
              className="p-6 bg-card border border-border rounded-lg hover:shadow-lg transition-shadow text-left"
            >
              <MessageSquare className="w-8 h-8 text-primary mb-3" />
              <h3 className="font-semibold mb-1 text-foreground">New Announcement</h3>
              <p className="text-sm text-muted-foreground">Broadcast message to all students</p>
            </button>

            <button
              onClick={() => navigate('/admin/students')}
              className="p-6 bg-card border border-border rounded-lg hover:shadow-lg transition-shadow text-left"
            >
              <Users className="w-8 h-8 text-primary mb-3" />
              <h3 className="font-semibold mb-1 text-foreground">Review Applications</h3>
              <p className="text-sm text-muted-foreground">View and manage student applications</p>
            </button>
          </div>

          {/* Recent Applications */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-foreground">Recent Applications</h2>
              <button
                onClick={() => navigate('/admin/students')}
                className="text-sm text-primary hover:underline"
              >
                View All
              </button>
            </div>
            
            <div className="bg-card border border-border rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-secondary/50 border-b border-border">
                    <tr>
                      <th className="text-left px-6 py-3 text-sm font-semibold text-foreground">Name</th>
                      <th className="text-left px-6 py-3 text-sm font-semibold text-foreground">Email</th>
                      <th className="text-left px-6 py-3 text-sm font-semibold text-foreground">Status</th>
                      <th className="text-left px-6 py-3 text-sm font-semibold text-foreground">Profile</th>
                      <th className="text-left px-6 py-3 text-sm font-semibold text-foreground">Applied</th>
                      <th className="text-right px-6 py-3 text-sm font-semibold text-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {students.slice(0, 5).map((student) => (
                      <tr key={student.id} className="hover:bg-accent/50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="font-medium text-foreground">{student.name}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-muted-foreground">{student.email}</div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2.5 py-1 rounded text-xs font-medium border ${getStatusColor(student.status)}`}>
                            {student.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-foreground">{student.profileCompletion}%</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-muted-foreground">{student.appliedDate}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-end gap-2">
                            {student.status === 'Pending' && (
                              <>
                                <button
                                  onClick={() => updateStudentStatus(student.id, 'Shortlisted')}
                                  className="px-3 py-1.5 bg-green-500/10 text-green-500 rounded hover:bg-green-500/20 transition-colors text-sm"
                                >
                                  Shortlist
                                </button>
                                <button
                                  onClick={() => updateStudentStatus(student.id, 'Rejected')}
                                  className="px-3 py-1.5 bg-red-500/10 text-red-500 rounded hover:bg-red-500/20 transition-colors text-sm"
                                >
                                  Reject
                                </button>
                              </>
                            )}
                            <button
                              onClick={() => navigate(`/admin/students/${student.id}`)}
                              className="px-3 py-1.5 border border-border rounded hover:bg-accent transition-colors text-sm text-foreground"
                            >
                              View
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}