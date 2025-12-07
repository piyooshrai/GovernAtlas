import Link from 'next/link';
import { AlertCircle } from 'lucide-react';

export default function AuthCodeError() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center">
        <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Authentication Error</h1>
        <p className="text-gray-600 mb-6 max-w-md mx-auto">
          There was a problem with the authentication process. This could be due to an expired
          link or a technical issue.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/auth/signin" className="btn-primary">
            Try Again
          </Link>
          <Link href="/" className="btn-secondary">
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
