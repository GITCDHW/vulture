'use client';

import { useState } from 'react';
import Hero from '@/components/Hero';
import IdeaInputForm from '@/components/IdeaInputForm';
import VulnerabilityReportDisplay from '@/components/VulnerabilityReportDisplay';

export default function HomePage() {
  const [pdfReportUrl, setPdfReportUrl] = useState(null);

  const handleReportGenerated = (url) => {
    setPdfReportUrl(url);
  };

  const handleReset = () => {
    setPdfReportUrl(null);
  };

  return (
    <main className="flex flex-col items-center justify-start min-h-screen">
      <Hero />
      {!pdfReportUrl ? (
        <IdeaInputForm onReportGenerated={handleReportGenerated} />
      ) : (
        <VulnerabilityReportDisplay pdfUrl={pdfReportUrl} onReset={handleReset} />
      )}
    </main>
  );
}
