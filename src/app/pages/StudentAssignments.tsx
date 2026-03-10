import { DashboardSidebar } from '../components/DashboardSidebar';
import { Clock, CheckCircle } from 'lucide-react';

export function StudentAssignments() {
  const assignments = [
    {
      id: 1,
      title: 'Build a Full-Stack Web Application',
      description: 'Create a CRUD application with authentication using React and Node.js',
      deadline: 'March 13, 2026',
      status: 'in-progress',
      daysLeft: 3,
    },
    {
      id: 2,
      title: 'Database Design Challenge',
      description: 'Design and implement a normalized database schema for an e-commerce platform',
      deadline: 'March 20, 2026',
      status: 'not-started',
      daysLeft: 10,
    },
    {
      id: 3,
      title: 'API Development Task',
      description: 'Build a RESTful API with proper authentication and documentation',
      deadline: 'March 10, 2026',
      status: 'submitted',
      daysLeft: 0,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'submitted':
        return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'in-progress':
        return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      default:
        return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'submitted':
        return 'Submitted';
      case 'in-progress':
        return 'In Progress';
      default:
        return 'Not Started';
    }
  };

  return (
    <div className="min-h-screen flex">
      <DashboardSidebar />
      
      <main className="flex-1 lg:ml-60 pt-14 lg:pt-0">
        <div className="max-w-5xl mx-auto p-4 sm:p-8">
          <h1 className="text-3xl font-semibold mb-8 text-foreground">Assignments</h1>

          <div className="space-y-4">
            {assignments.map((assignment) => (
              <div 
                key={assignment.id}
                className="p-6 bg-card border border-border rounded-lg hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-2 text-foreground">
                      {assignment.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      {assignment.description}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded text-xs font-medium border ${getStatusColor(assignment.status)}`}>
                    {getStatusLabel(assignment.status)}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm">
                    {assignment.status === 'submitted' ? (
                      <div className="flex items-center gap-2 text-green-500">
                        <CheckCircle className="w-4 h-4" />
                        <span>Submitted on {assignment.deadline}</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        <span>
                          Due: {assignment.deadline} 
                          {assignment.daysLeft > 0 && ` (${assignment.daysLeft} days left)`}
                        </span>
                      </div>
                    )}
                  </div>
                  {assignment.status !== 'submitted' && (
                    <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity text-sm">
                      View Details
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}