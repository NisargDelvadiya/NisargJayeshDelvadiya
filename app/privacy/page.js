import React from 'react';

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-[#010409] text-zinc-300 py-16 px-6 md:px-12 lg:px-24">
      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* Header Section */}
        <div className="border-b border-zinc-800 pb-8">
          <h1 className="text-4xl font-extrabold text-white tracking-tight mb-4">
            Privacy Policy
          </h1>
          <p className="text-sm text-zinc-500">
            Last Updated: June 27, 2026
          </p>
        </div>

        {/* Introduction */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">1. Introduction</h2>
          <p className="leading-relaxed">
            Welcome to <strong>NisargJayeshDelvadiya</strong> (accessible via <a href="https://www.nisargjayeshdelvadiya.com" title="Go to https://www.nisargjayeshdelvadiya.com" className="text-blue-400 hover:underline cursor-pointer">www.nisargjayeshdelvadiya.com</a>). We respect your privacy and are committed to protecting your personal data. 
          </p>
          <p className="leading-relaxed">
            This Privacy Policy explains how we collect, use, disclose, and safeguard your personal information when you visit our website, in compliance with the <strong>Information Technology Act, 2000</strong>, the <strong>Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011 (SPDI Rules)</strong>, and the <strong>Digital Personal Data Protection Act, 2023 (DPDP Act)</strong> of India.
          </p>
        </section>

        {/* Data Collection */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">2. Information We Collect</h2>
          <p className="leading-relaxed">
            We only collect personal information that you voluntarily provide to us when you interact with our website (e.g., when submitting the contact form). This information may include:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Identity Data:</strong> Full Name.</li>
            <li><strong>Contact Data:</strong> Email Address.</li>
            <li><strong>Communication Data:</strong> The subject and content of any messages or inquiries you send to us.</li>
          </ul>
        </section>

        {/* Purpose of Processing */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">3. How We Use Your Information</h2>
          <p className="leading-relaxed">
            We process your personal data for the following lawful and legitimate purposes:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>To respond to your messages, feedback, or inquiries submitted via our contact form.</li>
            <li>To maintain and improve the user experience and functionality of our website.</li>
            <li>To comply with applicable legal obligations or law enforcement requests under Indian jurisdiction.</li>
          </ul>
        </section>

        {/* Consent and Rights */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">4. Your Rights under the DPDP Act, 2023</h2>
          <p className="leading-relaxed">
            In accordance with the Digital Personal Data Protection Act, 2023, you hold the following rights regarding your personal data:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Right to Access:</strong> You can request summary details of the personal data we hold about you and the processing activities.</li>
            <li><strong>Right to Correction and Erasure:</strong> You have the right to request correction of inaccurate data or deletion of your personal data when it is no longer required for the purpose it was collected.</li>
            <li><strong>Right to Withdraw Consent:</strong> You may withdraw your consent for data processing at any time. Upon withdrawal, we will cease processing your data unless required under law.</li>
            <li><strong>Right to Grievance Redressal:</strong> You have the right to address any grievances regarding data processing with our Grievance Officer.</li>
          </ul>
        </section>

        {/* Data Protection & Security */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">5. Data Security</h2>
          <p className="leading-relaxed">
            We implement appropriate technical and organizational security measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction. We limit access to your personal data to individuals who have a legitimate business need to know.
          </p>
        </section>

        {/* Sharing and Disclosure */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">6. Sharing of Personal Data</h2>
          <p className="leading-relaxed">
            We do not sell, trade, or rent your personal data to third parties. We may disclose your personal information only:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>To trusted service providers (such as hosting and email service utilities) who assist us in operating our website under confidentiality agreements.</li>
            <li>When required by court order, government mandate, or applicable laws in India.</li>
          </ul>
        </section>

        {/* Grievance Officer */}
        <section className="space-y-4 p-6 bg-neutral-900/50 border border-neutral-800 rounded-xl">
          <h2 className="text-2xl font-bold text-white mb-2">7. Grievance Officer</h2>
          <p className="leading-relaxed mb-4">
            Under the Information Technology Act, 2000 and the Rules made thereunder, if you have any questions, feedback, or complaints regarding this Privacy Policy or data handling practices, you may contact our designated Grievance Officer:
          </p>
          <div className="space-y-1 text-sm">
            <p><strong className="text-white">Name:</strong> Nisarg Jayesh Delvadiya</p>
            <p><strong className="text-white">Email:</strong> <a href="mailto:nisarg.delvadiya1@zohomail.in" title="Go to mailto:nisarg.delvadiya1@zohomail.in" className="text-blue-400 hover:underline cursor-pointer">nisarg.delvadiya1@zohomail.in</a></p>
            <p><strong className="text-white">Address:</strong> Vadodara, Gujarat, Bharat</p>
          </div>
        </section>

      </div>
    </main>
  );
}