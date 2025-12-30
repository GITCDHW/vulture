import Link from 'next/link';

export default function Hero() {
  return (
    <section className="text-center py-16 md:py-24 lg:py-32 bg-gradient-to-br from-neutral-900 to-neutral-950 rounded-xl shadow-2xl border border-neutral-800">
      <h1 className="text-4xl md:text-6xl font-bold text-amber-500 mb-4 tracking-tight leading-tight">
        Vulture
      </h1>
      <p className="text-xl md:text-3xl text-neutral-200 mb-8 max-w-3xl mx-auto font-medium">
        Your Unbiased Devil's Advocate for Startup Ideas.
      </p>
      <p className="text-md md:text-xl text-neutral-400 mb-10 max-w-2xl mx-auto leading-relaxed px-4">
        Instead of false praise, Vulture meticulously examines your startup concept, asking the tough questions to uncover hidden vulnerabilities before they become critical.
      </p>
      <Link 
        href="/mvp" 
        className="inline-block px-8 py-4 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-full shadow-lg transition-transform transform hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-amber-500 focus:ring-opacity-50 text-lg"
      >
          Get Your Vulnerability Score
      </Link>
    </section>
  );
}