-- GovernAtlas Database Schema v2
-- Enhanced schema with additional tables for full production build
-- Run this AFTER the initial schema.sql in Supabase SQL Editor

-- =============================================
-- UPDATE INDUSTRIES (Replace Energy with Manufacturing)
-- =============================================
UPDATE public.industries
SET name = 'Manufacturing', slug = 'manufacturing', description = 'AI tools for quality control, predictive maintenance, and manufacturing optimization'
WHERE slug = 'energy';

-- =============================================
-- ADD ISO 27701 CERTIFICATION
-- =============================================
INSERT INTO public.certifications (name, slug, category)
VALUES ('ISO 27701', 'iso-27701', 'privacy')
ON CONFLICT (slug) DO NOTHING;

-- =============================================
-- ENHANCE TOOLS TABLE WITH GOVERNANCE SCORES
-- =============================================
ALTER TABLE public.tools ADD COLUMN IF NOT EXISTS security_score INTEGER DEFAULT 0;
ALTER TABLE public.tools ADD COLUMN IF NOT EXISTS transparency_score INTEGER DEFAULT 0;
ALTER TABLE public.tools ADD COLUMN IF NOT EXISTS fairness_score INTEGER DEFAULT 0;
ALTER TABLE public.tools ADD COLUMN IF NOT EXISTS privacy_score INTEGER DEFAULT 0;
ALTER TABLE public.tools ADD COLUMN IF NOT EXISTS accountability_score INTEGER DEFAULT 0;
ALTER TABLE public.tools ADD COLUMN IF NOT EXISTS trust_page_url TEXT;
ALTER TABLE public.tools ADD COLUMN IF NOT EXISTS privacy_policy_url TEXT;
ALTER TABLE public.tools ADD COLUMN IF NOT EXISTS free_trial BOOLEAN DEFAULT FALSE;
ALTER TABLE public.tools ADD COLUMN IF NOT EXISTS free_tier BOOLEAN DEFAULT FALSE;
ALTER TABLE public.tools ADD COLUMN IF NOT EXISTS starting_price TEXT;
ALTER TABLE public.tools ADD COLUMN IF NOT EXISTS pricing_model TEXT; -- 'per_user', 'per_transaction', 'flat_rate', 'usage_based', 'contact_sales'
ALTER TABLE public.tools ADD COLUMN IF NOT EXISTS data_residency TEXT[];
ALTER TABLE public.tools ADD COLUMN IF NOT EXISTS languages_supported TEXT[];
ALTER TABLE public.tools ADD COLUMN IF NOT EXISTS api_available BOOLEAN DEFAULT FALSE;
ALTER TABLE public.tools ADD COLUMN IF NOT EXISTS featured BOOLEAN DEFAULT FALSE;
ALTER TABLE public.tools ADD COLUMN IF NOT EXISTS view_count INTEGER DEFAULT 0;

-- =============================================
-- ENHANCE VENDORS TABLE
-- =============================================
ALTER TABLE public.vendors ADD COLUMN IF NOT EXISTS trust_page_url TEXT;
ALTER TABLE public.vendors ADD COLUMN IF NOT EXISTS privacy_policy_url TEXT;
ALTER TABLE public.vendors ADD COLUMN IF NOT EXISTS press_page_url TEXT;

-- =============================================
-- SAVED TOOLS TABLE (User Favorites)
-- =============================================
CREATE TABLE IF NOT EXISTS public.saved_tools (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    tool_id UUID REFERENCES public.tools(id) ON DELETE CASCADE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, tool_id)
);

ALTER TABLE public.saved_tools ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own saved tools"
    ON public.saved_tools FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can save tools"
    ON public.saved_tools FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can unsave tools"
    ON public.saved_tools FOR DELETE
    USING (auth.uid() = user_id);

-- =============================================
-- CONTACT SUBMISSIONS TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS public.contact_submissions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    company TEXT,
    subject TEXT NOT NULL, -- 'general', 'partnership', 'press', 'issue', 'other'
    message TEXT NOT NULL,
    status TEXT DEFAULT 'new', -- 'new', 'read', 'replied', 'closed'
    admin_notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- Only admins can view contact submissions (handled via admin_users check)
CREATE POLICY "Contact submissions are private"
    ON public.contact_submissions FOR SELECT
    USING (EXISTS (
        SELECT 1 FROM public.admin_users WHERE user_id = auth.uid()
    ));

-- Anyone can insert contact submissions
CREATE POLICY "Anyone can submit contact form"
    ON public.contact_submissions FOR INSERT
    WITH CHECK (true);

-- =============================================
-- ADMIN USERS TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS public.admin_users (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL UNIQUE,
    role TEXT DEFAULT 'admin', -- 'admin', 'super_admin'
    permissions TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by UUID REFERENCES public.profiles(id)
);

ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view admin users"
    ON public.admin_users FOR SELECT
    USING (EXISTS (
        SELECT 1 FROM public.admin_users WHERE user_id = auth.uid()
    ));

-- Only super_admins can manage admin users
CREATE POLICY "Super admins can manage admin users"
    ON public.admin_users FOR ALL
    USING (EXISTS (
        SELECT 1 FROM public.admin_users WHERE user_id = auth.uid() AND role = 'super_admin'
    ));

-- =============================================
-- BLOG POSTS TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS public.blog_posts (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    excerpt TEXT,
    content TEXT NOT NULL,
    featured_image TEXT,
    author_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    author_name TEXT,
    category TEXT, -- 'compliance', 'guides', 'industry-insights', 'product-updates'
    tags TEXT[],
    status TEXT DEFAULT 'draft', -- 'draft', 'published', 'archived'
    published_at TIMESTAMP WITH TIME ZONE,
    view_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Published blog posts are viewable by everyone"
    ON public.blog_posts FOR SELECT
    USING (status = 'published' OR EXISTS (
        SELECT 1 FROM public.admin_users WHERE user_id = auth.uid()
    ));

CREATE POLICY "Admins can manage blog posts"
    ON public.blog_posts FOR ALL
    USING (EXISTS (
        SELECT 1 FROM public.admin_users WHERE user_id = auth.uid()
    ));

-- =============================================
-- GUIDES TABLE (downloadable resources)
-- =============================================
CREATE TABLE IF NOT EXISTS public.guides (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    content TEXT NOT NULL,
    category TEXT, -- 'procurement', 'compliance', 'security', 'industry'
    industry TEXT, -- optional: specific industry
    download_count INTEGER DEFAULT 0,
    status TEXT DEFAULT 'published', -- 'draft', 'published'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.guides ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Published guides are viewable by everyone"
    ON public.guides FOR SELECT
    USING (status = 'published');

CREATE POLICY "Admins can manage guides"
    ON public.guides FOR ALL
    USING (EXISTS (
        SELECT 1 FROM public.admin_users WHERE user_id = auth.uid()
    ));

-- =============================================
-- FAQ TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS public.faqs (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    category TEXT NOT NULL, -- 'about', 'buyers', 'vendors'
    sort_order INTEGER DEFAULT 0,
    status TEXT DEFAULT 'published',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "FAQs are viewable by everyone"
    ON public.faqs FOR SELECT
    USING (status = 'published');

CREATE POLICY "Admins can manage FAQs"
    ON public.faqs FOR ALL
    USING (EXISTS (
        SELECT 1 FROM public.admin_users WHERE user_id = auth.uid()
    ));

-- =============================================
-- GLOSSARY TERMS TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS public.glossary_terms (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    term TEXT UNIQUE NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    definition TEXT NOT NULL,
    category TEXT, -- 'certifications', 'privacy', 'security', 'deployment', 'ai'
    related_terms TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.glossary_terms ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Glossary terms are viewable by everyone"
    ON public.glossary_terms FOR SELECT
    USING (true);

CREATE POLICY "Admins can manage glossary terms"
    ON public.glossary_terms FOR ALL
    USING (EXISTS (
        SELECT 1 FROM public.admin_users WHERE user_id = auth.uid()
    ));

-- =============================================
-- ADDITIONAL INDEXES
-- =============================================
CREATE INDEX IF NOT EXISTS idx_saved_tools_user_id ON public.saved_tools(user_id);
CREATE INDEX IF NOT EXISTS idx_saved_tools_tool_id ON public.saved_tools(tool_id);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_status ON public.contact_submissions(status);
CREATE INDEX IF NOT EXISTS idx_blog_posts_status ON public.blog_posts(status);
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON public.blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_tools_featured ON public.tools(featured);
CREATE INDEX IF NOT EXISTS idx_guides_slug ON public.guides(slug);

-- =============================================
-- TRIGGERS FOR NEW TABLES
-- =============================================
CREATE TRIGGER update_contact_submissions_updated_at
    BEFORE UPDATE ON public.contact_submissions
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER update_blog_posts_updated_at
    BEFORE UPDATE ON public.blog_posts
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER update_guides_updated_at
    BEFORE UPDATE ON public.guides
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER update_faqs_updated_at
    BEFORE UPDATE ON public.faqs
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

-- =============================================
-- ADMIN CHECK FUNCTION
-- =============================================
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM public.admin_users WHERE user_id = auth.uid()
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =============================================
-- UPDATE VENDOR_SUBMISSIONS POLICIES FOR ADMINS
-- =============================================
DROP POLICY IF EXISTS "Admins can view all submissions" ON public.vendor_submissions;
CREATE POLICY "Admins can view all submissions"
    ON public.vendor_submissions FOR SELECT
    USING (auth.uid() = user_id OR EXISTS (
        SELECT 1 FROM public.admin_users WHERE user_id = auth.uid()
    ));

DROP POLICY IF EXISTS "Admins can update submissions" ON public.vendor_submissions;
CREATE POLICY "Admins can update submissions"
    ON public.vendor_submissions FOR UPDATE
    USING (EXISTS (
        SELECT 1 FROM public.admin_users WHERE user_id = auth.uid()
    ));

-- =============================================
-- UPDATE REVIEWS POLICIES FOR ADMINS
-- =============================================
DROP POLICY IF EXISTS "Admins can manage reviews" ON public.reviews;
CREATE POLICY "Admins can manage reviews"
    ON public.reviews FOR ALL
    USING (EXISTS (
        SELECT 1 FROM public.admin_users WHERE user_id = auth.uid()
    ));

-- =============================================
-- UPDATE TOOLS POLICIES FOR ADMINS
-- =============================================
DROP POLICY IF EXISTS "Admins can manage tools" ON public.tools;
CREATE POLICY "Admins can manage tools"
    ON public.tools FOR ALL
    USING (EXISTS (
        SELECT 1 FROM public.admin_users WHERE user_id = auth.uid()
    ));

-- =============================================
-- UPDATE VENDORS POLICIES FOR ADMINS
-- =============================================
DROP POLICY IF EXISTS "Admins can manage vendors" ON public.vendors;
CREATE POLICY "Admins can manage vendors"
    ON public.vendors FOR ALL
    USING (EXISTS (
        SELECT 1 FROM public.admin_users WHERE user_id = auth.uid()
    ));
