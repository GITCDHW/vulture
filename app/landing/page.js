import Hero from '@/components/Hero';
import Features from '@/components/Features';
import CallToAction from '@/components/CallToAction';
import Footer from '@/components/Footer';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-200 antialiased">
      <main className="container mx-auto px-4 py-8 md:py-12">
        <Hero />
        <section className="my-16 md:my-24">
          <Features />
        </section>
        <section className="my-16 md:my-24">
          <CallToAction />
        </section>
      </main>
      <Footer />
    </div>
  );
}