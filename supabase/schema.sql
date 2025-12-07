-- GovernAtlas Database Schema
-- Run this in Supabase SQL Editor to create all tables

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================
-- USERS TABLE (extends Supabase auth.users)
-- =============================================
CREATE TABLE public.profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    email TEXT NOT NULL,
    full_name TEXT,
    company TEXT,
    role TEXT, -- 'buyer', 'vendor', 'admin'
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Policies for profiles
CREATE POLICY "Public profiles are viewable by everyone"
    ON public.profiles FOR SELECT
    USING (true);

CREATE POLICY "Users can update their own profile"
    ON public.profiles FOR UPDATE
    USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile"
    ON public.profiles FOR INSERT
    WITH CHECK (auth.uid() = id);

-- =============================================
-- VENDORS TABLE
-- =============================================
CREATE TABLE public.vendors (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    website TEXT,
    logo_url TEXT,
    location TEXT,
    size TEXT, -- '1-9', '10-49', '50-249', '250-999', '1000+'
    founded INTEGER,
    verified BOOLEAN DEFAULT FALSE,
    status TEXT DEFAULT 'pending', -- 'pending', 'approved', 'rejected'
    contact_email TEXT,
    contact_phone TEXT,
    linkedin_url TEXT,
    twitter_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.vendors ENABLE ROW LEVEL SECURITY;

-- Policies for vendors
CREATE POLICY "Approved vendors are viewable by everyone"
    ON public.vendors FOR SELECT
    USING (status = 'approved' OR auth.uid() = user_id);

CREATE POLICY "Users can insert vendors"
    ON public.vendors FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own vendors"
    ON public.vendors FOR UPDATE
    USING (auth.uid() = user_id);

-- =============================================
-- TOOLS TABLE
-- =============================================
CREATE TABLE public.tools (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    vendor_id UUID REFERENCES public.vendors(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    tagline TEXT,
    description TEXT,
    website TEXT,
    logo_url TEXT,
    screenshot_urls TEXT[],
    pricing TEXT, -- 'Free', 'Freemium', 'Subscription', 'Enterprise', 'Contact Sales'
    pricing_details TEXT,
    score INTEGER DEFAULT 0, -- Calculated governance score (0-100)
    review_count INTEGER DEFAULT 0,
    verified BOOLEAN DEFAULT FALSE,
    status TEXT DEFAULT 'pending', -- 'pending', 'approved', 'rejected'
    features TEXT[],
    integrations TEXT[],
    deployment_options TEXT[], -- 'Cloud', 'On-Premise', 'Hybrid', 'Private Cloud'
    support_options TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.tools ENABLE ROW LEVEL SECURITY;

-- Policies for tools
CREATE POLICY "Approved tools are viewable by everyone"
    ON public.tools FOR SELECT
    USING (status = 'approved' OR EXISTS (
        SELECT 1 FROM public.vendors
        WHERE vendors.id = tools.vendor_id AND vendors.user_id = auth.uid()
    ));

CREATE POLICY "Vendor owners can insert tools"
    ON public.tools FOR INSERT
    WITH CHECK (EXISTS (
        SELECT 1 FROM public.vendors
        WHERE vendors.id = vendor_id AND vendors.user_id = auth.uid()
    ));

CREATE POLICY "Vendor owners can update their tools"
    ON public.tools FOR UPDATE
    USING (EXISTS (
        SELECT 1 FROM public.vendors
        WHERE vendors.id = tools.vendor_id AND vendors.user_id = auth.uid()
    ));

-- =============================================
-- INDUSTRIES TABLE
-- =============================================
CREATE TABLE public.industries (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT UNIQUE NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    icon TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Seed industries
INSERT INTO public.industries (name, slug, description) VALUES
    ('Healthcare', 'healthcare', 'AI tools for clinical documentation, diagnostics, and healthcare operations'),
    ('Financial Services', 'financial-services', 'AI solutions for banking, wealth management, and compliance'),
    ('Legal', 'legal', 'AI-powered legal research, contract analysis, and case management'),
    ('Government', 'government', 'FedRAMP authorized AI tools for citizen services and operations'),
    ('Insurance', 'insurance', 'AI tools for claims processing, underwriting, and fraud detection'),
    ('Pharmaceutical', 'pharmaceutical', 'AI solutions for drug discovery and regulatory compliance'),
    ('Energy', 'energy', 'AI tools for grid optimization and predictive maintenance'),
    ('Education', 'education', 'FERPA-compliant AI tools for learning and administration');

-- Enable RLS
ALTER TABLE public.industries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Industries are viewable by everyone"
    ON public.industries FOR SELECT
    USING (true);

-- =============================================
-- TOOL_INDUSTRIES (Junction Table)
-- =============================================
CREATE TABLE public.tool_industries (
    tool_id UUID REFERENCES public.tools(id) ON DELETE CASCADE,
    industry_id UUID REFERENCES public.industries(id) ON DELETE CASCADE,
    PRIMARY KEY (tool_id, industry_id)
);

ALTER TABLE public.tool_industries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Tool industries are viewable by everyone"
    ON public.tool_industries FOR SELECT
    USING (true);

CREATE POLICY "Vendor owners can manage tool industries"
    ON public.tool_industries FOR ALL
    USING (EXISTS (
        SELECT 1 FROM public.tools t
        JOIN public.vendors v ON t.vendor_id = v.id
        WHERE t.id = tool_id AND v.user_id = auth.uid()
    ));

-- =============================================
-- USE_CASES TABLE
-- =============================================
CREATE TABLE public.use_cases (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT UNIQUE NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Seed use cases
INSERT INTO public.use_cases (name, slug) VALUES
    ('Document Processing', 'document-processing'),
    ('Customer Service', 'customer-service'),
    ('Risk Analysis', 'risk-analysis'),
    ('Compliance Automation', 'compliance-automation'),
    ('Research & Discovery', 'research-discovery'),
    ('Claims Processing', 'claims-processing'),
    ('Contract Analysis', 'contract-analysis'),
    ('Fraud Detection', 'fraud-detection'),
    ('Clinical Documentation', 'clinical-documentation'),
    ('Regulatory Reporting', 'regulatory-reporting');

ALTER TABLE public.use_cases ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Use cases are viewable by everyone"
    ON public.use_cases FOR SELECT
    USING (true);

-- =============================================
-- TOOL_USE_CASES (Junction Table)
-- =============================================
CREATE TABLE public.tool_use_cases (
    tool_id UUID REFERENCES public.tools(id) ON DELETE CASCADE,
    use_case_id UUID REFERENCES public.use_cases(id) ON DELETE CASCADE,
    PRIMARY KEY (tool_id, use_case_id)
);

ALTER TABLE public.tool_use_cases ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Tool use cases are viewable by everyone"
    ON public.tool_use_cases FOR SELECT
    USING (true);

CREATE POLICY "Vendor owners can manage tool use cases"
    ON public.tool_use_cases FOR ALL
    USING (EXISTS (
        SELECT 1 FROM public.tools t
        JOIN public.vendors v ON t.vendor_id = v.id
        WHERE t.id = tool_id AND v.user_id = auth.uid()
    ));

-- =============================================
-- CERTIFICATIONS TABLE
-- =============================================
CREATE TABLE public.certifications (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT UNIQUE NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    category TEXT, -- 'security', 'privacy', 'government', 'industry'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Seed certifications
INSERT INTO public.certifications (name, slug, category) VALUES
    ('SOC 2', 'soc-2', 'security'),
    ('SOC 2 Type II', 'soc-2-type-ii', 'security'),
    ('HIPAA', 'hipaa', 'privacy'),
    ('HITRUST', 'hitrust', 'privacy'),
    ('ISO 27001', 'iso-27001', 'security'),
    ('FedRAMP', 'fedramp', 'government'),
    ('StateRAMP', 'stateramp', 'government'),
    ('PCI DSS', 'pci-dss', 'security'),
    ('GDPR', 'gdpr', 'privacy'),
    ('CCPA', 'ccpa', 'privacy'),
    ('FDA 21 CFR Part 11', 'fda-21-cfr-part-11', 'industry');

ALTER TABLE public.certifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Certifications are viewable by everyone"
    ON public.certifications FOR SELECT
    USING (true);

-- =============================================
-- TOOL_CERTIFICATIONS (Junction Table)
-- =============================================
CREATE TABLE public.tool_certifications (
    tool_id UUID REFERENCES public.tools(id) ON DELETE CASCADE,
    certification_id UUID REFERENCES public.certifications(id) ON DELETE CASCADE,
    verified BOOLEAN DEFAULT FALSE,
    verified_at TIMESTAMP WITH TIME ZONE,
    expiry_date DATE,
    PRIMARY KEY (tool_id, certification_id)
);

ALTER TABLE public.tool_certifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Tool certifications are viewable by everyone"
    ON public.tool_certifications FOR SELECT
    USING (true);

CREATE POLICY "Vendor owners can manage tool certifications"
    ON public.tool_certifications FOR ALL
    USING (EXISTS (
        SELECT 1 FROM public.tools t
        JOIN public.vendors v ON t.vendor_id = v.id
        WHERE t.id = tool_id AND v.user_id = auth.uid()
    ));

-- =============================================
-- REVIEWS TABLE
-- =============================================
CREATE TABLE public.reviews (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    tool_id UUID REFERENCES public.tools(id) ON DELETE CASCADE NOT NULL,
    user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    title TEXT,
    content TEXT,
    pros TEXT[],
    cons TEXT[],
    company TEXT,
    role TEXT,
    verified BOOLEAN DEFAULT FALSE,
    helpful_count INTEGER DEFAULT 0,
    status TEXT DEFAULT 'pending', -- 'pending', 'approved', 'rejected'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Approved reviews are viewable by everyone"
    ON public.reviews FOR SELECT
    USING (status = 'approved' OR auth.uid() = user_id);

CREATE POLICY "Authenticated users can insert reviews"
    ON public.reviews FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own reviews"
    ON public.reviews FOR UPDATE
    USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own reviews"
    ON public.reviews FOR DELETE
    USING (auth.uid() = user_id);

-- =============================================
-- VENDOR SUBMISSIONS TABLE (for pending submissions)
-- =============================================
CREATE TABLE public.vendor_submissions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,

    -- Company info
    company_name TEXT NOT NULL,
    company_website TEXT NOT NULL,
    company_description TEXT,
    company_location TEXT,
    company_size TEXT,
    company_founded INTEGER,

    -- Contact info
    contact_name TEXT NOT NULL,
    contact_email TEXT NOT NULL,
    contact_phone TEXT,
    contact_role TEXT,

    -- Tool info
    tool_name TEXT NOT NULL,
    tool_tagline TEXT,
    tool_description TEXT,
    tool_website TEXT,
    tool_pricing TEXT,

    -- Arrays stored as JSON
    industries TEXT[],
    use_cases TEXT[],
    certifications TEXT[],
    features TEXT[],
    integrations TEXT[],
    deployment_options TEXT[],

    -- Status
    status TEXT DEFAULT 'pending', -- 'pending', 'reviewing', 'approved', 'rejected'
    admin_notes TEXT,

    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.vendor_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own submissions"
    ON public.vendor_submissions FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Authenticated users can create submissions"
    ON public.vendor_submissions FOR INSERT
    WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Users can update their pending submissions"
    ON public.vendor_submissions FOR UPDATE
    USING (auth.uid() = user_id AND status = 'pending');

-- =============================================
-- FUNCTIONS & TRIGGERS
-- =============================================

-- Function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, email, full_name)
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', '')
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user signup
CREATE OR REPLACE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply updated_at triggers
CREATE TRIGGER update_profiles_updated_at
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER update_vendors_updated_at
    BEFORE UPDATE ON public.vendors
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER update_tools_updated_at
    BEFORE UPDATE ON public.tools
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER update_reviews_updated_at
    BEFORE UPDATE ON public.reviews
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER update_vendor_submissions_updated_at
    BEFORE UPDATE ON public.vendor_submissions
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

-- Function to update tool review count and score
CREATE OR REPLACE FUNCTION public.update_tool_review_stats()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' OR TG_OP = 'UPDATE' THEN
        UPDATE public.tools
        SET
            review_count = (
                SELECT COUNT(*) FROM public.reviews
                WHERE tool_id = NEW.tool_id AND status = 'approved'
            ),
            score = (
                SELECT COALESCE(ROUND(AVG(rating) * 20), 0) FROM public.reviews
                WHERE tool_id = NEW.tool_id AND status = 'approved'
            )
        WHERE id = NEW.tool_id;
        RETURN NEW;
    ELSIF TG_OP = 'DELETE' THEN
        UPDATE public.tools
        SET
            review_count = (
                SELECT COUNT(*) FROM public.reviews
                WHERE tool_id = OLD.tool_id AND status = 'approved'
            ),
            score = (
                SELECT COALESCE(ROUND(AVG(rating) * 20), 0) FROM public.reviews
                WHERE tool_id = OLD.tool_id AND status = 'approved'
            )
        WHERE id = OLD.tool_id;
        RETURN OLD;
    END IF;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_tool_stats_on_review
    AFTER INSERT OR UPDATE OR DELETE ON public.reviews
    FOR EACH ROW EXECUTE FUNCTION public.update_tool_review_stats();

-- =============================================
-- INDEXES
-- =============================================
CREATE INDEX idx_tools_vendor_id ON public.tools(vendor_id);
CREATE INDEX idx_tools_status ON public.tools(status);
CREATE INDEX idx_tools_score ON public.tools(score DESC);
CREATE INDEX idx_reviews_tool_id ON public.reviews(tool_id);
CREATE INDEX idx_reviews_user_id ON public.reviews(user_id);
CREATE INDEX idx_reviews_status ON public.reviews(status);
CREATE INDEX idx_vendor_submissions_user_id ON public.vendor_submissions(user_id);
CREATE INDEX idx_vendor_submissions_status ON public.vendor_submissions(status);
