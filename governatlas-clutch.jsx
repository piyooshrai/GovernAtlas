import React, { useState } from 'react';
import { Search, ChevronDown, Star, MapPin, CheckCircle, Users, Building2, Filter, ArrowRight, Shield, X } from 'lucide-react';

const tools = [
  { id: 1, name: 'Clinical Notes Pro', vendor: 'MedScribe AI', tagline: 'AI-powered clinical documentation that saves physicians 2+ hours daily', industries: ['Healthcare'], score: 94, reviews: 127, verified: true, location: 'San Francisco, CA', size: '50-249', certifications: ['SOC 2', 'HIPAA', 'HITRUST'] },
  { id: 2, name: 'KYC Automate', vendor: 'ComplianceForge', tagline: 'Reduce KYC processing time by 80% with intelligent document verification', industries: ['Financial Services'], score: 89, reviews: 84, verified: true, location: 'New York, NY', size: '250-999', certifications: ['SOC 2', 'ISO 27001'] },
  { id: 3, name: 'Contract Analyzer', vendor: 'LegalMind', tagline: 'Review contracts 10x faster with AI-powered clause detection and risk analysis', industries: ['Legal'], score: 87, reviews: 63, verified: true, location: 'Boston, MA', size: '50-249', certifications: ['SOC 2', 'ISO 27001'] },
  { id: 4, name: 'Claims Intelligence', vendor: 'InsureTech AI', tagline: 'Intelligent claims triage and fraud detection reducing processing time by 65%', industries: ['Insurance'], score: 91, reviews: 95, verified: true, location: 'Chicago, IL', size: '250-999', certifications: ['SOC 2', 'ISO 27001', 'HIPAA'] },
  { id: 5, name: 'Citizen Assist', vendor: 'GovAssist', tagline: 'FedRAMP-authorized AI assistant for government citizen services', industries: ['Government'], score: 96, reviews: 52, verified: true, location: 'Washington, DC', size: '50-249', certifications: ['FedRAMP', 'SOC 2', 'StateRAMP'] },
  { id: 6, name: 'PharmaCopilot', vendor: 'PharmaCopilot Inc', tagline: 'Accelerate drug discovery documentation with AI-powered research assistance', industries: ['Pharmaceutical'], score: 85, reviews: 41, verified: false, location: 'Cambridge, MA', size: '10-49', certifications: ['SOC 2', 'HIPAA'] },
];

const industries = ['Healthcare', 'Financial Services', 'Legal', 'Government', 'Insurance', 'Pharmaceutical'];
const useCases = ['Document Processing', 'Customer Service', 'Risk Analysis', 'Compliance Automation', 'Research & Discovery', 'Claims Processing'];

export default function GovernAtlas() {
  const [selectedIndustry, setSelectedIndustry] = useState('');
  const [selectedUseCase, setSelectedUseCase] = useState('');
  const [showIndustryDropdown, setShowIndustryDropdown] = useState(false);
  const [showUseCaseDropdown, setShowUseCaseDropdown] = useState(false);
  const [view, setView] = useState('home');
  const [activeFilters, setActiveFilters] = useState({ verified: false, minScore: 0 });

  const filteredTools = tools.filter(t => {
    if (selectedIndustry && !t.industries.includes(selectedIndustry)) return false;
    if (activeFilters.verified && !t.verified) return false;
    if (activeFilters.minScore && t.score < activeFilters.minScore) return false;
    return true;
  });

  const ToolCard = ({ tool }) => (
    <div className="border border-gray-200 rounded-lg p-5 hover:border-gray-300 hover:shadow-sm transition-all bg-white">
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-gray-900">{tool.name}</h3>
            {tool.verified && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-green-50 text-green-700 text-xs font-medium rounded">
                <CheckCircle className="w-3 h-3" /> Verified
              </span>
            )}
          </div>
          <p className="text-sm text-gray-600">{tool.vendor}</p>
        </div>
        <div className="text-right">
          <div className="flex items-center gap-1 mb-1">
            <span className="text-2xl font-bold text-gray-900">{(tool.score / 20).toFixed(1)}</span>
            <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
          </div>
          <p className="text-xs text-gray-500">{tool.reviews} reviews</p>
        </div>
      </div>
      
      <p className="text-sm text-gray-600 mb-4 line-clamp-2">{tool.tagline}</p>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {tool.certifications.map(cert => (
          <span key={cert} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">{cert}</span>
        ))}
      </div>
      
      <div className="flex items-center justify-between text-xs text-gray-500 pt-3 border-t border-gray-100">
        <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{tool.location}</span>
        <span className="flex items-center gap-1"><Users className="w-3 h-3" />{tool.size} employees</span>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <button onClick={() => setView('home')} className="flex items-center gap-2">
              <Shield className="w-6 h-6 text-blue-600" />
              <span className="font-bold text-gray-900 text-lg">GovernAtlas</span>
            </button>
            <nav className="hidden md:flex items-center gap-6 text-sm">
              <button onClick={() => setView('browse')} className="text-gray-600 hover:text-gray-900">Browse Tools</button>
              <button className="text-gray-600 hover:text-gray-900">Industries</button>
              <button className="text-gray-600 hover:text-gray-900">Resources</button>
            </nav>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <button className="text-gray-600 hover:text-gray-900 hidden sm:block">Write a Review</button>
            <button className="text-gray-600 hover:text-gray-900 hidden sm:block">For Vendors</button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">Sign In</button>
          </div>
        </div>
      </header>

      {view === 'home' ? (
        <>
          {/* Hero */}
          <section className="bg-white border-b border-gray-200">
            <div className="max-w-4xl mx-auto px-4 py-16 text-center">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Find AI tools built for regulated industries
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Browse 150+ verified AI tools with governance scores, compliance certifications, and real user reviews.
              </p>
              
              {/* Search Bar */}
              <div className="bg-white border border-gray-300 rounded-lg p-2 flex flex-col sm:flex-row gap-2 shadow-sm max-w-3xl mx-auto">
                <div className="relative flex-1">
                  <button 
                    onClick={() => { setShowIndustryDropdown(!showIndustryDropdown); setShowUseCaseDropdown(false); }}
                    className="w-full px-4 py-3 text-left bg-gray-50 rounded-lg flex items-center justify-between hover:bg-gray-100"
                  >
                    <span className={selectedIndustry ? 'text-gray-900' : 'text-gray-500'}>
                      {selectedIndustry || 'Select Industry'}
                    </span>
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  </button>
                  {showIndustryDropdown && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                      {industries.map(ind => (
                        <button
                          key={ind}
                          onClick={() => { setSelectedIndustry(ind); setShowIndustryDropdown(false); }}
                          className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 text-gray-700"
                        >
                          {ind}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                
                <div className="relative flex-1">
                  <button 
                    onClick={() => { setShowUseCaseDropdown(!showUseCaseDropdown); setShowIndustryDropdown(false); }}
                    className="w-full px-4 py-3 text-left bg-gray-50 rounded-lg flex items-center justify-between hover:bg-gray-100"
                  >
                    <span className={selectedUseCase ? 'text-gray-900' : 'text-gray-500'}>
                      {selectedUseCase || 'Select Use Case'}
                    </span>
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  </button>
                  {showUseCaseDropdown && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                      {useCases.map(uc => (
                        <button
                          key={uc}
                          onClick={() => { setSelectedUseCase(uc); setShowUseCaseDropdown(false); }}
                          className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 text-gray-700"
                        >
                          {uc}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                
                <button 
                  onClick={() => setView('browse')}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium flex items-center justify-center gap-2"
                >
                  <Search className="w-4 h-4" />
                  Search
                </button>
              </div>
            </div>
          </section>

          {/* Categories */}
          <section className="max-w-7xl mx-auto px-4 py-12">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Browse by Industry</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {industries.map(ind => (
                <button
                  key={ind}
                  onClick={() => { setSelectedIndustry(ind); setView('browse'); }}
                  className="p-4 bg-white border border-gray-200 rounded-lg text-center hover:border-blue-500 hover:shadow-sm transition-all group"
                >
                  <Building2 className="w-8 h-8 mx-auto mb-2 text-gray-400 group-hover:text-blue-600" />
                  <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">{ind}</span>
                </button>
              ))}
            </div>
          </section>

          {/* Featured Tools */}
          <section className="max-w-7xl mx-auto px-4 py-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Top Rated Tools</h2>
              <button onClick={() => setView('browse')} className="text-blue-600 text-sm font-medium flex items-center gap-1 hover:text-blue-700">
                View all <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {tools.slice(0, 6).map(tool => <ToolCard key={tool.id} tool={tool} />)}
            </div>
          </section>

          {/* Trust Bar */}
          <section className="bg-white border-t border-gray-200 py-12">
            <div className="max-w-7xl mx-auto px-4 text-center">
              <p className="text-sm text-gray-500 mb-6">Trusted by compliance teams at</p>
              <div className="flex flex-wrap items-center justify-center gap-8 opacity-50">
                {['Kaiser', 'JPMorgan', 'Deloitte', 'Anthem', 'HCA'].map(name => (
                  <span key={name} className="text-lg font-semibold text-gray-400">{name}</span>
                ))}
              </div>
            </div>
          </section>
        </>
      ) : (
        /* Browse View */
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex gap-8">
            {/* Filters Sidebar */}
            <aside className="w-64 flex-shrink-0 hidden lg:block">
              <div className="bg-white border border-gray-200 rounded-lg p-4 sticky top-20">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Filter className="w-4 h-4" /> Filters
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 block mb-2">Industry</label>
                    <select 
                      value={selectedIndustry} 
                      onChange={(e) => setSelectedIndustry(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                    >
                      <option value="">All Industries</option>
                      {industries.map(ind => <option key={ind} value={ind}>{ind}</option>)}
                    </select>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-700 block mb-2">Min Score</label>
                    <select 
                      value={activeFilters.minScore}
                      onChange={(e) => setActiveFilters({...activeFilters, minScore: Number(e.target.value)})}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                    >
                      <option value={0}>Any</option>
                      <option value={80}>80+</option>
                      <option value={85}>85+</option>
                      <option value={90}>90+</option>
                    </select>
                  </div>
                  
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={activeFilters.verified}
                      onChange={(e) => setActiveFilters({...activeFilters, verified: e.target.checked})}
                      className="rounded border-gray-300"
                    />
                    <span className="text-sm text-gray-700">Verified only</span>
                  </label>
                </div>
              </div>
            </aside>
            
            {/* Results */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    {selectedIndustry || 'All'} AI Tools
                  </h1>
                  <p className="text-sm text-gray-500 mt-1">{filteredTools.length} tools found</p>
                </div>
                {selectedIndustry && (
                  <button 
                    onClick={() => setSelectedIndustry('')}
                    className="text-sm text-gray-500 flex items-center gap-1 hover:text-gray-700"
                  >
                    Clear filters <X className="w-4 h-4" />
                  </button>
                )}
              </div>
              
              <div className="space-y-4">
                {filteredTools.map(tool => <ToolCard key={tool.id} tool={tool} />)}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12 mt-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-2 mb-8">
            <Shield className="w-6 h-6 text-blue-500" />
            <span className="font-bold text-white text-lg">GovernAtlas</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
            <div>
              <h4 className="font-medium text-white mb-3">For Buyers</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white">Browse Tools</a></li>
                <li><a href="#" className="hover:text-white">Industries</a></li>
                <li><a href="#" className="hover:text-white">Write a Review</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-white mb-3">For Vendors</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white">Get Listed</a></li>
                <li><a href="#" className="hover:text-white">Get Verified</a></li>
                <li><a href="#" className="hover:text-white">Advertise</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-white mb-3">Resources</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white">Blog</a></li>
                <li><a href="#" className="hover:text-white">Methodology</a></li>
                <li><a href="#" className="hover:text-white">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-white mb-3">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white">About</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
                <li><a href="#" className="hover:text-white">Privacy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-xs">
            © 2025 GovernAtlas. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
