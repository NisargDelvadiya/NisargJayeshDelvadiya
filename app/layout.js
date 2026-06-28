import "./globals.css";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import BackgroundElements from "@/app/components/BackgroundElements";

export const metadata = {
  metadataBase: new URL('https://www.nisargjayeshdelvadiya.com'),
  title: "Nisarg Jayesh Delvadiya | Web Developer Portfolio",
  description: "Explore my web development projects, skills, and educational background.",
  keywords: ["Nisarg Jayesh Delvadiya", "Web Developer", "Frontend Developer", "Next.js", "React Developer", "Portfolio", "Software Engineer"],
  authors: [{ name: "Nisarg Jayesh Delvadiya" }],
  creator: "Nisarg Jayesh Delvadiya",
  openGraph: {
    title: "Nisarg Jayesh Delvadiya | Web Developer Portfolio",
    description: "Explore my web development projects, skills, and educational background.",
    url: "https://www.nisargjayeshdelvadiya.com",
    siteName: "Nisarg Jayesh Delvadiya",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nisarg Jayesh Delvadiya | Web Developer Portfolio",
    description: "Explore my web development projects, skills, and educational background.",
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
  appleWebApp: {
    title: "NisargJayeshDelvadiya",
  },
  manifest: "/Assets/favicon/site.webmanifest?v=20260625",
  icons: {
    icon: [
      { url: "/Assets/favicon/favicon-96x96.png?v=20260625", sizes: "96x96", type: "image/png" },
      { url: "/Assets/favicon/favicon.svg?v=20260625", type: "image/svg+xml" },
    ],
    shortcut: "/Assets/favicon/favicon.ico?v=20260625",
    apple: { url: "/Assets/favicon/apple-touch-icon.png?v=20260625", sizes: "180x180" },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="text-white bg-[#010409]">
        <BackgroundElements />

        <Navbar />
        
        <main className="min-h-[80.8vh] relative z-10">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}
