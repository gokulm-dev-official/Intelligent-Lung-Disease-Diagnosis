import {
    EnvelopeIcon,
    PhoneIcon,
    AcademicCapIcon,
    BoltIcon,
    GlobeAltIcon,
} from '@heroicons/react/24/outline';
import profilePhoto from '../assets/profile.jpg';

const LinkedInIcon = () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
);

const GitHubIcon = () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
    </svg>
);

const GmailIcon = () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M24 4.5v15c0 .85-.65 1.5-1.5 1.5H21V7.39l-9 6.58-9-6.58V21H1.5C.65 21 0 20.35 0 19.5v-15c0-1.17 1.1-1.9 2.1-1.4L12 9.4l9.9-6.3c1-.5 2.1.23 2.1 1.4z" />
    </svg>
);

const developerDetails = {
    name: "GOKUL M",
    role: "Full Stack Engineer & Researcher",
    email: "gokulxmg26@gmail.com",
    phone: "+91 6382024508",
    linkedin: "https://www.linkedin.com/in/gokul-m-7b881629b/",
    github: "https://github.com/gokulm-dev-official",
    skills: ["React", "Express.js", "MongoDB", "Node.js", "Python", "TensorFlow", "Tailwind CSS", "Vite"],
    bio: "I create simple and clean websites using modern technologies. I enjoy learning and improving my coding skills to build impactful AI solutions."
};

export default function About() {
    return (
        <div className="min-h-[80vh] flex items-center justify-center p-4">
            <div className="max-w-6xl w-full animate-fade-in-up">
                {/* Main Identity Card */}
                <div className="bg-gray-100/50 backdrop-blur-sm rounded-[3rem] p-8 md:p-16 border border-gray-200/50 shadow-2xl shadow-gray-200/20 flex flex-col md:flex-row items-center gap-12 md:gap-24 relative overflow-hidden">
                    {/* Background Accents */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-32 -mt-32 blur-3xl opacity-50"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-400/5 rounded-full -ml-32 -mb-32 blur-3xl opacity-50"></div>

                    {/* Left: The Photo (Portrait Aspect) */}
                    <div className="w-full md:w-[400px] flex-shrink-0 animate-float">
                        <div className="relative group">
                            <div className="absolute -inset-1 bg-white rounded-[2.5rem] shadow-xl"></div>
                            <div className="relative aspect-[3/4] rounded-[2.2rem] overflow-hidden border-8 border-white shadow-inner">
                                <img
                                    src={profilePhoto}
                                    alt={developerDetails.name}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    onError={(e) => {
                                        e.target.src = 'https://ui-avatars.com/api/?name=Gokul+M&background=0077b5&color=fff&size=500';
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Right: Content Section */}
                    <div className="flex-1 space-y-8 text-center md:text-left relative z-10">
                        <section className="space-y-4">
                            <h1 className="text-6xl md:text-7xl font-black text-primary tracking-tighter uppercase leading-tight">
                                {developerDetails.name}
                            </h1>
                            <div className="flex flex-wrap justify-center md:justify-start gap-x-3 text-sm font-bold text-gray-400 uppercase tracking-widest">
                                {developerDetails.skills.map((skill, i) => (
                                    <span key={skill} className="flex items-center gap-3">
                                        {skill}
                                        {i < developerDetails.skills.length - 1 && <span className="opacity-30">|</span>}
                                    </span>
                                ))}
                            </div>
                        </section>

                        <section className="max-w-xl">
                            <p className="text-xl md:text-2xl text-gray-600 font-medium leading-relaxed italic">
                                "{developerDetails.bio}"
                            </p>
                        </section>

                        {/* Social Registry (Google Minimalist Style) */}
                        <section className="flex flex-wrap justify-center md:justify-start gap-4 pt-4">
                            <a href={developerDetails.github} target="_blank" rel="noreferrer"
                                className="flex items-center gap-3 px-6 py-3 bg-white border border-gray-200 rounded-2xl text-gray-900 font-bold hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                                <GitHubIcon />
                                <span>GitHub</span>
                            </a>
                            <a href={developerDetails.linkedin} target="_blank" rel="noreferrer"
                                className="flex items-center gap-3 px-6 py-3 bg-white border border-gray-200 rounded-2xl text-[#0077b5] font-bold hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                                <LinkedInIcon />
                                <span>LinkedIn</span>
                            </a>
                            <a href={`mailto:${developerDetails.email}`}
                                className="flex items-center gap-3 px-6 py-3 bg-white border border-gray-200 rounded-2xl text-[#EA4335] font-bold hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                                <GmailIcon />
                                <span>Gmail</span>
                            </a>
                        </section>

                        {/* Quick Contact Line */}
                        <div className="pt-8 border-t border-gray-200 inline-flex flex-wrap gap-8 text-xs font-black text-gray-400 uppercase tracking-[0.2em] justify-center md:justify-start">
                            <div className="flex items-center gap-2">
                                <PhoneIcon className="w-4 h-4" />
                                {developerDetails.phone}
                            </div>
                            <div className="flex items-center gap-2">
                                <GlobeAltIcon className="w-4 h-4" />
                                TAMIL NADU, INDIA
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Signature */}
                <div className="text-center mt-12 opacity-40">
                    <p className="text-[10px] font-black uppercase tracking-[0.5em] text-gray-500">
                        Designed & Engineered by Gokul M &copy; 2025
                    </p>
                </div>
            </div>
        </div>
    );
}
