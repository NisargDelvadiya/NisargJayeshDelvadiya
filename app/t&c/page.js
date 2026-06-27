import React from 'react';

export default function TermsAndConditionsPage() {
  return (
    <main className="min-h-screen bg-[#010409] text-zinc-300 py-16 px-6 md:px-12 lg:px-24">
      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* Header Section */}
        <div className="border-b border-zinc-800 pb-8">
          <h1 className="text-4xl font-extrabold text-white tracking-tight mb-4">
            Terms &amp; Conditions
          </h1>
          <p className="text-sm text-zinc-500">
            Last Updated: June 27, 2026
          </p>
        </div>

        {/* Acceptance of Terms */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">1. Acceptance of Terms</h2>
          <p className="leading-relaxed">
            These Terms &amp; Conditions govern your use of the website <strong>NisargJayeshDelvadiya</strong> (accessible via <a href="https://www.nisargjayeshdelvadiya.in" className="text-blue-400 hover:underline">www.nisargjayeshdelvadiya.in</a>). By accessing or using this website, you agree to be bound by these terms, which constitute a legally binding agreement between you and Nisarg Jayesh Delvadiya. 
          </p>
          <p className="leading-relaxed">
            These terms are published in accordance with the provisions of <strong>Rule 3 (1) of the Information Technology (Intermediaries Guidelines and Digital Media Ethics Code) Rules, 2021</strong>, requiring the publishing of rules, regulations, privacy policy, and terms of use for access or usage of this website.
          </p>
        </section>

        {/* User Eligibility */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">2. User Eligibility</h2>
          <p className="leading-relaxed">
            To use this website, you must be at least 18 years of age or accessing it under the supervision and consent of a parent or legal guardian. Under the <strong>Indian Contract Act, 1872</strong>, minors (persons under 18 years of age) are not competent to contract. If you are a minor, you represent that your parent or guardian has read and agreed to these Terms &amp; Conditions on your behalf.
          </p>
        </section>

        {/* Intellectual Property */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">3. Intellectual Property Rights</h2>
          <p className="leading-relaxed">
            Unless otherwise stated, all intellectual property rights, including text, design, graphics, source code, logos, icons, and layout of this website are owned by or licensed to Nisarg Jayesh Delvadiya. You are granted a limited, non-exclusive, non-transferable license to access the site for personal, non-commercial purposes. 
          </p>
          <p className="leading-relaxed">
            Any unauthorized replication, distribution, commercial exploitation, or modifications of the website materials without prior written consent is strictly prohibited under the <strong>Indian Copyright Act, 1957</strong> and relevant trademark laws.
          </p>
        </section>

        {/* Prohibited Activities */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">4. Prohibited Activities</h2>
          <p className="leading-relaxed">
            You agree not to use the website for any unlawful, harmful, or unauthorized purposes. Specifically, you agree not to:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Post, transmit, or submit any content that is offensive, defamatory, obscene, or infringes on any third-party intellectual property or privacy rights.</li>
            <li>Introduce viruses, malware, trojan horses, or engage in denial-of-service (DoS) attacks against this website (prohibited under <strong>Section 43 and Section 66 of the IT Act, 2000</strong>).</li>
            <li>Attempt to gain unauthorized access to our hosting servers, databases, or network configurations.</li>
            <li>Use any automated scraping, data harvesting, or extraction tools without our explicit written permission.</li>
          </ul>
        </section>

        {/* Limitation of Liability */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">5. Disclaimer and Limitation of Liability</h2>
          <p className="leading-relaxed">
            This website and its contents are provided on an "as-is" and "as-available" basis without any express or implied warranties of any kind. 
          </p>
          <p className="leading-relaxed">
            To the maximum extent permitted by applicable Indian laws, Nisarg Jayesh Delvadiya shall not be liable for any direct, indirect, incidental, special, or consequential damages resulting from your use of or inability to use this website, including but not limited to server downtimes, data leaks, or network disruptions.
          </p>
        </section>

        {/* Governing Law and Jurisdiction */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">6. Governing Law and Jurisdiction</h2>
          <p className="leading-relaxed">
            These Terms &amp; Conditions shall be governed by and construed in accordance with the laws of the Republic of India. 
          </p>
          <p className="leading-relaxed">
            Any disputes, controversies, or legal actions arising out of or in connection with the use of this website shall be subject to the exclusive jurisdiction of the competent courts in <strong>Vadodara, Gujarat, Bharat</strong>.
          </p>
        </section>

        {/* Contact Information */}
        <section className="space-y-4 p-6 bg-neutral-900/50 border border-neutral-800 rounded-xl">
          <h2 className="text-2xl font-bold text-white mb-2">7. Contact Details</h2>
          <p className="leading-relaxed mb-4">
            If you have any questions or require clarification regarding these Terms &amp; Conditions, please feel free to reach out to us:
          </p>
          <div className="space-y-1 text-sm">
            <p><strong className="text-white">Name:</strong> Nisarg Jayesh Delvadiya</p>
            <p><strong className="text-white">Email:</strong> <a href="mailto:nisarg.delvadiya1@zohomail.in" className="text-blue-400 hover:underline">nisarg.delvadiya1@zohomail.in</a></p>
            <p><strong className="text-white">Location:</strong> Jaipur, Rajasthan, India</p>
          </div>
        </section>

      </div>
    </main>
  );
}