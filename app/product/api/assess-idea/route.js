import { NextResponse } from 'next/server';
import axios from 'axios';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

// Ensure LLM_API_KEY is available as an environment variable
const LLM_API_KEY = process.env.LLM_API_KEY;
const LLM_API_ENDPOINT = 'https://api.openai.com/v1/chat/completions'; // Example LLM endpoint

export async function POST(request) {
  if (!LLM_API_KEY) {
    return NextResponse.json(
      { error: 'Server configuration error: LLM API Key not set.' },
      { status: 500 }
    );
  }

  try {
    const { idea } = await request.json();

    if (!idea || typeof idea !== 'string' || idea.trim().length === 0) {
      return NextResponse.json(
        { error: 'Invalid input: "idea" is required and must be a non-empty string.' },
        { status: 400 }
      );
    }

    // 1. Interact with external LLM service
    const prompt = `Act as a highly critical devil's advocate for a startup idea.
    Your goal is to find severe vulnerabilities and weaknesses.
    For the following startup idea: "${idea}"

    Provide two sections:
    1. Critical Questions: List exactly 5 tough, probing, and insightful questions that challenge the core assumptions and potential success of the idea. Each question should be numbered.
    2. Risk Analysis: Perform a concise risk analysis focusing on three key areas:
       a. Market Size & Opportunity: Is the market large enough? Are there significant barriers to entry? Is it a fad?
       b. Moat & Competitive Advantage: What prevents others from copying? Is there a sustainable differentiator? How strong are existing competitors?
       c. Technical Difficulty & Execution: How hard is it to build? Are there significant technical hurdles or dependencies? What are the common pitfalls in execution?

    Format your response as a JSON object with two keys: "questions" (an array of strings) and "analysis" (a string containing the formatted risk analysis).`;

    const llmResponse = await axios.post(
      LLM_API_ENDPOINT,
      {
        model: 'gpt-4o-mini', // Or another suitable model like gpt-3.5-turbo
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
        response_format: { type: "json_object" } // Request JSON output from OpenAI
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${LLM_API_KEY}`,
        },
      }
    );

    const llmContent = llmResponse.data.choices[0].message.content;
    const { questions, analysis } = JSON.parse(llmContent);

    // 2. Generate PDF report using pdf-lib
    const pdfDoc = await PDFDocument.create();
    let page = pdfDoc.addPage();

    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

    // Convert hex colors to rgb(0-1) for pdf-lib
    const primaryColor = rgb(26 / 255, 35 / 255, 126 / 255); // #1A237E
    const accentColor = rgb(183 / 255, 28 / 255, 28 / 255); // #B71C1C
    const textColor = rgb(33 / 255, 33 / 255, 33 / 255);   // #212121
    // const secondaryColor = rgb(197 / 255, 174 / 255, 125 / 255); // #C5AE7D (not directly used for text, but available)

    let y = page.getHeight() - 50;
    const margin = 50;
    const lineGap = 12; // Gap between lines of text
    const paragraphGap = 20; // Gap between sections/paragraphs
    const textWidth = page.getWidth() - 2 * margin;

    const addPageIfNeeded = () => {
      if (y < margin + 50) { // Keep some space for footer
        const currentPageNum = pdfDoc.getPages().indexOf(page) + 1;
        page.drawText(`Page ${currentPageNum}`, { x: page.getWidth() - margin - 30, y: margin / 2, size: 8, font: font, color: rgb(0.5, 0.5, 0.5) });
        page = pdfDoc.addPage();
        y = page.getHeight() - margin;
        return true;
      }
      return false;
    };

    // Title
    page.drawText('Startup Vulnerability Report', {
      x: margin,
      y: y,
      font: fontBold,
      size: 28,
      color: primaryColor,
    });
    y -= 40; // Space after title

    // Idea Description
    addPageIfNeeded();
    page.drawText('Idea Submitted:', {
      x: margin,
      y: y,
      font: fontBold,
      size: 14,
      color: textColor,
    });
    y -= lineGap;
    const ideaLines = font.splitTextIntoTextLines(idea, { maxWidth: textWidth, fontSize: 12 });
    for (const line of ideaLines) {
      addPageIfNeeded();
      page.drawText(line, {
        x: margin,
        y: y,
        font: font,
        size: 12,
        color: textColor,
        lineHeight: lineGap,
      });
      y -= lineGap;
    }
    y -= paragraphGap; // Space after idea

    // Critical Questions
    addPageIfNeeded();
    page.drawText('Critical Questions:', {
      x: margin,
      y: y,
      font: fontBold,
      size: 18,
      color: accentColor,
    });
    y -= paragraphGap;

    for (let i = 0; i < questions.length; i++) {
      const questionText = `${i + 1}. ${questions[i]}`;
      const questionLines = font.splitTextIntoTextLines(questionText, { maxWidth: textWidth, fontSize: 12 });
      for (const line of questionLines) {
        addPageIfNeeded();
        page.drawText(line, {
          x: margin,
          y: y,
          font: font,
          size: 12,
          color: textColor,
          lineHeight: lineGap,
        });
        y -= lineGap;
      }
      y -= lineGap; // Extra space between questions
    }
    y -= paragraphGap; // Space after questions

    // Risk Analysis
    addPageIfNeeded();
    page.drawText('Risk Analysis:', {
      x: margin,
      y: y,
      font: fontBold,
      size: 18,
      color: accentColor,
    });
    y -= paragraphGap;

    const analysisLines = font.splitTextIntoTextLines(analysis, { maxWidth: textWidth, fontSize: 12 });
    for (const line of analysisLines) {
      addPageIfNeeded();
      page.drawText(line, {
        x: margin,
        y: y,
        font: font,
        size: 12,
        color: textColor,
        lineHeight: lineGap,
      });
      y -= lineGap;
    }

    // Add page numbers to all pages
    const totalPages = pdfDoc.getPages().length;
    pdfDoc.getPages().forEach((p, i) => {
      p.drawText(`Page ${i + 1} of ${totalPages}`, {
        x: p.getWidth() / 2 - 25,
        y: 25,
        font: font,
        size: 8,
        color: rgb(0.5, 0.5, 0.5),
      });
    });

    const pdfBytes = await pdfDoc.save();

    // 3. Return PDF as a Buffer
    return new NextResponse(Buffer.from(pdfBytes), {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="startup_vulnerability_report.pdf"',
      },
    });

  } catch (error) {
    console.error('Error in API route /api/assess-idea:', error);
    if (error.response?.data) {
        console.error('LLM API Error Details:', error.response.data);
    }
    return NextResponse.json(
      { error: 'Failed to generate report due to an internal server error. Please try again.' },
      { status: 500 }
    );
  }
}
