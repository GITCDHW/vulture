'use client';

import React, { useState } from 'react';
import axios from 'axios';

const IdeaInputForm = ({ onReportGenerated }) => {
  const [idea, setIdea] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const response = await axios.post('/api/assess-idea', { idea }, {
        responseType: 'blob', // Important: expect a blob for PDF
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
      const pdfUrl = URL.createObjectURL(pdfBlob);

      onReportGenerated(pdfUrl);
      setIdea(''); // Clear the input after submission

    } catch (err) {
      console.error('Error generating report:', err);
      if (err.response && err.response.data) {
        // Attempt to parse error message from blob if it's JSON
        const reader = new FileReader();
        reader.onload = function() {
          try {
            const errorText = JSON.parse(reader.result).error;
            setError(errorText || 'Failed to generate report. Please try again.');
          } catch (e) {
            setError('Failed to generate report. Please try again.');
          }
        };
        reader.readAsText(err.response.data);
      } else {
        setError('Network error or server unavailable. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mt-8 mb-16 p-8 border-elegant">
      <h2 className="text-3xl font-heading text-primary mb-6 text-center">
        Submit Your Startup Idea
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="idea" className="block text-lg font-body text-text mb-2">
            Describe your startup idea:
          </label>
          <textarea
            id="idea"
            className="w-full p-4 h-48 border border-gray-300 rounded-md bg-gray-50 focus:ring-2 focus:ring-primary focus:border-transparent transition duration-200 resize-y font-body text-text"
            placeholder="e.g., A mobile app that connects local farmers directly with consumers for fresh produce delivery, bypassing supermarkets."
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            required
            disabled={isLoading}
          ></textarea>
        </div>
        {error && (
          <div className="bg-accent/10 border border-accent text-accent p-4 rounded-md font-body text-sm">
            {error}
          </div>
        )}
        <button
          type="submit"
          className="w-full py-3 px-6 bg-primary text-white font-body font-semibold rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isLoading || !idea.trim()}
        >
          {isLoading ? 'Generating Report...' : 'Analyze Idea'}
        </button>
      </form>
    </div>
  );
};

export default IdeaInputForm;
