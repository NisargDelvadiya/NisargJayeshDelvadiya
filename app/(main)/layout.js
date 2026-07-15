import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import BackgroundElements from "@/app/components/BackgroundElements";
import CookieConsent from "@/app/components/CookieConsent";

export default function MainLayout({ children }) {
  return (
    <>
      <BackgroundElements />
      <Navbar />
      <main id="main-content" className="min-h-[80.8vh] relative z-10">
        {children}
      </main>
      <Footer />
      <CookieConsent />
    </>
  );
}
