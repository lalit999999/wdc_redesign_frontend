import { DashboardSidebar } from '../components/DashboardSidebar';

export function AdminSubmissions() {
  return (
    <div className="min-h-screen flex">
      <DashboardSidebar />
      
      <main className="flex-1 lg:ml-60 pt-14 lg:pt-0">
        <div className="max-w-6xl mx-auto p-4 sm:p-8">
          <h1 className="text-3xl font-semibold mb-8 text-foreground">Submissions</h1>

          <div className="p-12 bg-card border border-border rounded-lg text-center">
            <p className="text-muted-foreground">Submission review interface</p>
          </div>
        </div>
      </main>
    </div>
  );
}