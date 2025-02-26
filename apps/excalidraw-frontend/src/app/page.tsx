import { ThemeProvider } from "next-themes";
import { Hero } from "../components/Hero";
import { Features } from "../components/Features";
import { Demo } from "../components/Demo";

const Index = () => {
  return (
    <main className="min-h-screen bg-zinc-900">
      <Hero />
      <Features />
      <Demo />
    </main>
  );
};

export default Index;