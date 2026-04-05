import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "@/components/layout/Providers";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Kristian Reformis | Fullstack Developer",
    template: "%s | Kristian Reformis",
  },
  description: "Fullstack Developer specializing in Next.js, TypeScript, and modern web technologies. Building scalable applications with clean code.",
  keywords: ["fullstack developer", "next.js", "typescript", "react", "web developer", "portfolio"],
  authors: [{ name: "Kristian Reformis" }],
  creator: "Kristian Reformis",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://tianreformis.vercel.app",
    title: "Kristian Reformis | Fullstack Developer",
    description: "Fullstack Developer specializing in Next.js, TypeScript, and modern web technologies.",
    siteName: "Kristian Reformis Portfolio",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Kristian Reformis - Fullstack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kristian Reformis | Fullstack Developer",
    description: "Fullstack Developer specializing in Next.js, TypeScript, and modern web technologies.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme') || 'system';
                  var resolved = theme;
                  if (theme === 'system') {
                    resolved = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                  }
                  document.documentElement.classList.add(resolved);
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <Providers>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
