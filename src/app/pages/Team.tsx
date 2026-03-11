import { PublicNavbar } from "../components/PublicNavbar";
import { Footer } from "../components/Footer";
import { Github, Linkedin, Mail } from "lucide-react";

export function Team() {
  const facultyCoordinator = {
    name: "Balaji-Naik",
    role: "Professor Coordinator",
    description: "Guiding the WDC team and overseeing projects.",
    photo:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
    email: "balaji@nitp.ac.in",
  };

  const teamMembers = [
    {
      name: "Aashish Kumar Singh",
      role: "Lead Developer",
      description:
        "Optimized website performance using caching, managed AWS deployments, and co-developed CICD pipelines. Designed and maintained CI/CD pipelines, with regular system monitoring and log analysis.",
      photo:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      email: "aashish@nitp.ac.in",
    },
    {
      name: "Aakash Tiwari",
      role: "Developer",
      description:
        "Developed faculty profile cards and detailed profiles for departments. Enhanced academic and research sections including syllabus, vision, mission.",
      photo:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      email: "aakash@nitp.ac.in",
    },
    {
      name: "Suyash Vishnoi",
      role: "Developer",
      description:
        "Developed Admin Backend Panel with secure event updates and file uploads. Redesigned Facilities section with responsive layouts.",
      photo:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      email: "suyash@nitp.ac.in",
    },
    {
      name: "Aman Kumar Mishra",
      role: "Developer",
      description:
        "Developed dynamic About Us section with content management capabilities. Implemented Faculty Administration Profile Management system.",
      photo:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop",
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      email: "aman@nitp.ac.in",
    },
    {
      name: "TATIKONDA VENKATESH",
      role: "Developer",
      description:
        "Redesigned the Mechanical Department page with a modern layout. Designed department page layouts in Figma for a polished look.",
      photo:
        "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop",
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      email: "tatikonda@nitp.ac.in",
    },
    {
      name: "Sandeep Kumar Gond",
      role: "Developer",
      description:
        "Developed the Physics Department section with structured and accessible information. Enhanced Academic section content for clarity and improved navigation.",
      photo:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      email: "sandeep@nitp.ac.in",
    },
    {
      name: "NAVNEET SHREYA",
      role: "Developer",
      description:
        "Developed Chemical Science & Technology pages with Tailwind-styled React components. Implemented styling changes and updates across admin panel buttons.",
      photo:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      email: "navneet@nitp.ac.in",
    },
    {
      name: "Chennupalli Rohith",
      role: "Developer",
      description:
        "Completed NIT-P-ICT website modules and added announcement cards. Developed Proctorial Board section in main website.",
      photo:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      email: "chennu@nitp.ac.in",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <PublicNavbar />

      <section className="pt-24 sm:pt-32 pb-12 sm:pb-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-semibold mb-4 bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-600 bg-clip-text text-transparent">
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
