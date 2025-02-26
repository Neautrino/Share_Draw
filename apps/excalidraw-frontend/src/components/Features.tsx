import { Check } from "lucide-react";

export const Features = () => {
  const features = [
    {
      title: "Real-time Collaboration",
      description: "Work together with your team in real-time, seeing changes as they happen."
    },
    {
      title: "Intuitive Interface",
      description: "Simple and clean interface that gets out of your way, letting you focus on creation."
    },
    {
      title: "Version History",
      description: "Keep track of changes and restore previous versions with ease."
    }
  ];

  return (
    <section className="py-24 px-4 bg-zinc-900">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Everything you need to create
          </h2>
          <p className="text-zinc-300 max-w-2xl mx-auto">
            Powerful features wrapped in a simple interface, giving you the perfect balance of functionality and ease of use.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 rounded-xl border border-zinc-800 bg-zinc-800/50 shadow-sm hover:shadow-md transition-all duration-200 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-12 h-12 bg-violet-900/50 rounded-lg flex items-center justify-center mb-4">
                <Check className="w-6 h-6 text-violet-300" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">
                {feature.title}
              </h3>
              <p className="text-zinc-300">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};