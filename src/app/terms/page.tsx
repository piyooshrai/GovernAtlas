import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service | GovernAtlas',
  description: 'Terms of service for using GovernAtlas.',
};

export default function TermsPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="bg-white rounded-lg border border-gray-200 p-8 md:p-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Terms of Service</h1>
          <p className="text-sm text-gray-500 mb-8">Last updated: December 1, 2024</p>

          <div className="prose prose-gray max-w-none">
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">1. Agreement to Terms</h2>
              <p className="text-gray-600 mb-4">
                These Terms of Service (&quot;Terms&quot;) constitute a legally binding agreement between you
                and The Algorithm (&quot;Company,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;), concerning your access to and
                use of the GovernAtlas website at governatlas.com (the &quot;Site&quot;) and any related
                services (collectively, the &quot;Services&quot;).
              </p>
              <p className="text-gray-600">
                By accessing or using the Services, you agree to be bound by these Terms. If you
                do not agree to these Terms, you must not access or use the Services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">2. Use of Services</h2>

              <h3 className="text-lg font-medium text-gray-900 mb-2">2.1 Eligibility</h3>
              <p className="text-gray-600 mb-4">
                You must be at least 18 years old to use our Services. By using our Services, you
                represent and warrant that you are at least 18 years of age and have the legal
                capacity to enter into these Terms.
              </p>

              <h3 className="text-lg font-medium text-gray-900 mb-2">2.2 Account Registration</h3>
              <p className="text-gray-600 mb-4">
                To access certain features of the Services, you may be required to register for an
                account. You agree to provide accurate, current, and complete information during
                registration and to update such information to keep it accurate, current, and complete.
              </p>

              <h3 className="text-lg font-medium text-gray-900 mb-2">2.3 Account Security</h3>
              <p className="text-gray-600">
                You are responsible for safeguarding your account credentials and for all activities
                that occur under your account. You must notify us immediately of any unauthorized use
                of your account.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">3. User Accounts</h2>

              <h3 className="text-lg font-medium text-gray-900 mb-2">3.1 Buyer Accounts</h3>
              <p className="text-gray-600 mb-4">
                Buyer accounts allow users to browse tools, write reviews, save favorites, and compare
                tools. Reviews must be honest, accurate, and based on actual experience with the tools.
              </p>

              <h3 className="text-lg font-medium text-gray-900 mb-2">3.2 Vendor Accounts</h3>
              <p className="text-gray-600">
                Vendor accounts allow AI tool providers to submit listings, manage their profiles, and
                respond to reviews. Vendors are responsible for ensuring all information in their
                listings is accurate and up-to-date.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">4. Vendor Listings</h2>

              <h3 className="text-lg font-medium text-gray-900 mb-2">4.1 Submission Requirements</h3>
              <p className="text-gray-600 mb-4">
                Vendors submitting listings must provide accurate information about their company,
                products, certifications, and compliance status. False or misleading information may
                result in listing removal and account termination.
              </p>

              <h3 className="text-lg font-medium text-gray-900 mb-2">4.2 Verification</h3>
              <p className="text-gray-600 mb-4">
                We may verify certification claims and other information provided by vendors. Vendors
                agree to cooperate with verification requests and provide documentation as needed.
              </p>

              <h3 className="text-lg font-medium text-gray-900 mb-2">4.3 Listing Removal</h3>
              <p className="text-gray-600">
                We reserve the right to remove any listing at our discretion, including listings that
                contain inaccurate information, violate these Terms, or are otherwise objectionable.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">5. User Content</h2>

              <h3 className="text-lg font-medium text-gray-900 mb-2">5.1 Reviews and Comments</h3>
              <p className="text-gray-600 mb-4">
                Users may submit reviews, comments, and other content (&quot;User Content&quot;). You retain
                ownership of your User Content, but grant us a worldwide, non-exclusive, royalty-free
                license to use, display, and distribute your User Content in connection with the Services.
              </p>

              <h3 className="text-lg font-medium text-gray-900 mb-2">5.2 Content Standards</h3>
              <p className="text-gray-600 mb-4">User Content must not:</p>
              <ul className="list-disc list-inside text-gray-600 mb-4 space-y-1">
                <li>Be false, misleading, or inaccurate</li>
                <li>Be defamatory, obscene, or offensive</li>
                <li>Infringe any intellectual property rights</li>
                <li>Contain malware or harmful code</li>
                <li>Violate any applicable law or regulation</li>
                <li>Impersonate any person or entity</li>
              </ul>

              <h3 className="text-lg font-medium text-gray-900 mb-2">5.3 Content Moderation</h3>
              <p className="text-gray-600">
                We reserve the right to moderate, edit, or remove User Content that violates these
                Terms or is otherwise objectionable. We are not obligated to monitor all User Content.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">6. Intellectual Property</h2>

              <h3 className="text-lg font-medium text-gray-900 mb-2">6.1 Our Content</h3>
              <p className="text-gray-600 mb-4">
                The Services, including all content, features, and functionality (excluding User Content),
                are owned by The Algorithm and are protected by copyright, trademark, and other
                intellectual property laws.
              </p>

              <h3 className="text-lg font-medium text-gray-900 mb-2">6.2 Limited License</h3>
              <p className="text-gray-600">
                We grant you a limited, non-exclusive, non-transferable license to access and use the
                Services for their intended purposes. You may not copy, modify, distribute, sell, or
                lease any part of our Services without our prior written consent.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">7. Disclaimers</h2>

              <h3 className="text-lg font-medium text-gray-900 mb-2">7.1 No Warranty</h3>
              <p className="text-gray-600 mb-4">
                THE SERVICES ARE PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; WITHOUT WARRANTIES OF ANY KIND,
                EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF
                MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
              </p>

              <h3 className="text-lg font-medium text-gray-900 mb-2">7.2 Third-Party Information</h3>
              <p className="text-gray-600 mb-4">
                We do not guarantee the accuracy, completeness, or reliability of any vendor listings,
                reviews, or other information on the Services. Users should independently verify all
                information before making business decisions.
              </p>

              <h3 className="text-lg font-medium text-gray-900 mb-2">7.3 Governance Scores</h3>
              <p className="text-gray-600">
                Governance scores and ratings are based on our methodology and publicly available
                information. They are provided for informational purposes only and should not be the
                sole basis for procurement decisions. We do not guarantee that any tool will meet your
                specific compliance requirements.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">8. Limitation of Liability</h2>
              <p className="text-gray-600 mb-4">
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, THE ALGORITHM AND ITS OFFICERS, DIRECTORS,
                EMPLOYEES, AND AGENTS SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL,
                CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS OF PROFITS,
                DATA, OR GOODWILL, ARISING OUT OF OR IN CONNECTION WITH YOUR USE OF THE SERVICES.
              </p>
              <p className="text-gray-600">
                IN NO EVENT SHALL OUR TOTAL LIABILITY EXCEED THE GREATER OF ONE HUNDRED DOLLARS ($100)
                OR THE AMOUNT YOU PAID US, IF ANY, IN THE TWELVE MONTHS PRIOR TO THE CLAIM.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">9. Indemnification</h2>
              <p className="text-gray-600">
                You agree to indemnify, defend, and hold harmless The Algorithm and its officers,
                directors, employees, and agents from any claims, damages, losses, liabilities, and
                expenses (including reasonable attorneys&apos; fees) arising out of or related to your
                use of the Services, your User Content, or your violation of these Terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">10. Termination</h2>
              <p className="text-gray-600 mb-4">
                We may terminate or suspend your account and access to the Services at any time,
                without prior notice or liability, for any reason, including if you breach these Terms.
              </p>
              <p className="text-gray-600">
                Upon termination, your right to use the Services will immediately cease. All provisions
                of these Terms which by their nature should survive termination shall survive.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">11. Governing Law</h2>
              <p className="text-gray-600">
                These Terms shall be governed by and construed in accordance with the laws of the
                State of Colorado, without regard to its conflict of law provisions. Any dispute
                arising from these Terms shall be resolved exclusively in the state or federal courts
                located in Colorado.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">12. Changes to Terms</h2>
              <p className="text-gray-600">
                We reserve the right to modify these Terms at any time. We will notify users of
                material changes by posting the updated Terms on the Site and updating the &quot;Last
                updated&quot; date. Your continued use of the Services after any changes indicates your
                acceptance of the updated Terms.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">13. Contact Us</h2>
              <p className="text-gray-600 mb-4">
                If you have questions about these Terms, please contact us:
              </p>
              <div className="text-gray-600">
                <p><strong>The Algorithm</strong></p>
                <p>Email: <a href="mailto:info@the-algo.com" className="text-blue-600 hover:underline">info@the-algo.com</a></p>
                <p>Location: Colorado, USA</p>
                <p>Website: <a href="https://www.the-algo.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">the-algo.com</a></p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
