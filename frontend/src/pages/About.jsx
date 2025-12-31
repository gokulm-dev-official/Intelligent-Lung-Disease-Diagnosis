import {
    UserIcon,
    EnvelopeIcon,
    PhoneIcon,
    AcademicCapIcon,
    BoltIcon,
    LinkIcon
} from '@heroicons/react/24/outline';

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
    role: "Full Stack Engineer & AI Researcher",
    email: "gokulxmg26@gmail.com",
    phone: "+91 6382024508",
    linkedin: "https://www.linkedin.com/in/gokul-m-7b881629b/",
    github: "https://github.com/gokulm-dev-official",
    skills: ["React", "Express.js", "MongoDB", "Node.js", "Python", "TensorFlow", "Tailwind CSS", "Vite"],
    bio: "Passionate developer specialized in building AI-integrated medical healthcare systems and high-performance web applications."
};

export default function About() {
    return (
        <div className="max-w-6xl mx-auto space-y-8 animate-fade-in-up p-4">
            {/* Centered Header Identity Section */}
            <div className="bg-white rounded-[3rem] p-12 md:p-20 shadow-xl shadow-blue-500/5 border border-gray-100 relative overflow-hidden text-center">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-32 -mt-32 blur-3xl opacity-50"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-400/5 rounded-full -ml-32 -mb-32 blur-3xl opacity-50"></div>

                <div className="relative z-10 max-w-3xl mx-auto space-y-6">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-primary text-xs font-bold uppercase tracking-widest">
                        Lead Architect
                    </div>

                    <h1 className="text-5xl md:text-7xl font-black text-gray-900 tracking-tight leading-none uppercase">
                        {developerDetails.name}
                    </h1>

                    <p className="text-xl md:text-2xl text-gray-500 font-medium font-mono tracking-wider">
                        {developerDetails.role}
                    </p>

                    <p className="text-lg md:text-xl text-gray-600 leading-relaxed italic mx-auto">
                        "I create clean, modern websites using high-performance technologies and enjoy building impactful AI healthcare solutions."
                    </p>

                    <div className="flex flex-wrap justify-center gap-4 pt-8">
                        <a href={developerDetails.github} target="_blank" rel="noreferrer" className="flex items-center gap-3 px-8 py-3.5 bg-gray-900 text-white rounded-2xl hover:bg-black transition-all shadow-xl shadow-gray-200 hover:-translate-y-1">
                            <GitHubIcon />
                            <span className="font-bold">GitHub</span>
                        </a>
                        <a href={developerDetails.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-3 px-8 py-3.5 bg-[#0077b5] text-white rounded-2xl hover:opacity-90 transition-all shadow-xl shadow-blue-100 hover:-translate-y-1">
                            <LinkedInIcon />
                            <span className="font-bold">LinkedIn</span>
                        </a>
                        <a href={`mailto:${developerDetails.email}`} className="flex items-center gap-3 px-8 py-3.5 bg-[#EA4335] text-white rounded-2xl hover:opacity-90 transition-all shadow-xl shadow-red-100 hover:-translate-y-1">
                            <GmailIcon />
                            <span className="font-bold">Gmail</span>
                        </a>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Contact Registration */}
                <div className="card space-y-6 !rounded-[2rem]">
                    <h3 className="text-xl font-bold text-gray-900 flex items-center gap-3">
                        <UserIcon className="w-6 h-6 text-primary" />
                        Communication Registry
                    </h3>

                    <div className="space-y-4">
                        <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100 hover:bg-white hover:shadow-md transition-all">
                            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                                <GmailIcon className="text-[#EA4335]" />
                            </div>
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Primary Gmail</p>
                                <p className="text-sm font-bold text-gray-900">{developerDetails.email}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100 hover:bg-white hover:shadow-md transition-all">
                            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                                <PhoneIcon className="w-5 h-5 text-gray-400" />
                            </div>
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Mobile Terminal</p>
                                <p className="text-sm font-bold text-gray-900">{developerDetails.phone}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100 hover:bg-white hover:shadow-md transition-all">
                            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                                <AcademicCapIcon className="w-5 h-5 text-gray-400" />
                            </div>
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Project Focus</p>
                                <p className="text-sm font-bold text-gray-900 italic">Advanced LungAI Diagnostic System</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Core Competencies Card */}
                <div className="card space-y-6 bg-[#0f172a] text-white border-none shadow-2xl !rounded-[2rem]">
                    <h3 className="text-xl font-bold flex items-center gap-3">
                        <BoltIcon className="w-6 h-6 text-primary" />
                        System Bio & Skills
                    </h3>
                    <p className="text-gray-300 leading-relaxed italic">
                        "{developerDetails.bio}"
                    </p>

                    <div className="pt-6">
                        <p className="text-[10px] font-black uppercase tracking-widest text-[#38bdf8] mb-4">Core Competencies</p>
                        <div className="flex flex-wrap gap-2">
                            {developerDetails.skills.map(skill => (
                                <span key={skill} className="px-3 py-1 bg-[#1e293b] text-[#38bdf8] rounded-lg text-xs font-bold border border-[#334155] hover:bg-[#334155] transition-colors">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="text-center py-12">
                <p className="text-[10px] font-black uppercase tracking-[0.5em] text-gray-400">
                    Proprietary Design by Gokul M &copy; 2025
                </p>
            </div>
        </div>
    );
}
