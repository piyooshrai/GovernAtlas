import Link from 'next/link';
import Image from 'next/image';
import { Search, Home, ArrowRight, Compass, BookOpen } from 'lucide-react';

export default function NotFound() {
  const suggestions = [
    { href: '/browse', icon: Search, label: 'Browse AI Tools', description: 'Explore our full directory' },
    { href: '/industries', icon: Compass, label: 'Browse by Industry', description: 'Find tools for your sector' },
    { href: '/resources', icon: BookOpen, label: 'Resources', description: 'Guides, blog, and FAQ' },
  ];

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 bg-gray-50">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full mb-6">
            <Image
              src="/GovernAtlas.png"
              alt="GovernAtlas"
              width={40}
              height={40}
              className="w-10 h-10"
            />
          </div>
          <h1 className="text-8xl font-bold text-gray-200 mb-2">404</h1>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Page Not Found</h2>
          <p className="text-gray-600 max-w-md mx-auto">
            Sorry, we couldn&apos;t find the page you&apos;re looking for. It might have been
            moved, deleted, or never existed.
          </p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
          <h3 className="font-semibold text-gray-900 mb-4">Try one of these instead:</h3>
          <div className="grid sm:grid-cols-3 gap-4">
            {suggestions.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex flex-col items-center p-4 rounded-lg hover:bg-gray-50 transition-colors text-center group"
              >
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-3 group-hover:bg-blue-100 transition-colors">
                  <item.icon className="w-6 h-6 text-gray-600 group-hover:text-blue-600 transition-colors" />
                </div>
                <span className="font-medium text-gray-900 mb-1">{item.label}</span>
                <span className="text-xs text-gray-500">{item.description}</span>
              </Link>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="btn-primary flex items-center gap-2"
          >
            <Home className="w-4 h-4" />
            Go to Homepage
          </Link>
          <Link
            href="/contact"
            className="text-gray-600 hover:text-gray-800 flex items-center gap-1 text-sm"
          >
            Report this issue <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
