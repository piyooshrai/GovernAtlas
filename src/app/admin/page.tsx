'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  LayoutDashboard,
  Package,
  MessageSquare,
  Users,
  BarChart3,
  FileText,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  Edit,
  Trash2,
  ChevronRight,
  AlertCircle,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { tools } from '@/data/tools';
import { reviews as mockReviews } from '@/data/reviews';

type Tab = 'overview' | 'submissions' | 'tools' | 'reviews' | 'users';

// Mock data for submissions
const mockSubmissions = [
  {
    id: '1',
    companyName: 'AI Startup Inc',
    toolName: 'SmartDoc AI',
    submittedDate: '2024-12-05',
    status: 'pending',
    contactEmail: 'contact@aistartup.com',
  },
  {
    id: '2',
    companyName: 'MedTech Solutions',
    toolName: 'ClinicalAssist Pro',
    submittedDate: '2024-12-04',
    status: 'reviewing',
    contactEmail: 'info@medtech.com',
  },
  {
    id: '3',
    companyName: 'FinanceAI Corp',
    toolName: 'RiskAnalyzer',
    submittedDate: '2024-12-03',
    status: 'approved',
    contactEmail: 'hello@financeai.com',
  },
];

const mockUsers = [
  { id: '1', email: 'user1@example.com', name: 'John Doe', joined: '2024-11-15', reviewCount: 5 },
  { id: '2', email: 'user2@example.com', name: 'Jane Smith', joined: '2024-11-20', reviewCount: 3 },
  { id: '3', email: 'user3@example.com', name: 'Bob Johnson', joined: '2024-12-01', reviewCount: 1 },
];

export default function AdminPage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [isAdmin, setIsAdmin] = useState(false);
  const [checkingAdmin, setCheckingAdmin] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/signin?redirect=/admin');
      return;
    }

    // In production, check against admin_users table
    // For now, we'll allow access for demo purposes
    if (user) {
      setIsAdmin(true);
      setCheckingAdmin(false);
    }
  }, [user, loading, router]);

  if (loading || checkingAdmin) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
      </div>
    );
  }

  if (!user || !isAdmin) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-lg border border-gray-200 p-8 text-center max-w-md">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h1 className="text-xl font-bold text-gray-900 mb-2">Access Denied</h1>
          <p className="text-gray-600 mb-6">
            You don&apos;t have permission to access the admin dashboard.
          </p>
          <Link
            href="/"
            className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Go to Homepage
          </Link>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'overview' as Tab, label: 'Overview', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'submissions' as Tab, label: 'Submissions', icon: <FileText className="w-4 h-4" /> },
    { id: 'tools' as Tab, label: 'Tools', icon: <Package className="w-4 h-4" /> },
    { id: 'reviews' as Tab, label: 'Reviews', icon: <MessageSquare className="w-4 h-4" /> },
    { id: 'users' as Tab, label: 'Users', icon: <Users className="w-4 h-4" /> },
  ];

  const stats = [
    { label: 'Total Tools', value: tools.length, icon: <Package className="w-5 h-5" /> },
    { label: 'Total Reviews', value: mockReviews.length, icon: <MessageSquare className="w-5 h-5" /> },
    { label: 'Pending Submissions', value: mockSubmissions.filter(s => s.status === 'pending').length, icon: <Clock className="w-5 h-5" /> },
    { label: 'Total Users', value: mockUsers.length, icon: <Users className="w-5 h-5" /> },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <span className="px-2 py-1 bg-amber-100 text-amber-700 text-xs rounded">Pending</span>;
      case 'reviewing':
        return <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">Reviewing</span>;
      case 'approved':
        return <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded">Approved</span>;
      case 'rejected':
        return <span className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded">Rejected</span>;
      default:
        return null;
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600">Manage tools, reviews, and submissions</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex gap-8">
          {/* Sidebar Navigation */}
          <div className="w-64 flex-shrink-0">
            <nav className="bg-white rounded-lg border border-gray-200 p-2">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                    activeTab === tab.id
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Stats Grid */}
                <div className="grid grid-cols-4 gap-4">
                  {stats.map(stat => (
                    <div key={stat.label} className="bg-white rounded-lg border border-gray-200 p-6">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                          {stat.icon}
                        </div>
                        <span className="text-2xl font-bold text-gray-900">{stat.value}</span>
                      </div>
                      <p className="text-sm text-gray-500">{stat.label}</p>
                    </div>
                  ))}
                </div>

                {/* Recent Activity */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Submissions</h2>
                  <div className="space-y-4">
                    {mockSubmissions.slice(0, 3).map(submission => (
                      <div key={submission.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                        <div>
                          <p className="font-medium text-gray-900">{submission.toolName}</p>
                          <p className="text-sm text-gray-500">{submission.companyName}</p>
                        </div>
                        <div className="flex items-center gap-4">
                          {getStatusBadge(submission.status)}
                          <span className="text-sm text-gray-500">{submission.submittedDate}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => setActiveTab('submissions')}
                    className="mt-4 text-blue-600 text-sm font-medium flex items-center gap-1 hover:text-blue-700"
                  >
                    View all submissions <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Submissions Tab */}
            {activeTab === 'submissions' && (
              <div className="bg-white rounded-lg border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-gray-900">Vendor Submissions</h2>
                    <select className="px-4 py-2 border border-gray-300 rounded-lg text-sm">
                      <option value="">All Status</option>
                      <option value="pending">Pending</option>
                      <option value="reviewing">Reviewing</option>
                      <option value="approved">Approved</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </div>
                </div>
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Company</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tool</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {mockSubmissions.map(submission => (
                      <tr key={submission.id}>
                        <td className="px-6 py-4">
                          <p className="font-medium text-gray-900">{submission.companyName}</p>
                          <p className="text-sm text-gray-500">{submission.contactEmail}</p>
                        </td>
                        <td className="px-6 py-4 text-gray-900">{submission.toolName}</td>
                        <td className="px-6 py-4 text-gray-500">{submission.submittedDate}</td>
                        <td className="px-6 py-4">{getStatusBadge(submission.status)}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <button className="p-1 text-gray-400 hover:text-blue-600" title="View">
                              <Eye className="w-4 h-4" />
                            </button>
                            <button className="p-1 text-gray-400 hover:text-green-600" title="Approve">
                              <CheckCircle className="w-4 h-4" />
                            </button>
                            <button className="p-1 text-gray-400 hover:text-red-600" title="Reject">
                              <XCircle className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Tools Tab */}
            {activeTab === 'tools' && (
              <div className="bg-white rounded-lg border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-gray-900">All Tools</h2>
                    <input
                      type="text"
                      placeholder="Search tools..."
                      className="px-4 py-2 border border-gray-300 rounded-lg text-sm w-64"
                    />
                  </div>
                </div>
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Vendor</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Score</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Reviews</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {tools.slice(0, 10).map(tool => (
                      <tr key={tool.id}>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-gray-900">{tool.name}</span>
                            {tool.verified && (
                              <CheckCircle className="w-4 h-4 text-blue-500" />
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-gray-500">{tool.vendor}</td>
                        <td className="px-6 py-4 font-semibold text-gray-900">{tool.score}</td>
                        <td className="px-6 py-4 text-gray-500">{tool.reviews}</td>
                        <td className="px-6 py-4">
                          <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded">
                            Published
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <button className="p-1 text-gray-400 hover:text-blue-600" title="Edit">
                              <Edit className="w-4 h-4" />
                            </button>
                            <button className="p-1 text-gray-400 hover:text-red-600" title="Delete">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Reviews Tab */}
            {activeTab === 'reviews' && (
              <div className="bg-white rounded-lg border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-gray-900">All Reviews</h2>
                    <select className="px-4 py-2 border border-gray-300 rounded-lg text-sm">
                      <option value="">All Status</option>
                      <option value="published">Published</option>
                      <option value="pending">Pending</option>
                      <option value="flagged">Flagged</option>
                    </select>
                  </div>
                </div>
                <div className="divide-y divide-gray-200">
                  {mockReviews.slice(0, 5).map(review => {
                    const tool = tools.find(t => t.id === review.toolId);
                    return (
                      <div key={review.id} className="p-6">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-medium text-gray-900">{review.title}</h3>
                            <p className="text-sm text-gray-500">
                              On {tool?.name} by {review.author}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded">
                              Published
                            </span>
                            <button className="p-1 text-gray-400 hover:text-red-600">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                        <p className="text-gray-600 text-sm line-clamp-2">{review.content}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Users Tab */}
            {activeTab === 'users' && (
              <div className="bg-white rounded-lg border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-gray-900">All Users</h2>
                    <input
                      type="text"
                      placeholder="Search users..."
                      className="px-4 py-2 border border-gray-300 rounded-lg text-sm w-64"
                    />
                  </div>
                </div>
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Joined</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Reviews</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {mockUsers.map(u => (
                      <tr key={u.id}>
                        <td className="px-6 py-4">
                          <p className="font-medium text-gray-900">{u.name}</p>
                          <p className="text-sm text-gray-500">{u.email}</p>
                        </td>
                        <td className="px-6 py-4 text-gray-500">{u.joined}</td>
                        <td className="px-6 py-4 text-gray-500">{u.reviewCount}</td>
                        <td className="px-6 py-4">
                          <button className="text-sm text-gray-600 hover:text-gray-900">
                            View Profile
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
