export const Demo = () => {
    return (
      <section className="py-24 px-4 bg-zinc-800">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              See it in action
            </h2>
            <p className="text-zinc-300 max-w-2xl mx-auto">
              Watch how easy it is to create and collaborate on beautiful drawings.
            </p>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-2xl animate-fade-in">
            <img
              src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b"
              alt="Excalidraw Demo"
              className="w-full h-[600px] object-cover"
            />
          </div>
        </div>
      </section>
    );
  };