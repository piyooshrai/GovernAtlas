import { MetadataRoute } from 'next';
import { tools } from '@/data/tools';
import { industriesData } from '@/data/industries';
import { blogPosts, guides } from '@/data/resources';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://governatlas.com';

  // Static pages
  const staticPages = [
    '',
    '/browse',
    '/compare',
    '/industries',
    '/methodology',
    '/about',
    '/contact',
    '/vendors',
    '/vendors/pricing',
    '/vendors/submit',
    '/privacy',
    '/terms',
    '/resources',
    '/resources/blog',
    '/resources/guides',
    '/resources/faq',
    '/resources/glossary',
    '/auth/signin',
    '/auth/signup',
  ];

  const staticEntries: MetadataRoute.Sitemap = staticPages.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'daily' : 'weekly',
    priority: route === '' ? 1 : route === '/browse' ? 0.9 : 0.8,
  }));

  // Tool pages
  const toolEntries: MetadataRoute.Sitemap = tools.map((tool) => ({
    url: `${baseUrl}/tool/${tool.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  // Industry pages
  const industryEntries: MetadataRoute.Sitemap = industriesData.map((industry) => ({
    url: `${baseUrl}/industries/${industry.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  // Blog posts
  const blogEntries: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${baseUrl}/resources/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  // Guides
  const guideEntries: MetadataRoute.Sitemap = guides.map((guide) => ({
    url: `${baseUrl}/resources/guides/${guide.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  return [
    ...staticEntries,
    ...toolEntries,
    ...industryEntries,
    ...blogEntries,
    ...guideEntries,
  ];
}
