import { DashboardSidebar } from '../components/DashboardSidebar';
import { Github, Linkedin, Mail, Phone } from 'lucide-react';

export function StudentProfile() {
  return (
    <div className="min-h-screen flex">
      <DashboardSidebar />
      
      <main className="flex-1 lg:ml-60 pt-14 lg:pt-0">
        <div className="max-w-4xl mx-auto p-4 sm:p-8">
          <h1 className="text-3xl font-semibold mb-8 text-foreground">My Profile</h1>

          <div className="space-y-6">
            <div className="p-6 bg-card border border-border rounded-lg">
              <h2 className="text-lg font-semibold mb-4 text-foreground">Personal Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-2 text-foreground">Full Name</label>
                  <input
                    type="text"
                    defaultValue="Student User"
                    className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2 text-foreground">Email</label>
                  <input
                    type="email"
                    defaultValue="student@nitp.ac.in"
                    className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                  />
                </div>
              </div>
            </div>

            <div className="p-6 bg-card border border-border rounded-lg">
              <h2 className="text-lg font-semibold mb-4 text-foreground">Social Links</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm mb-2 text-foreground">
                    <Github className="w-4 h-4 inline mr-2" />
                    GitHub Profile
                  </label>
                  <input
                    type="url"
                    placeholder="https://github.com/username"
                    className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2 text-foreground">
                    <Linkedin className="w-4 h-4 inline mr-2" />
                    LinkedIn Profile
                  </label>
                  <input
                    type="url"
                    placeholder="https://linkedin.com/in/username"
                    className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2 text-foreground">
                    <Phone className="w-4 h-4 inline mr-2" />
                    Mobile Number
                  </label>
                  <input
                    type="tel"
                    placeholder="+91 9876543210"
                    className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                  />
                </div>
              </div>
            </div>

            <div className="p-6 bg-card border border-border rounded-lg">
              <h2 className="text-lg font-semibold mb-4 text-foreground">About</h2>
              <textarea
                rows={6}
                placeholder="Tell us about yourself, your skills, and why you want to join WDC..."
                className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground resize-none"
              />
            </div>

            <div className="flex justify-end">
              <button className="px-6 py-2.5 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}