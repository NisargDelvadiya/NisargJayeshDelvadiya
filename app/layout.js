import "./globals.css";
import PwaRegister from "@/app/components/PwaRegister";

export const viewport = {
  themeColor: "#010409",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

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
    capable: true,
    statusBarStyle: "black-translucent",
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
        <PwaRegister />
        {children}
      </body>
    </html>
  );
}
