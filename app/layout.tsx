import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CookieBanner from '@/components/CookieBanner';

export const metadata: Metadata = {
  title: 'PropEngine Hub — Real Estate Operator Growth & Underwriting Engine',
  description: 'Programmatic real estate software growth engine, deal ROI & BRRRR calculator, and verified lead capture platform for investors, agents, and landlords.',
  keywords: [
    'BRRRR calculator',
    'real estate deal analysis',
    'real estate software',
    'DealCheck review',
    'Showcase IDX',
    'Carrot real estate',
    'Meta CAPI lead generation',
    'WhatsApp real estate bot',
    'DSCR refinance calculator',
  ],
  authors: [{ name: 'PropEngine Hub Technical Research' }],
  openGraph: {
    title: 'PropEngine Hub — Real Estate Operator Growth & Underwriting Engine',
    description: 'Programmatic real estate software growth engine, deal ROI & BRRRR calculator, and verified lead capture platform for investors, agents, and landlords.',
    type: 'website',
    url: 'https://propenginehub.com',
    siteName: 'PropEngine Hub',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PropEngine Hub — Real Estate Operator Growth & Underwriting Engine',
    description: 'Programmatic real estate software growth engine, deal ROI & BRRRR calculator, and verified lead capture platform.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLdOrg = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'PropEngine Hub',
    url: 'https://propenginehub.com',
    logo: 'https://propenginehub.com/logo.png',
    description: 'The programmatic real estate software growth engine, deal ROI & BRRRR calculator, and verified lead capture platform.',
    sameAs: ['https://twitter.com/propenginehub', 'https://linkedin.com/company/propenginehub'],
  };

  const jsonLdWebsite = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'PropEngine Hub',
    url: 'https://propenginehub.com',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://propenginehub.com/tools?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <html lang="en" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrg) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebsite) }}
        />
      </head>
      <body className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans antialiased selection:bg-emerald-500 selection:text-slate-950" suppressHydrationWarning>
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <CookieBanner />
      </body>
    </html>
  );
}
