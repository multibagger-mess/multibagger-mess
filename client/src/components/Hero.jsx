function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 px-6">
      <div className="max-w-2xl bg-white rounded-3xl shadow-xl p-10 text-center">

        <div className="text-6xl mb-5">🏠</div>

        <h1 className="text-5xl font-bold text-blue-700">
          The Multi-Bagger Mess
        </h1>

        <h2 className="text-xl font-semibold text-gray-700 mt-4">
          A Clean, Comfortable and Student-Friendly Boys' Mess
        </h2>

        <p className="text-gray-600 mt-6 leading-8">
          Welcome to The Multi-Bagger Mess. We provide a clean,
          comfortable and peaceful environment where boys can stay
          comfortably and focus on their studies.
        </p>

        <button className="mt-8 bg-blue-600 text-white px-8 py-3 rounded-xl hover:bg-blue-700 transition duration-300">
          Request Access to View Details
        </button>

        <p className="mt-8 text-gray-500">
          📍 Ketika, Purulia
        </p>

      </div>
    </section>
  );
}

export default Hero;