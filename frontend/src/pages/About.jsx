import {
    UserIcon,
    LinkIcon,
    EnvelopeIcon,
    PhoneIcon,
    CodeBracketIcon,
    AcademicCapIcon
} from '@heroicons/react/24/outline';

const developerDetails = {
    name: "GOKUL M",
    role: "Full Stack MERN Developer",
    email: "gokulxmg26@gmail.com",
    phone: "+91 6382024508", // Added phone as per user request (placeholders if not provided, but they gave email/socials)
    linkedin: "https://www.linkedin.com/in/gokul-m-7b881629b/",
    github: "https://github.com/gokulm-dev-official",
    skills: ["React", "Express.js", "MongoDB", "Node.js", "Python", "TensorFlow"],
    bio: "Passionate developer specialized in building AI-integrated medical healthcare systems and high-performance web applications."
};

export default function About() {
    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-in-up">
            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl shadow-blue-500/5 border border-gray-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full -mr-16 -mt-16 blur-3xl"></div>

                <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
                    <div className="w-40 h-40 bg-gradient-to-br from-primary to-blue-600 rounded-3xl flex items-center justify-center text-white text-6xl font-black shadow-2xl shadow-primary/30">
                        {developerDetails.name.charAt(0)}
                    </div>

                    <div className="text-center md:text-left space-y-2">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-primary text-xs font-bold uppercase tracking-widest">
                            Lead Architect
                        </div>
                        <h1 className="text-4xl font-black text-gray-900 tracking-tight">{developerDetails.name}</h1>
                        <p className="text-lg text-gray-500 font-medium">{developerDetails.role}</p>

                        <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-4">
                            <a href={developerDetails.github} target="_blank" rel="noreferrer" className="p-3 bg-gray-50 hover:bg-gray-100 rounded-xl transition-all text-gray-900 shadow-sm border border-gray-100">
                                <CodeBracketIcon className="w-5 h-5" />
                            </a>
                            <a href={developerDetails.linkedin} target="_blank" rel="noreferrer" className="p-3 bg-gray-50 hover:bg-gray-100 rounded-xl transition-all text-blue-600 shadow-sm border border-gray-100">
                                <LinkIcon className="w-5 h-5" />
                            </a>
                            <a href={`mailto:${developerDetails.email}`} className="p-3 bg-gray-50 hover:bg-gray-100 rounded-xl transition-all text-red-500 shadow-sm border border-gray-100">
                                <EnvelopeIcon className="w-5 h-5" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Contact Section */}
                <div className="card space-y-6">
                    <h3 className="text-xl font-bold text-gray-900 flex items-center gap-3">
                        <UserIcon className="w-6 h-6 text-primary" />
                        Communication Registry
                    </h3>

                    <div className="space-y-4">
                        <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                                <EnvelopeIcon className="w-5 h-5 text-gray-400" />
                            </div>
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Primary Email</p>
                                <p className="text-sm font-bold text-gray-900">{developerDetails.email}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                                <PhoneIcon className="w-5 h-5 text-gray-400" />
                            </div>
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Mobile Terminal</p>
                                <p className="text-sm font-bold text-gray-900">{developerDetails.phone}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
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

                {/* Bio / Mission */}
                <div className="card space-y-6 bg-gray-900 text-white border-none shadow-2xl">
                    <h3 className="text-xl font-bold flex items-center gap-3">
                        <BoltIcon className="w-6 h-6 text-primary" />
                        System Bio
                    </h3>
                    <p className="text-gray-400 leading-relaxed italic">
                        "{developerDetails.bio}"
                    </p>

                    <div className="pt-6">
                        <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-4">Core Competencies</p>
                        <div className="flex flex-wrap gap-2">
                            {developerDetails.skills.map(skill => (
                                <span key={skill} className="px-3 py-1 bg-white/10 rounded-lg text-xs font-bold border border-white/5">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="text-center py-8">
                <p className="text-xs text-gray-400 font-medium">Developed with ❤️ by {developerDetails.name}</p>
                <div className="flex justify-center gap-4 mt-4 opacity-30 grayscale hover:grayscale-0 hover:opacity-100 transition-all cursor-crosshair">
                    {/* Subtle tech stack logos could go here if available */}
                </div>
            </div>
        </div>
    );
}
