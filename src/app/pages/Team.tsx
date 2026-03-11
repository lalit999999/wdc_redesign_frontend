import { PublicNavbar } from "../components/PublicNavbar";
import { Footer } from "../components/Footer";
import { Github, Linkedin, Mail } from "lucide-react";

export function Team() {
  const facultyCoordinator = {
    name: "Rajvi Noh",
    role: "Faculty Coordinator",
    description:
      "Guiding the Web Development Club in building cutting-edge solutions for the institute",
    photo:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
    email: "rajvi@nitp.ac.in",
  };

  const teamMembers = [
    {
      name: "Aakrish Kumar Singh",
      role: "Lead Developer",
      description:
        "Full-stack engineer specializing in React and Node.js ecosystems",
      photo:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      email: "aakrish@nitp.ac.in",
    },
    {
      name: "Aakash Tiwari",
      role: "Backend Architect",
      description: "Database design and API development expert",
      photo:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      email: "aakash@nitp.ac.in",
    },
    {
      name: "Seyush Udhoti",
      role: "Frontend Lead",
      description: "UI/UX implementation and modern web technologies",
      photo:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      email: "seyush@nitp.ac.in",
    },
    {
      name: "Arjun Kumar Mishra",
      role: "Systems Engineer",
      description: "Performance optimization and system architecture",
      photo:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop",
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      email: "arjun@nitp.ac.in",
    },
    {
      name: "Tejaswini Venkatesini",
      role: "Database Administrator",
      description: "Data management and query optimization specialist",
      photo:
        "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop",
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      email: "tejaswini@nitp.ac.in",
    },
    {
      name: "Sanidney Kumar Goud",
      role: "DevOps Engineer",
      description: "Cloud infrastructure and deployment specialist",
      photo:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      email: "sanidney@nitp.ac.in",
    },
    {
      name: "Harshvir Shirta",
      role: "Creative Director",
      description: "Design and user experience specialist",
      photo:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      email: "harshvir@nitp.ac.in",
    },
    {
      name: "Chhatrapati Sachid",
      role: "Tech Lead",
      description: "Technical architecture and strategic planning",
      photo:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      email: "chhatrapati@nitp.ac.in",
    },
    {
      name: "Alok Chandra",
      role: "Full Stack Developer",
      description: "End-to-end development and integration specialist",
      photo:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      email: "alok@nitp.ac.in",
    },
    {
      name: "Saravpod Kumar",
      role: "Senior Developer",
      description: "Technical mentoring and code quality assurance",
      photo:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      email: "saravpod@nitp.ac.in",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <PublicNavbar />

      <section className="pt-24 sm:pt-32 pb-12 sm:pb-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-semibold mb-4 text-foreground">
              Meet the Team
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The engineers behind the digital infrastructure powering NIT
              Patna's technology ecosystem
            </p>
          </div>

          {/* Faculty Coordinator */}
          <div className="mb-20">
            <h2 className="text-2xl font-semibold mb-8 text-foreground">
              Faculty Coordinator
            </h2>
            <div className="max-w-2xl mx-auto p-8 bg-card border border-border rounded-lg hover:shadow-xl hover:border-primary/50 transition-all duration-300">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <img
                  src={facultyCoordinator.photo}
                  alt={facultyCoordinator.name}
                  className="w-32 h-32 rounded-lg object-cover grayscale hover:grayscale-0 transition-all duration-300"
                />
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-xl font-semibold mb-1 text-foreground">
                    {facultyCoordinator.name}
                  </h3>
                  <p className="text-primary mb-2">{facultyCoordinator.role}</p>
                  <p className="text-sm text-muted-foreground mb-4">
                    {facultyCoordinator.description}
                  </p>
                  <a
                    href={`mailto:${facultyCoordinator.email}`}
                    className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
                  >
                    <Mail className="w-4 h-4" />
                    {facultyCoordinator.email}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Team Members */}
          <div className="mb-16">
            <h2 className="text-2xl font-semibold mb-8 text-foreground">
              Team Members
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {teamMembers.map((member) => (
                <div
                  key={member.name}
                  className="p-6 bg-card border border-border rounded-lg hover:shadow-xl hover:border-primary/50 transition-all duration-300 hover:scale-105"
                >
                  <img
                    src={member.photo}
                    alt={member.name}
                    className="w-24 h-24 rounded-lg object-cover mb-4 grayscale hover:grayscale-0 transition-all duration-300 cursor-pointer"
                  />
                  <h3 className="text-lg font-semibold mb-1 text-foreground">
                    {member.name}
                  </h3>
                  <p className="text-sm text-primary mb-2">{member.role}</p>
                  <p className="text-sm text-muted-foreground mb-4">
                    {member.description}
                  </p>
                  <div className="flex items-center gap-3">
                    <a
                      href={member.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Github className="w-5 h-5" />
                    </a>
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>
                    <a
                      href={`mailto:${member.email}`}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Mail className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Legacy Section */}
          <div className="text-center">
            <button className="px-6 py-3 border border-border rounded-lg hover:bg-accent transition-colors">
              View Past Senior Members
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
