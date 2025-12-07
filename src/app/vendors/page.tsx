'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Building2,
  User,
  Mail,
  Phone,
  Globe,
  MapPin,
  Users,
  Calendar,
  Package,
  CheckCircle,
  AlertCircle,
  Loader2,
  ArrowRight,
  ArrowLeft,
  Shield,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { createClient } from '@/lib/supabase/client';
import { InsertTables } from '@/lib/supabase/types';
import { industries, useCases, certifications, pricingTiers, deploymentOptions } from '@/data/tools';

const companySizes = ['1-9', '10-49', '50-249', '250-999', '1000+'];

type Step = 'company' | 'contact' | 'tool' | 'review';

interface FormData {
  // Company
  companyName: string;
  companyWebsite: string;
  companyDescription: string;
  companyLocation: string;
  companySize: string;
  companyFounded: string;
  // Contact
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  contactRole: string;
  // Tool
  toolName: string;
  toolTagline: string;
  toolDescription: string;
  toolWebsite: string;
  toolPricing: string;
  selectedIndustries: string[];
  selectedUseCases: string[];
  selectedCertifications: string[];
  features: string;
  integrations: string;
  selectedDeploymentOptions: string[];
}

interface ValidationErrors {
  [key: string]: string;
}

const initialFormData: FormData = {
  companyName: '',
  companyWebsite: '',
  companyDescription: '',
  companyLocation: '',
  companySize: '',
  companyFounded: '',
  contactName: '',
  contactEmail: '',
  contactPhone: '',
  contactRole: '',
  toolName: '',
  toolTagline: '',
  toolDescription: '',
  toolWebsite: '',
  toolPricing: '',
  selectedIndustries: [],
  selectedUseCases: [],
  selectedCertifications: [],
  features: '',
  integrations: '',
  selectedDeploymentOptions: [],
};

// Validation helpers
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const isValidUrl = (url: string): boolean => {
  if (!url) return true; // Optional fields
  try {
    new URL(url.startsWith('http') ? url : `https://${url}`);
    return true;
  } catch {
    return false;
  }
};

const isValidPhone = (phone: string): boolean => {
  if (!phone) return true; // Optional field
  const phoneRegex = /^[+]?[\d\s\-().]{7,20}$/;
  return phoneRegex.test(phone);
};

const isValidYear = (year: string): boolean => {
  if (!year) return true; // Optional field
  const yearNum = parseInt(year);
  const currentYear = new Date().getFullYear();
  return yearNum >= 1900 && yearNum <= currentYear;
};

export default function VendorSubmissionPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [step, setStep] = useState<Step>('company');
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});

  const supabase = createClient();

  const updateField = (field: keyof FormData, value: string | string[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear validation error when field is updated
    if (validationErrors[field]) {
      setValidationErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const markTouched = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const toggleArrayField = (field: keyof FormData, value: string) => {
    const currentArray = formData[field] as string[];
    const newArray = currentArray.includes(value)
      ? currentArray.filter((v) => v !== value)
      : [...currentArray, value];
    updateField(field, newArray);
  };

  // Validation functions for each step
  const validateCompanyStep = (): ValidationErrors => {
    const errors: ValidationErrors = {};

    if (!formData.companyName.trim()) {
      errors.companyName = 'Company name is required';
    } else if (formData.companyName.trim().length < 2) {
      errors.companyName = 'Company name must be at least 2 characters';
    }

    if (!formData.companyWebsite.trim()) {
      errors.companyWebsite = 'Company website is required';
    } else if (!isValidUrl(formData.companyWebsite)) {
      errors.companyWebsite = 'Please enter a valid URL';
    }

    if (formData.companyFounded && !isValidYear(formData.companyFounded)) {
      errors.companyFounded = 'Please enter a valid year (1900 - present)';
    }

    return errors;
  };

  const validateContactStep = (): ValidationErrors => {
    const errors: ValidationErrors = {};

    if (!formData.contactName.trim()) {
      errors.contactName = 'Contact name is required';
    } else if (formData.contactName.trim().length < 2) {
      errors.contactName = 'Name must be at least 2 characters';
    }

    if (!formData.contactEmail.trim()) {
      errors.contactEmail = 'Email address is required';
    } else if (!isValidEmail(formData.contactEmail)) {
      errors.contactEmail = 'Please enter a valid email address';
    }

    if (formData.contactPhone && !isValidPhone(formData.contactPhone)) {
      errors.contactPhone = 'Please enter a valid phone number';
    }

    return errors;
  };

  const validateToolStep = (): ValidationErrors => {
    const errors: ValidationErrors = {};

    if (!formData.toolName.trim()) {
      errors.toolName = 'Tool name is required';
    } else if (formData.toolName.trim().length < 2) {
      errors.toolName = 'Tool name must be at least 2 characters';
    }

    if (formData.selectedIndustries.length === 0) {
      errors.selectedIndustries = 'Please select at least one industry';
    }

    if (formData.toolWebsite && !isValidUrl(formData.toolWebsite)) {
      errors.toolWebsite = 'Please enter a valid URL';
    }

    return errors;
  };

  const validateCurrentStep = (): boolean => {
    let errors: ValidationErrors = {};

    switch (step) {
      case 'company':
        errors = validateCompanyStep();
        break;
      case 'contact':
        errors = validateContactStep();
        break;
      case 'tool':
        errors = validateToolStep();
        break;
      case 'review':
        // Validate all steps on review
        errors = {
          ...validateCompanyStep(),
          ...validateContactStep(),
          ...validateToolStep(),
        };
        break;
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const steps: Step[] = ['company', 'contact', 'tool', 'review'];
  const currentStepIndex = steps.indexOf(step);

  const goNext = () => {
    if (validateCurrentStep() && currentStepIndex < steps.length - 1) {
      setStep(steps[currentStepIndex + 1]);
      setValidationErrors({});
      setTouched({});
    }
  };

  const goPrev = () => {
    if (currentStepIndex > 0) {
      setStep(steps[currentStepIndex - 1]);
      setValidationErrors({});
      setTouched({});
    }
  };

  const handleSubmit = async () => {
    // Validate all steps before submitting
    if (!validateCurrentStep()) {
      setError('Please fix the validation errors before submitting.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const submissionData: InsertTables<'vendor_submissions'> = {
        user_id: user?.id || null,
        company_name: formData.companyName,
        company_website: formData.companyWebsite,
        company_description: formData.companyDescription || null,
        company_location: formData.companyLocation || null,
        company_size: formData.companySize || null,
        company_founded: formData.companyFounded ? parseInt(formData.companyFounded) : null,
        contact_name: formData.contactName,
        contact_email: formData.contactEmail,
        contact_phone: formData.contactPhone || null,
        contact_role: formData.contactRole || null,
        tool_name: formData.toolName,
        tool_tagline: formData.toolTagline || null,
        tool_description: formData.toolDescription || null,
        tool_website: formData.toolWebsite || null,
        tool_pricing: formData.toolPricing || null,
        industries: formData.selectedIndustries.length > 0 ? formData.selectedIndustries : null,
        use_cases: formData.selectedUseCases.length > 0 ? formData.selectedUseCases : null,
        certifications: formData.selectedCertifications.length > 0 ? formData.selectedCertifications : null,
        features: formData.features.split('\n').filter((f) => f.trim()).length > 0
          ? formData.features.split('\n').filter((f) => f.trim())
          : null,
        integrations: formData.integrations.split('\n').filter((i) => i.trim()).length > 0
          ? formData.integrations.split('\n').filter((i) => i.trim())
          : null,
        deployment_options: formData.selectedDeploymentOptions.length > 0 ? formData.selectedDeploymentOptions : null,
      };

      const { error: submitError } = await supabase
        .from('vendor_submissions')
        .insert(submissionData as any);

      if (submitError) throw submitError;

      setSuccess(true);
    } catch (err: any) {
      setError(err.message || 'Failed to submit. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Submission Received!</h2>
          <p className="text-gray-600 mb-6">
            Thank you for submitting your tool. Our team will review your submission and get back
            to you within 2-3 business days.
          </p>
          <Link href="/" className="btn-primary">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-3xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">List Your AI Tool</h1>
          <p className="text-gray-600">
            Get your AI tool in front of compliance teams at leading organizations
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((s, index) => (
              <React.Fragment key={s}>
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-medium ${
                      index <= currentStepIndex
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 text-gray-500'
                    }`}
                  >
                    {index < currentStepIndex ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      index + 1
                    )}
                  </div>
                  <span className="text-xs mt-1 text-gray-500 capitalize hidden sm:block">
                    {s}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`flex-1 h-1 mx-2 ${
                      index < currentStepIndex ? 'bg-blue-600' : 'bg-gray-200'
                    }`}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Form */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          {error && (
            <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700 text-sm">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              {error}
            </div>
          )}

          {/* Step 1: Company Info */}
          {step === 'company' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-blue-600" />
                Company Information
              </h2>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    value={formData.companyName}
                    onChange={(e) => updateField('companyName', e.target.value)}
                    onBlur={() => markTouched('companyName')}
                    className={`input ${validationErrors.companyName ? 'border-red-500 focus:ring-red-500' : ''}`}
                    placeholder="Acme AI Inc."
                  />
                  {validationErrors.companyName && (
                    <p className="mt-1 text-sm text-red-600">{validationErrors.companyName}</p>
                  )}
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Company Website *
                  </label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="url"
                      value={formData.companyWebsite}
                      onChange={(e) => updateField('companyWebsite', e.target.value)}
                      onBlur={() => markTouched('companyWebsite')}
                      className={`input pl-10 ${validationErrors.companyWebsite ? 'border-red-500 focus:ring-red-500' : ''}`}
                      placeholder="https://www.example.com"
                    />
                  </div>
                  {validationErrors.companyWebsite && (
                    <p className="mt-1 text-sm text-red-600">{validationErrors.companyWebsite}</p>
                  )}
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Company Description
                  </label>
                  <textarea
                    value={formData.companyDescription}
                    onChange={(e) => updateField('companyDescription', e.target.value)}
                    className="input min-h-[100px]"
                    placeholder="Brief description of your company..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Headquarters Location
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      value={formData.companyLocation}
                      onChange={(e) => updateField('companyLocation', e.target.value)}
                      className="input pl-10"
                      placeholder="San Francisco, CA"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Company Size
                  </label>
                  <select
                    value={formData.companySize}
                    onChange={(e) => updateField('companySize', e.target.value)}
                    className="select"
                  >
                    <option value="">Select size</option>
                    {companySizes.map((size) => (
                      <option key={size} value={size}>
                        {size} employees
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Year Founded
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="number"
                      value={formData.companyFounded}
                      onChange={(e) => updateField('companyFounded', e.target.value)}
                      onBlur={() => markTouched('companyFounded')}
                      className={`input pl-10 ${validationErrors.companyFounded ? 'border-red-500 focus:ring-red-500' : ''}`}
                      placeholder="2020"
                      min="1900"
                      max={new Date().getFullYear()}
                    />
                  </div>
                  {validationErrors.companyFounded && (
                    <p className="mt-1 text-sm text-red-600">{validationErrors.companyFounded}</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Contact Info */}
          {step === 'contact' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                <User className="w-5 h-5 text-blue-600" />
                Contact Information
              </h2>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Contact Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      value={formData.contactName}
                      onChange={(e) => updateField('contactName', e.target.value)}
                      onBlur={() => markTouched('contactName')}
                      className={`input pl-10 ${validationErrors.contactName ? 'border-red-500 focus:ring-red-500' : ''}`}
                      placeholder="John Doe"
                    />
                  </div>
                  {validationErrors.contactName && (
                    <p className="mt-1 text-sm text-red-600">{validationErrors.contactName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Role / Title
                  </label>
                  <input
                    type="text"
                    value={formData.contactRole}
                    onChange={(e) => updateField('contactRole', e.target.value)}
                    className="input"
                    placeholder="VP of Sales"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="email"
                      value={formData.contactEmail}
                      onChange={(e) => updateField('contactEmail', e.target.value)}
                      onBlur={() => markTouched('contactEmail')}
                      className={`input pl-10 ${validationErrors.contactEmail ? 'border-red-500 focus:ring-red-500' : ''}`}
                      placeholder="john@company.com"
                    />
                  </div>
                  {validationErrors.contactEmail && (
                    <p className="mt-1 text-sm text-red-600">{validationErrors.contactEmail}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="tel"
                      value={formData.contactPhone}
                      onChange={(e) => updateField('contactPhone', e.target.value)}
                      onBlur={() => markTouched('contactPhone')}
                      className={`input pl-10 ${validationErrors.contactPhone ? 'border-red-500 focus:ring-red-500' : ''}`}
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                  {validationErrors.contactPhone && (
                    <p className="mt-1 text-sm text-red-600">{validationErrors.contactPhone}</p>
                  )}
                </div>
              </div>

              {!user && (
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>Tip:</strong>{' '}
                    <Link href="/auth/signup" className="underline">
                      Create an account
                    </Link>{' '}
                    to track your submission status and manage your listing.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Step 3: Tool Info */}
          {step === 'tool' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                <Package className="w-5 h-5 text-blue-600" />
                Tool Information
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tool Name *
                  </label>
                  <input
                    type="text"
                    value={formData.toolName}
                    onChange={(e) => updateField('toolName', e.target.value)}
                    onBlur={() => markTouched('toolName')}
                    className={`input ${validationErrors.toolName ? 'border-red-500 focus:ring-red-500' : ''}`}
                    placeholder="AI Assistant Pro"
                  />
                  {validationErrors.toolName && (
                    <p className="mt-1 text-sm text-red-600">{validationErrors.toolName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tagline
                  </label>
                  <input
                    type="text"
                    value={formData.toolTagline}
                    onChange={(e) => updateField('toolTagline', e.target.value)}
                    className="input"
                    placeholder="AI-powered solution that saves teams 10+ hours per week"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    value={formData.toolDescription}
                    onChange={(e) => updateField('toolDescription', e.target.value)}
                    className="input min-h-[100px]"
                    placeholder="Detailed description of your tool and its capabilities..."
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Tool Website
                    </label>
                    <input
                      type="url"
                      value={formData.toolWebsite}
                      onChange={(e) => updateField('toolWebsite', e.target.value)}
                      onBlur={() => markTouched('toolWebsite')}
                      className={`input ${validationErrors.toolWebsite ? 'border-red-500 focus:ring-red-500' : ''}`}
                      placeholder="https://www.example.com/product"
                    />
                    {validationErrors.toolWebsite && (
                      <p className="mt-1 text-sm text-red-600">{validationErrors.toolWebsite}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Pricing Model
                    </label>
                    <select
                      value={formData.toolPricing}
                      onChange={(e) => updateField('toolPricing', e.target.value)}
                      className="select"
                    >
                      <option value="">Select pricing</option>
                      {pricingTiers.map((tier) => (
                        <option key={tier} value={tier}>
                          {tier}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Industries *
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {industries.map((industry) => (
                      <button
                        key={industry}
                        type="button"
                        onClick={() => toggleArrayField('selectedIndustries', industry)}
                        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                          formData.selectedIndustries.includes(industry)
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {industry}
                      </button>
                    ))}
                  </div>
                  {validationErrors.selectedIndustries && (
                    <p className="mt-1 text-sm text-red-600">{validationErrors.selectedIndustries}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Use Cases
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {useCases.map((useCase) => (
                      <button
                        key={useCase}
                        type="button"
                        onClick={() => toggleArrayField('selectedUseCases', useCase)}
                        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                          formData.selectedUseCases.includes(useCase)
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {useCase}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Shield className="w-4 h-4 inline mr-1" />
                    Compliance Certifications
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {certifications.map((cert) => (
                      <button
                        key={cert}
                        type="button"
                        onClick={() => toggleArrayField('selectedCertifications', cert)}
                        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                          formData.selectedCertifications.includes(cert)
                            ? 'bg-green-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {cert}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Deployment Options
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {deploymentOptions.map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => toggleArrayField('selectedDeploymentOptions', option)}
                        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                          formData.selectedDeploymentOptions.includes(option)
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Key Features (one per line)
                  </label>
                  <textarea
                    value={formData.features}
                    onChange={(e) => updateField('features', e.target.value)}
                    className="input min-h-[100px]"
                    placeholder="Real-time analytics&#10;Custom reporting&#10;API access&#10;SSO integration"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Integrations (one per line)
                  </label>
                  <textarea
                    value={formData.integrations}
                    onChange={(e) => updateField('integrations', e.target.value)}
                    className="input min-h-[80px]"
                    placeholder="Salesforce&#10;Slack&#10;Microsoft Teams"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Review */}
          {step === 'review' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-blue-600" />
                Review Your Submission
              </h2>

              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-2">Company</h3>
                  <dl className="grid sm:grid-cols-2 gap-2 text-sm">
                    <div>
                      <dt className="text-gray-500">Name</dt>
                      <dd className="font-medium">{formData.companyName}</dd>
                    </div>
                    <div>
                      <dt className="text-gray-500">Website</dt>
                      <dd className="font-medium">{formData.companyWebsite}</dd>
                    </div>
                    <div>
                      <dt className="text-gray-500">Location</dt>
                      <dd className="font-medium">{formData.companyLocation || '-'}</dd>
                    </div>
                    <div>
                      <dt className="text-gray-500">Size</dt>
                      <dd className="font-medium">{formData.companySize || '-'}</dd>
                    </div>
                  </dl>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-2">Contact</h3>
                  <dl className="grid sm:grid-cols-2 gap-2 text-sm">
                    <div>
                      <dt className="text-gray-500">Name</dt>
                      <dd className="font-medium">{formData.contactName}</dd>
                    </div>
                    <div>
                      <dt className="text-gray-500">Email</dt>
                      <dd className="font-medium">{formData.contactEmail}</dd>
                    </div>
                    <div>
                      <dt className="text-gray-500">Role</dt>
                      <dd className="font-medium">{formData.contactRole || '-'}</dd>
                    </div>
                    <div>
                      <dt className="text-gray-500">Phone</dt>
                      <dd className="font-medium">{formData.contactPhone || '-'}</dd>
                    </div>
                  </dl>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-2">Tool</h3>
                  <dl className="space-y-2 text-sm">
                    <div>
                      <dt className="text-gray-500">Name</dt>
                      <dd className="font-medium">{formData.toolName}</dd>
                    </div>
                    <div>
                      <dt className="text-gray-500">Tagline</dt>
                      <dd className="font-medium">{formData.toolTagline || '-'}</dd>
                    </div>
                    <div>
                      <dt className="text-gray-500">Pricing</dt>
                      <dd className="font-medium">{formData.toolPricing || '-'}</dd>
                    </div>
                    <div>
                      <dt className="text-gray-500">Industries</dt>
                      <dd className="font-medium">
                        {formData.selectedIndustries.join(', ') || '-'}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-gray-500">Certifications</dt>
                      <dd className="font-medium">
                        {formData.selectedCertifications.join(', ') || '-'}
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>

              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-800">
                  By submitting, you confirm that the information provided is accurate and that you
                  have the authority to represent this company. Our team will review your
                  submission within 2-3 business days.
                </p>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
            {currentStepIndex > 0 ? (
              <button
                type="button"
                onClick={goPrev}
                className="btn-secondary flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>
            ) : (
              <div />
            )}

            {currentStepIndex < steps.length - 1 ? (
              <button
                type="button"
                onClick={goNext}
                className="btn-primary flex items-center gap-2"
                disabled={
                  (step === 'company' && (!formData.companyName || !formData.companyWebsite)) ||
                  (step === 'contact' && (!formData.contactName || !formData.contactEmail)) ||
                  (step === 'tool' &&
                    (!formData.toolName || formData.selectedIndustries.length === 0))
                }
              >
                Next
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={loading}
                className="btn-primary flex items-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    Submit for Review
                    <CheckCircle className="w-4 h-4" />
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
