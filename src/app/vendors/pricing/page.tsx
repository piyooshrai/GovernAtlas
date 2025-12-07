import { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle, X, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Vendor Pricing | GovernAtlas',
  description: 'Choose the right plan for your AI tool listing on GovernAtlas.',
};

const plans = [
  {
    name: 'Free',
    price: '$0',
    period: '',
    description: 'Get started with a basic listing',
    features: [
      { text: 'Basic listing in directory', included: true },
      { text: 'Company info displayed', included: true },
      { text: 'Up to 3 certifications shown', included: true },
      { text: 'Standard search placement', included: true },
      { text: 'Verified badge eligibility', included: false },
      { text: 'Enhanced profile', included: false },
      { text: 'Analytics dashboard', included: false },
      { text: 'Priority support', included: false },
      { text: 'Featured placement', included: false },
    ],
    cta: 'Get Started',
    ctaLink: '/vendors/submit',
    highlighted: false,
  },
  {
    name: 'Pro',
    price: '$299',
    period: '/month',
    description: 'Enhanced visibility and features',
    features: [
      { text: 'Everything in Free', included: true },
      { text: 'Verified badge eligibility', included: true },
      { text: 'All certifications displayed', included: true },
      { text: 'Enhanced profile with full description', included: true },
      { text: 'Screenshots and feature highlights', included: true },
      { text: 'Analytics dashboard', included: true },
      { text: 'Priority support', included: true },
      { text: 'Featured placement on homepage', included: false },
      { text: 'Industry page featuring', included: false },
    ],
    cta: 'Contact Sales',
    ctaLink: '/contact',
    highlighted: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    description: 'For high-volume and custom needs',
    features: [
      { text: 'Everything in Pro', included: true },
      { text: 'Featured placement on homepage', included: true },
      { text: 'Industry page featuring', included: true },
      { text: 'Custom integrations', included: true },
      { text: 'Dedicated account manager', included: true },
      { text: 'API access', included: true },
      { text: 'Custom reporting', included: true },
      { text: 'White-glove onboarding', included: true },
      { text: 'Quarterly business reviews', included: true },
    ],
    cta: 'Contact Sales',
    ctaLink: '/contact',
    highlighted: false,
  },
];

const faqs = [
  {
    question: 'Can I start with Free and upgrade later?',
    answer: 'Yes! You can start with our free listing and upgrade to Pro or Enterprise at any time. Your existing reviews and profile data will be preserved.',
  },
  {
    question: "What's required for the Verified badge?",
    answer: 'To earn the Verified badge, we need to confirm your certifications with the issuing bodies. You\'ll need to provide certification numbers or documentation, and we\'ll verify them within 5 business days.',
  },
  {
    question: 'How does billing work?',
    answer: 'Pro plans are billed monthly or annually (with a 20% discount for annual). Enterprise plans are customized based on your needs. We accept all major credit cards and can invoice for enterprise customers.',
  },
  {
    question: 'Can I cancel anytime?',
    answer: 'Yes, you can cancel your subscription at any time. Your listing will revert to the Free tier at the end of your billing period.',
  },
  {
    question: 'What\'s included in the analytics dashboard?',
    answer: 'Pro and Enterprise plans include analytics showing profile views, click-through rates, comparison appearances, and engagement metrics. Enterprise customers get additional custom reporting.',
  },
];

export default function VendorPricingPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Vendor Pricing</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose the plan that fits your needs
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`bg-white rounded-lg border-2 ${
                plan.highlighted
                  ? 'border-blue-500 shadow-lg relative'
                  : 'border-gray-200'
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}
              <div className="p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                  {plan.period && (
                    <span className="text-gray-500">{plan.period}</span>
                  )}
                </div>
                <p className="text-gray-600 mb-6">{plan.description}</p>

                <Link
                  href={plan.ctaLink}
                  className={`block w-full py-3 rounded-lg font-medium text-center transition-colors ${
                    plan.highlighted
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>

              <div className="border-t border-gray-100 p-8">
                <ul className="space-y-4">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      {feature.included ? (
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      ) : (
                        <X className="w-5 h-5 text-gray-300 flex-shrink-0" />
                      )}
                      <span
                        className={
                          feature.included ? 'text-gray-700' : 'text-gray-400'
                        }
                      >
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-4xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-2">{faq.question}</h3>
              <p className="text-gray-600 text-sm">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-blue-600 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Ready to get listed?
          </h2>
          <p className="text-blue-100 mb-6">
            Start with our free tier and upgrade as you grow.
          </p>
          <Link
            href="/vendors/submit"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-blue-50 font-medium transition-colors"
          >
            Submit Your Tool <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
