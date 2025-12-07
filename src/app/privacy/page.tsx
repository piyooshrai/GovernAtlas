import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | GovernAtlas',
  description: 'Privacy policy for GovernAtlas - how we collect, use, and protect your information.',
};

export default function PrivacyPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="bg-white rounded-lg border border-gray-200 p-8 md:p-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
          <p className="text-sm text-gray-500 mb-8">Last updated: December 1, 2024</p>

          <div className="prose prose-gray max-w-none">
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">1. Introduction</h2>
              <p className="text-gray-600 mb-4">
                GovernAtlas (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is operated by The Algorithm, a Colorado-based
                IT services company. This Privacy Policy explains how we collect, use, disclose, and
                safeguard your information when you visit our website at governatlas.com.
              </p>
              <p className="text-gray-600">
                Please read this privacy policy carefully. If you do not agree with the terms of this
                privacy policy, please do not access the site.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">2. Information We Collect</h2>

              <h3 className="text-lg font-medium text-gray-900 mb-2">Personal Data</h3>
              <p className="text-gray-600 mb-4">
                We may collect personally identifiable information that you voluntarily provide when you:
              </p>
              <ul className="list-disc list-inside text-gray-600 mb-4 space-y-1">
                <li>Register for an account</li>
                <li>Submit a vendor listing</li>
                <li>Write a review</li>
                <li>Contact us through our contact form</li>
                <li>Subscribe to our newsletter</li>
              </ul>
              <p className="text-gray-600 mb-4">
                This information may include your name, email address, company name, phone number,
                and any other information you choose to provide.
              </p>

              <h3 className="text-lg font-medium text-gray-900 mb-2">Automatically Collected Data</h3>
              <p className="text-gray-600 mb-4">
                When you visit our website, we automatically collect certain information about your
                device, including:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                <li>IP address</li>
                <li>Browser type and version</li>
                <li>Operating system</li>
                <li>Pages visited and time spent</li>
                <li>Referring website</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">3. How We Use Your Information</h2>
              <p className="text-gray-600 mb-4">We use the information we collect to:</p>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                <li>Provide, operate, and maintain our website</li>
                <li>Process vendor listings and reviews</li>
                <li>Send you updates about your account or listings</li>
                <li>Respond to your comments, questions, and requests</li>
                <li>Analyze usage patterns to improve our services</li>
                <li>Detect and prevent fraud or abuse</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">4. Cookies and Tracking</h2>
              <p className="text-gray-600 mb-4">
                We use cookies and similar tracking technologies to collect and track information
                about your browsing activity. Cookies are small data files stored on your device.
              </p>
              <p className="text-gray-600 mb-4">We use the following types of cookies:</p>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                <li><strong>Essential cookies:</strong> Required for the website to function</li>
                <li><strong>Analytics cookies:</strong> Help us understand how visitors use our site</li>
                <li><strong>Preference cookies:</strong> Remember your settings and preferences</li>
              </ul>
              <p className="text-gray-600 mt-4">
                You can set your browser to refuse all cookies or to indicate when a cookie is being
                sent. However, some features of the site may not function properly without cookies.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">5. Third-Party Services</h2>
              <p className="text-gray-600 mb-4">
                We may use third-party service providers to help us operate our website and provide
                services. These third parties have access to your information only to perform specific
                tasks on our behalf and are obligated to protect your information.
              </p>
              <p className="text-gray-600">
                Third-party services we use may include hosting providers, analytics services,
                email delivery services, and payment processors.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">6. Data Retention</h2>
              <p className="text-gray-600">
                We retain your personal information for as long as necessary to fulfill the purposes
                outlined in this privacy policy, unless a longer retention period is required by law.
                When you delete your account, we will delete your personal information within 30 days,
                except where we are required to retain it for legal or compliance purposes.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">7. Your Rights</h2>
              <p className="text-gray-600 mb-4">Depending on your location, you may have the right to:</p>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                <li>Access the personal information we hold about you</li>
                <li>Request correction of inaccurate information</li>
                <li>Request deletion of your personal information</li>
                <li>Object to or restrict processing of your information</li>
                <li>Request portability of your information</li>
                <li>Withdraw consent where we rely on consent to process your information</li>
              </ul>
              <p className="text-gray-600 mt-4">
                To exercise these rights, please contact us at{' '}
                <a href="mailto:info@the-algo.com" className="text-blue-600 hover:underline">
                  info@the-algo.com
                </a>.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">8. GDPR Compliance</h2>
              <p className="text-gray-600">
                For users in the European Economic Area (EEA), we process personal data in accordance
                with the General Data Protection Regulation (GDPR). Our legal bases for processing
                include consent, contract performance, legitimate interests, and legal obligations.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">9. CCPA Compliance</h2>
              <p className="text-gray-600 mb-4">
                California residents have additional rights under the California Consumer Privacy Act
                (CCPA), including the right to know what personal information we collect, the right
                to delete personal information, and the right to opt-out of the sale of personal
                information.
              </p>
              <p className="text-gray-600">
                We do not sell personal information to third parties.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">10. Security</h2>
              <p className="text-gray-600">
                We implement appropriate technical and organizational measures to protect your personal
                information against unauthorized access, alteration, disclosure, or destruction. However,
                no method of transmission over the Internet or electronic storage is 100% secure, and we
                cannot guarantee absolute security.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">11. Children&apos;s Privacy</h2>
              <p className="text-gray-600">
                Our website is not intended for children under the age of 13. We do not knowingly collect
                personal information from children under 13. If you are a parent or guardian and believe
                we have collected information from your child, please contact us immediately.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">12. Changes to This Policy</h2>
              <p className="text-gray-600">
                We may update this privacy policy from time to time. We will notify you of any changes
                by posting the new privacy policy on this page and updating the &quot;Last updated&quot; date.
                Your continued use of the website after changes indicates your acceptance of the updated
                policy.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">13. Contact Us</h2>
              <p className="text-gray-600 mb-4">
                If you have questions or concerns about this privacy policy, please contact us:
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
