import { ArrowRight } from "lucide-react";
import Link from "next/link";

export const Hero = () => {
  return (
    <section className="min-h-[80vh] flex flex-col items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-violet-950 to-zinc-900 pointer-events-none" />
      <div className="relative z-10 text-center max-w-4xl mx-auto animate-fade-in">
        <span className="inline-block px-4 py-1.5 mb-6 text-sm font-medium bg-violet-900/50 text-violet-200 rounded-full">
          Launching Soon
        </span>
        <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight text-white">
          Collaborative Drawing
          <br /> Made Simple
        </h1>
        <p className="text-lg md:text-xl text-zinc-300 mb-8 max-w-2xl mx-auto">
          Create, collaborate, and share beautiful drawings with your team in real-time.
          No complex tools, just pure creativity.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link href="/signup">
          <button className="inline-flex items-center px-6 py-3 bg-violet-600 hover:bg-violet-700 text-white rounded-lg font-medium transition-all hover:scale-105">
            Get Started Free
            <ArrowRight className="ml-2 h-5 w-5" />
          </button>
        </Link>
          <button className="inline-flex items-center px-6 py-3 border-2 border-zinc-700 rounded-lg font-medium text-white transition-colors hover:bg-zinc-800">
            Watch Demo
          </button>
        </div>
      </div>
    </section>
  );
};