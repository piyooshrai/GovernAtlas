export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          company: string | null;
          role: string | null;
          avatar_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name?: string | null;
          company?: string | null;
          role?: string | null;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string | null;
          company?: string | null;
          role?: string | null;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      vendors: {
        Row: {
          id: string;
          user_id: string | null;
          name: string;
          slug: string;
          description: string | null;
          website: string | null;
          logo_url: string | null;
          location: string | null;
          size: string | null;
          founded: number | null;
          verified: boolean;
          status: string;
          contact_email: string | null;
          contact_phone: string | null;
          linkedin_url: string | null;
          twitter_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          name: string;
          slug: string;
          description?: string | null;
          website?: string | null;
          logo_url?: string | null;
          location?: string | null;
          size?: string | null;
          founded?: number | null;
          verified?: boolean;
          status?: string;
          contact_email?: string | null;
          contact_phone?: string | null;
          linkedin_url?: string | null;
          twitter_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string | null;
          name?: string;
          slug?: string;
          description?: string | null;
          website?: string | null;
          logo_url?: string | null;
          location?: string | null;
          size?: string | null;
          founded?: number | null;
          verified?: boolean;
          status?: string;
          contact_email?: string | null;
          contact_phone?: string | null;
          linkedin_url?: string | null;
          twitter_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      tools: {
        Row: {
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
        };
        Insert: {
          id?: string;
          vendor_id?: string | null;
          name: string;
          slug: string;
          tagline?: string | null;
          description?: string | null;
          website?: string | null;
          logo_url?: string | null;
          screenshot_urls?: string[] | null;
          pricing?: string | null;
          pricing_details?: string | null;
          score?: number;
          review_count?: number;
          verified?: boolean;
          status?: string;
          features?: string[] | null;
          integrations?: string[] | null;
          deployment_options?: string[] | null;
          support_options?: string[] | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          vendor_id?: string | null;
          name?: string;
          slug?: string;
          tagline?: string | null;
          description?: string | null;
          website?: string | null;
          logo_url?: string | null;
          screenshot_urls?: string[] | null;
          pricing?: string | null;
          pricing_details?: string | null;
          score?: number;
          review_count?: number;
          verified?: boolean;
          status?: string;
          features?: string[] | null;
          integrations?: string[] | null;
          deployment_options?: string[] | null;
          support_options?: string[] | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      industries: {
        Row: {
          id: string;
          name: string;
          slug: string;
          description: string | null;
          icon: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          description?: string | null;
          icon?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          description?: string | null;
          icon?: string | null;
          created_at?: string;
        };
      };
      use_cases: {
        Row: {
          id: string;
          name: string;
          slug: string;
          description: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          description?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          description?: string | null;
          created_at?: string;
        };
      };
      certifications: {
        Row: {
          id: string;
          name: string;
          slug: string;
          description: string | null;
          category: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          description?: string | null;
          category?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          description?: string | null;
          category?: string | null;
          created_at?: string;
        };
      };
      reviews: {
        Row: {
          id: string;
          tool_id: string;
          user_id: string | null;
          rating: number;
          title: string | null;
          content: string | null;
          pros: string[] | null;
          cons: string[] | null;
          company: string | null;
          role: string | null;
          verified: boolean;
          helpful_count: number;
          status: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          tool_id: string;
          user_id?: string | null;
          rating: number;
          title?: string | null;
          content?: string | null;
          pros?: string[] | null;
          cons?: string[] | null;
          company?: string | null;
          role?: string | null;
          verified?: boolean;
          helpful_count?: number;
          status?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          tool_id?: string;
          user_id?: string | null;
          rating?: number;
          title?: string | null;
          content?: string | null;
          pros?: string[] | null;
          cons?: string[] | null;
          company?: string | null;
          role?: string | null;
          verified?: boolean;
          helpful_count?: number;
          status?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      vendor_submissions: {
        Row: {
          id: string;
          user_id: string | null;
          company_name: string;
          company_website: string;
          company_description: string | null;
          company_location: string | null;
          company_size: string | null;
          company_founded: number | null;
          contact_name: string;
          contact_email: string;
          contact_phone: string | null;
          contact_role: string | null;
          tool_name: string;
          tool_tagline: string | null;
          tool_description: string | null;
          tool_website: string | null;
          tool_pricing: string | null;
          industries: string[] | null;
          use_cases: string[] | null;
          certifications: string[] | null;
          features: string[] | null;
          integrations: string[] | null;
          deployment_options: string[] | null;
          status: string;
          admin_notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          company_name: string;
          company_website: string;
          company_description?: string | null;
          company_location?: string | null;
          company_size?: string | null;
          company_founded?: number | null;
          contact_name: string;
          contact_email: string;
          contact_phone?: string | null;
          contact_role?: string | null;
          tool_name: string;
          tool_tagline?: string | null;
          tool_description?: string | null;
          tool_website?: string | null;
          tool_pricing?: string | null;
          industries?: string[] | null;
          use_cases?: string[] | null;
          certifications?: string[] | null;
          features?: string[] | null;
          integrations?: string[] | null;
          deployment_options?: string[] | null;
          status?: string;
          admin_notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string | null;
          company_name?: string;
          company_website?: string;
          company_description?: string | null;
          company_location?: string | null;
          company_size?: string | null;
          company_founded?: number | null;
          contact_name?: string;
          contact_email?: string;
          contact_phone?: string | null;
          contact_role?: string | null;
          tool_name?: string;
          tool_tagline?: string | null;
          tool_description?: string | null;
          tool_website?: string | null;
          tool_pricing?: string | null;
          industries?: string[] | null;
          use_cases?: string[] | null;
          certifications?: string[] | null;
          features?: string[] | null;
          integrations?: string[] | null;
          deployment_options?: string[] | null;
          status?: string;
          admin_notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      tool_industries: {
        Row: {
          tool_id: string;
          industry_id: string;
        };
        Insert: {
          tool_id: string;
          industry_id: string;
        };
        Update: {
          tool_id?: string;
          industry_id?: string;
        };
      };
      tool_use_cases: {
        Row: {
          tool_id: string;
          use_case_id: string;
        };
        Insert: {
          tool_id: string;
          use_case_id: string;
        };
        Update: {
          tool_id?: string;
          use_case_id?: string;
        };
      };
      tool_certifications: {
        Row: {
          tool_id: string;
          certification_id: string;
          verified: boolean;
          verified_at: string | null;
          expiry_date: string | null;
        };
        Insert: {
          tool_id: string;
          certification_id: string;
          verified?: boolean;
          verified_at?: string | null;
          expiry_date?: string | null;
        };
        Update: {
          tool_id?: string;
          certification_id?: string;
          verified?: boolean;
          verified_at?: string | null;
          expiry_date?: string | null;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}

// Helper types
export type Tables<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Row'];
export type InsertTables<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Insert'];
export type UpdateTables<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Update'];

// Convenience types
export type Profile = Tables<'profiles'>;
export type Vendor = Tables<'vendors'>;
export type Tool = Tables<'tools'>;
export type Review = Tables<'reviews'>;
export type VendorSubmission = Tables<'vendor_submissions'>;
export type Industry = Tables<'industries'>;
export type UseCase = Tables<'use_cases'>;
export type Certification = Tables<'certifications'>;
