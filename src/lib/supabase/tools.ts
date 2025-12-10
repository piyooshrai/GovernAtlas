import { createClient } from './server';
import { Tool as FrontendTool, Industry, UseCase, Certification, PricingTier, DeploymentOption } from '@/types';

// Extended tool type with related data from Supabase
export interface ToolWithRelations {
  id: string;
  vendor_id: string | null;
  name: string;
  slug: string;
  tagline: string | null;
  description: string | null;
  website: string | null;
  logo_url: string | null;
  screenshot_urls: string[] | null;
  pricing: string | null;
  pricing_details: string | null;
  score: number;
  review_count: number;
  verified: boolean;
  status: string;
  features: string[] | null;
  integrations: string[] | null;
  deployment_options: string[] | null;
  support_options: string[] | null;
  created_at: string;
  updated_at: string;
  vendors: {
    name: string;
    location: string | null;
    size: string | null;
    founded: number | null;
    website: string | null;
  } | null;
}

// Transform Supabase tool to frontend Tool format
function transformTool(
  tool: ToolWithRelations,
  industries: string[],
  useCases: string[],
  certifications: string[]
): FrontendTool {
  return {
    id: tool.id,
    name: tool.name,
    slug: tool.slug,
    vendor: tool.vendors?.name || 'Unknown Vendor',
    tagline: tool.tagline || '',
    description: tool.description || '',
    industries: industries as Industry[],
    useCases: useCases as UseCase[],
    score: tool.score,
    reviews: tool.review_count,
    verified: tool.verified,
    location: tool.vendors?.location || '',
    size: tool.vendors?.size || '',
    certifications: certifications as Certification[],
    pricing: (tool.pricing as PricingTier) || 'Contact Sales',
    founded: tool.vendors?.founded || 0,
    website: tool.website || tool.vendors?.website || '',
    features: tool.features || [],
    integrations: tool.integrations || [],
    deploymentOptions: (tool.deployment_options as DeploymentOption[]) || [],
    supportOptions: tool.support_options || [],
    lastUpdated: tool.updated_at,
  };
}

// Fetch all tools with their related data
export async function getTools(): Promise<FrontendTool[]> {
  const supabase = await createClient();

  // Fetch tools with vendor data
  // Note: RLS policy controls visibility based on status
  const { data: tools, error: toolsError } = await supabase
    .from('tools')
    .select(`
      *,
      vendors (
        name,
        location,
        size,
        founded,
        website
      )
    `)
    .order('score', { ascending: false });

  if (toolsError) {
    console.error('Error fetching tools:', toolsError);
    return [];
  }

  if (!tools || tools.length === 0) {
    return [];
  }

  // Fetch all tool-industry relationships
  const { data: toolIndustries } = await supabase
    .from('tool_industries')
    .select(`
      tool_id,
      industries (
        name
      )
    `);

  // Fetch all tool-use_case relationships
  const { data: toolUseCases } = await supabase
    .from('tool_use_cases')
    .select(`
      tool_id,
      use_cases (
        name
      )
    `);

  // Fetch all tool-certification relationships
  const { data: toolCertifications } = await supabase
    .from('tool_certifications')
    .select(`
      tool_id,
      certifications (
        name
      )
    `);

  // Build lookup maps for related data
  const industriesByToolId = new Map<string, string[]>();
  const useCasesByToolId = new Map<string, string[]>();
  const certificationsByToolId = new Map<string, string[]>();

  toolIndustries?.forEach((ti: any) => {
    const toolId = ti.tool_id;
    const industryName = ti.industries?.name;
    if (industryName) {
      if (!industriesByToolId.has(toolId)) {
        industriesByToolId.set(toolId, []);
      }
      industriesByToolId.get(toolId)!.push(industryName);
    }
  });

  toolUseCases?.forEach((tu: any) => {
    const toolId = tu.tool_id;
    const useCaseName = tu.use_cases?.name;
    if (useCaseName) {
      if (!useCasesByToolId.has(toolId)) {
        useCasesByToolId.set(toolId, []);
      }
      useCasesByToolId.get(toolId)!.push(useCaseName);
    }
  });

  toolCertifications?.forEach((tc: any) => {
    const toolId = tc.tool_id;
    const certName = tc.certifications?.name;
    if (certName) {
      if (!certificationsByToolId.has(toolId)) {
        certificationsByToolId.set(toolId, []);
      }
      certificationsByToolId.get(toolId)!.push(certName);
    }
  });

  // Transform tools to frontend format
  return tools.map((tool: any) =>
    transformTool(
      tool,
      industriesByToolId.get(tool.id) || [],
      useCasesByToolId.get(tool.id) || [],
      certificationsByToolId.get(tool.id) || []
    )
  );
}

// Fetch top rated tools (for homepage)
export async function getTopRatedTools(limit: number = 6): Promise<FrontendTool[]> {
  const tools = await getTools();
  return tools
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}

// Fetch a single tool by slug
export async function getToolBySlug(slug: string): Promise<FrontendTool | null> {
  const supabase = await createClient();

  // Fetch the tool with vendor data
  const { data: tool, error: toolError } = await supabase
    .from('tools')
    .select(`
      *,
      vendors (
        name,
        location,
        size,
        founded,
        website
      )
    `)
    .eq('slug', slug)
    .single();

  if (toolError || !tool) {
    console.error('Error fetching tool:', toolError);
    return null;
  }

  const toolData = tool as ToolWithRelations;

  // Fetch industries for this tool
  const { data: toolIndustries } = await supabase
    .from('tool_industries')
    .select(`
      industries (
        name
      )
    `)
    .eq('tool_id', toolData.id);

  // Fetch use cases for this tool
  const { data: toolUseCases } = await supabase
    .from('tool_use_cases')
    .select(`
      use_cases (
        name
      )
    `)
    .eq('tool_id', toolData.id);

  // Fetch certifications for this tool
  const { data: toolCertifications } = await supabase
    .from('tool_certifications')
    .select(`
      certifications (
        name
      )
    `)
    .eq('tool_id', toolData.id);

  // Extract names from related data
  const industries = toolIndustries?.map((ti: any) => ti.industries?.name).filter(Boolean) || [];
  const useCases = toolUseCases?.map((tu: any) => tu.use_cases?.name).filter(Boolean) || [];
  const certifications = toolCertifications?.map((tc: any) => tc.certifications?.name).filter(Boolean) || [];

  return transformTool(toolData, industries, useCases, certifications);
}

// Fetch related tools (same industry, different tool)
export async function getRelatedTools(toolId: string, industries: string[], limit: number = 3): Promise<FrontendTool[]> {
  const allTools = await getTools();
  return allTools
    .filter(
      (t) =>
        t.id !== toolId &&
        t.industries.some((i) => industries.includes(i))
    )
    .slice(0, limit);
}

// Fetch industries with tool counts
export async function getIndustriesWithCounts(): Promise<{ name: string; slug: string; toolCount: number }[]> {
  const supabase = await createClient();

  // Fetch all industries
  const { data: industries, error } = await supabase
    .from('industries')
    .select('id, name, slug')
    .order('name');

  if (error || !industries) {
    console.error('Error fetching industries:', error);
    return [];
  }

  // Fetch tool counts per industry
  const { data: toolIndustries } = await supabase
    .from('tool_industries')
    .select('industry_id');

  // Count tools per industry
  const countByIndustryId = new Map<string, number>();
  toolIndustries?.forEach((ti: any) => {
    const count = countByIndustryId.get(ti.industry_id) || 0;
    countByIndustryId.set(ti.industry_id, count + 1);
  });

  return industries.map((industry: any) => ({
    name: industry.name,
    slug: industry.slug,
    toolCount: countByIndustryId.get(industry.id) || 0,
  }));
}

// Fetch all industries (for filters)
export async function getIndustries(): Promise<string[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('industries')
    .select('name')
    .order('name');

  if (error) {
    console.error('Error fetching industries:', error);
    return [];
  }

  return data?.map((i: any) => i.name) || [];
}

// Fetch all use cases (for filters)
export async function getUseCases(): Promise<string[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('use_cases')
    .select('name')
    .order('name');

  if (error) {
    console.error('Error fetching use cases:', error);
    return [];
  }

  return data?.map((uc: any) => uc.name) || [];
}

// Fetch all certifications (for filters)
export async function getCertifications(): Promise<string[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('certifications')
    .select('name')
    .order('name');

  if (error) {
    console.error('Error fetching certifications:', error);
    return [];
  }

  return data?.map((c: any) => c.name) || [];
}

// Fetch stats for homepage
export async function getStats(): Promise<{ toolCount: number; industryCount: number; certificationCount: number }> {
  const supabase = await createClient();

  const [toolsResult, industriesResult, certificationsResult] = await Promise.all([
    supabase.from('tools').select('id', { count: 'exact', head: true }),
    supabase.from('industries').select('id', { count: 'exact', head: true }),
    supabase.from('certifications').select('id', { count: 'exact', head: true }),
  ]);

  return {
    toolCount: toolsResult.count || 0,
    industryCount: industriesResult.count || 0,
    certificationCount: certificationsResult.count || 0,
  };
}

// Get all filter options
export async function getFilterOptions(): Promise<{
  industries: string[];
  useCases: string[];
  certifications: string[];
}> {
  const [industries, useCases, certifications] = await Promise.all([
    getIndustries(),
    getUseCases(),
    getCertifications(),
  ]);

  return { industries, useCases, certifications };
}
