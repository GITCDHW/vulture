import Link from 'next/link';

export default function CallToAction() {
  return (
    <section className="py-16 md:py-24 text-center bg-neutral-900 rounded-xl shadow-2xl border border-neutral-800">
      <h2 className="text-3xl md:text-4xl font-bold text-neutral-50 mb-6 max-w-3xl mx-auto leading-snug px-4">
        Ready to See Your Startup Through a Critical Lens?
      </h2>
      <p className="text-lg md:text-xl text-neutral-400 mb-10 max-w-2xl mx-auto px-4">
        Don't let hidden risks undermine your potential. Get your comprehensive vulnerability score today.
      </p>
      <Link 
        href="/mvp" 
        className="inline-block px-10 py-5 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-full shadow-lg transition-transform transform hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-amber-500 focus:ring-opacity-50 text-xl"
      >
          Start Your Vulture Analysis
      </Link>
    </section>
  );
}