import { Link } from 'react-router';
import { PublicNavbar } from '../components/PublicNavbar';
import { Footer } from '../components/Footer';
import { ArrowRight, User, ClipboardList, Upload, Activity, Users, Workflow, Globe, Database, Shield, Code, Server, Layout } from 'lucide-react';

export function Home() {
  const modules = [
    { 
      icon: User, 
      title: 'Profile Building', 
      description: 'Create comprehensive developer profiles with skills and experience' 
    },
    { 
      icon: ClipboardList, 
      title: 'Task Assignments', 
      description: 'Receive structured coding challenges and project tasks' 
    },
    { 
      icon: Upload, 
      title: 'Seamless Submissions', 
      description: 'Submit your work through GitHub and hosted deployments' 
    },
    { 
      icon: Activity, 
      title: 'Real-time Tracking', 
      description: 'Monitor your progress with live status updates' 
    },
    { 
      icon: Users, 
      title: 'Community Hub', 
      description: 'Connect with fellow developers and mentors' 
    },
    { 
      icon: Workflow, 
      title: 'Induction Process', 
      description: 'Structured pathway from application to membership' 
    },
  ];

  const projects = [
    {
      name: 'NITP Official Website',
      description: 'The official web portal for NIT Patna serving thousands of students and faculty',
      tags: ['React', 'Node.js', 'PostgreSQL']
    },
    {
      name: 'TNP Portal',
      description: 'Training & Placement management system for campus recruitment',
      tags: ['Next.js', 'MongoDB', 'AWS']
    },
    {
      name: 'Admin Panel',
      description: 'Centralized administration dashboard for institutional management',
      tags: ['React', 'Express', 'MySQL']
    },
    {
      name: 'EICT Academy',
      description: 'E-learning platform for technical skill development',
      tags: ['Vue.js', 'Django', 'Redis']
    },
    {
      name: 'Faculty Appraisal',
      description: 'Performance evaluation and feedback system for faculty members',
      tags: ['Angular', 'Spring Boot', 'Oracle']
    },
    {
      name: 'More Institutional Systems',
      description: 'Various tools and platforms serving the institute ecosystem',
      tags: ['TypeScript', 'Docker', 'Kubernetes']
    },
  ];

  const stats = [
    { value: '10+', label: 'Active Members' },
    { value: '12+', label: 'Projects Shipped' },
    { value: '100K+', label: 'Lines of Code' },
    { value: '5000+', label: 'Users' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <PublicNavbar />

      {/* Hero Section */}
      <section className="pt-24 sm:pt-32 pb-12 sm:pb-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold mb-6 text-foreground">
            Code the Future
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            The Web Development Club builds and maintains the digital infrastructure 
            powering NIT Patna's technological ecosystem.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              to="/login"
              className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2"
            >
              Start Application
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link 
              to="/team"
              className="px-6 py-3 border border-border rounded-lg hover:bg-accent transition-colors"
            >
              View Protocol
            </Link>
          </div>
        </div>
      </section>

      {/* System Modules Section */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 bg-card/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-semibold text-center mb-12 text-foreground">
            System Modules
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modules.map((module) => {
              const Icon = module.icon;
              return (
                <div 
                  key={module.title}
                  className="p-6 bg-card border border-border rounded-lg hover:shadow-lg transition-shadow"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-foreground">{module.title}</h3>
                  <p className="text-sm text-muted-foreground">{module.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Deployed Systems Section */}
      <section className="py-12 sm:py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-semibold text-center mb-12 text-foreground">
            Deployed Systems
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div 
                key={project.name}
                className="p-6 bg-card border border-border rounded-lg hover:shadow-lg transition-shadow"
              >
                <h3 className="text-lg font-semibold mb-2 text-foreground">{project.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span 
                      key={tag}
                      className="px-2.5 py-1 bg-secondary text-secondary-foreground rounded text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 bg-card/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl sm:text-4xl md:text-5xl font-semibold mb-2 text-primary">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-20 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-semibold mb-6 text-foreground">
            Ready to Deploy?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join us in building the next generation of institutional technology
          </p>
          <Link 
            to="/login"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
          >
            Commence Application
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}