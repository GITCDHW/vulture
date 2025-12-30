import { Playfair_Display, Montserrat } from 'next/font/google';
import './globals.css';

// Load fonts using Next.js font optimization
const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair-display',
  weight: ['400', '700']
});

const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat',
  weight: ['400', '500', '700']
});

export const metadata = {
  title: 'Startup Vulnerability Analyzer',
  description: 'Get a critical vulnerability report for your startup idea.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${playfairDisplay.variable} ${montserrat.variable}`}>
      <body className={`min-h-screen antialiased bg-background text-text`}>
        {children}
      </body>
    </html>
  );
}
