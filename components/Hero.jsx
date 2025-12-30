import React from 'react';

const Hero = () => {
  return (
    <section className="text-center py-16 px-4 bg-background border-b border-secondary">
      <h1 className="text-5xl font-heading text-primary mb-4 leading-tight">
        Startup Vulnerability Analyzer
      </h1>
      <p className="text-xl font-body text-text max-w-2xl mx-auto">
        Input your startup idea and let our AI act as a devil's advocate,
        generating critical questions and a comprehensive risk analysis report.
      </p>
    </section>
  );
};

export default Hero;
