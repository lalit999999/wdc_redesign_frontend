import { DashboardSidebar } from '../components/DashboardSidebar';
import { Bell } from 'lucide-react';

export function StudentAnnouncements() {
  const announcements = [
    {
      id: 1,
      title: 'Induction Round 1 Results',
      message: 'Congratulations! You have been shortlisted for the next round. Please complete your profile and check the assignments section for upcoming tasks.',
      date: 'March 8, 2026',
      time: '10:30 AM',
      type: 'success',
    },
    {
      id: 2,
      title: 'Assignment Deadline Extended',
      message: 'The deadline for Assignment 1 has been extended by 2 days due to technical issues. New deadline: March 13, 2026.',
      date: 'March 7, 2026',
      time: '3:45 PM',
      type: 'info',
    },
    {
      id: 3,
      title: 'Technical Interview Schedule',
      message: 'Technical interviews will be conducted on March 15, 2026. Detailed schedule will be shared via email.',
      date: 'March 6, 2026',
      time: '9:00 AM',
      type: 'info',
    },
    {
      id: 4,
      title: 'Welcome to WDC Induction 2026',
      message: 'Welcome to the Web Development Club Induction Portal. Please complete your profile to get started with the induction process.',
      date: 'March 5, 2026',
      time: '8:00 AM',
      type: 'info',
    },
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'border-l-green-500 bg-green-500/5';
      case 'warning':
        return 'border-l-yellow-500 bg-yellow-500/5';
      default:
        return 'border-l-blue-500 bg-blue-500/5';
    }
  };

  return (
    <div className="min-h-screen flex">
      <DashboardSidebar />
      
      <main className="flex-1 lg:ml-60 pt-14 lg:pt-0">
        <div className="max-w-4xl mx-auto p-4 sm:p-8">
          <div className="flex items-center gap-3 mb-8">
            <Bell className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-semibold text-foreground">Announcements</h1>
          </div>

          <div className="space-y-4">
            {announcements.map((announcement) => (
              <div 
                key={announcement.id}
                className={`p-6 bg-card border border-border border-l-4 rounded-lg ${getTypeColor(announcement.type)}`}
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-semibold text-foreground">
                    {announcement.title}
                  </h3>
                  <div className="text-xs text-muted-foreground text-right">
                    <div>{announcement.date}</div>
                    <div>{announcement.time}</div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  {announcement.message}
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}