import {
  Instagram,
  Twitter,
  Linkedin,
  Github,
  Mail,
  Youtube,
  Globe,
} from "lucide-react";

function App() {
  const socialLinks = [
    {
      name: "Instagram",
      icon: Instagram,
      url: "#",
      color: "hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500",
    },
    { name: "Twitter", icon: Twitter, url: "#", color: "hover:bg-sky-400" },
    { name: "LinkedIn", icon: Linkedin, url: "#", color: "hover:bg-blue-600" },
    { name: "GitHub", icon: Github, url: "#", color: "hover:bg-gray-800" },
    { name: "YouTube", icon: Youtube, url: "#", color: "hover:bg-red-600" },
    { name: "Website", icon: Globe, url: "#", color: "hover:bg-emerald-500" },
    { name: "Email", icon: Mail, url: "#", color: "hover:bg-orange-500" },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center p-6">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage:
            "url(https://images.pexels.com/photos/1229042/pexels-photo-1229042.jpeg?auto=compress&cs=tinysrgb&w=1920)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-orange-900/80 via-rose-900/70 to-amber-900/80 backdrop-blur-sm"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20">
          <div className="flex flex-col items-center space-y-6">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-amber-400 via-orange-500 to-rose-500 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
              <img
                src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=300"
                alt="Profile"
                className="relative w-32 h-32 rounded-full object-cover border-4 border-white/50 shadow-xl"
              />
            </div>

            <div className="text-center space-y-2">
              <h1 className="text-3xl font-bold text-white drop-shadow-lg">
                Alex Morgan
              </h1>
              <p className="text-amber-100 text-sm font-medium">
                Digital Creator & Developer
              </p>
            </div>

            <div className="w-full space-y-3 mt-8">
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.name}
                    href={link.url}
                    className={`group flex items-center justify-center space-x-3 w-full bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl py-4 px-6 transition-all duration-300 hover:scale-105 hover:shadow-xl ${link.color} hover:border-white/50`}
                  >
                    <Icon className="w-5 h-5 text-white" />
                    <span className="text-white font-semibold">
                      {link.name}
                    </span>
                  </a>
                );
              })}
            </div>

            <div className="pt-6">
              <p className="text-amber-100/80 text-xs text-center">
                Connect with me on your favorite platform
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
