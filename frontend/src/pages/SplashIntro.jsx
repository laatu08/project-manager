import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function SplashIntro() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/gallery");
    }, 5000); // 5 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 text-white animate-fadeIn relative">

      {/* Glow circles */}
      <div className="absolute w-96 h-96 bg-blue-600 opacity-20 rounded-full blur-3xl top-10 left-10"></div>
      <div className="absolute w-80 h-80 bg-purple-600 opacity-20 rounded-full blur-3xl bottom-10 right-10"></div>

      <h1 className="text-5xl md:text-7xl font-extrabold drop-shadow-lg tracking-wide text-center">
        Partha Borah
      </h1>

      <p className="mt-4 text-xl md:text-2xl opacity-90 tracking-wide">
        Software Developer • Project Gallery
      </p>

      {/* Typing effect */}
      <div className="mt-6 text-lg md:text-xl text-blue-300 font-mono animate-pulse">
        Loading the project showcase...
      </div>

      <button
        onClick={() => navigate("/gallery")}
        className="mt-10 px-6 py-3 bg-white/10 border border-white/20 rounded-lg hover:bg-white/20 transition"
      >
        Skip Intro →
      </button>

      {/* Bottom info */}
      <div className="absolute bottom-6 text-sm text-gray-400">
        © {new Date().getFullYear()} Partha Borah
      </div>
    </div>
  );
}
